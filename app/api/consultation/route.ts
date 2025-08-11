import { NextResponse } from 'next/server'
export const runtime = 'nodejs'
import nodemailer from 'nodemailer'

function isValidEmail(email: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
}

export async function POST(request: Request) {
  try {
    // Rate limit básico en memoria (para producción usar Redis/KV)
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    // @ts-ignore
    globalThis.__rl_consult = globalThis.__rl_consult || new Map()
    // @ts-ignore
    const store = globalThis.__rl_consult as Map<string, { count: number; ts: number }>
    const now = Date.now()
    const windowMs = 60 * 1000
    const limit = 5
    const key = ip.split(',')[0].trim()
    const entry = store.get(key)
    if (!entry || now - entry.ts > windowMs) {
      store.set(key, { count: 1, ts: now })
    } else {
      entry.count += 1
      if (entry.count > limit) {
        return NextResponse.json({ ok: false, error: 'Demasiados intentos. Intenta en 1 minuto.' }, { status: 429 })
      }
      store.set(key, entry)
    }

    const body = await request.json()
    const {
      selectedService,
      name,
      email,
      phone,
      company,
      message,
      budget,
      timeline,
      token,
    } = body || {}

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Faltan campos requeridos.' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Email inválido.' }, { status: 400 })
    }

    // reCAPTCHA v3 (opcional en producción si hay clave)
    const secret = process.env.RECAPTCHA_SECRET_KEY
    const isProd = process.env.NODE_ENV === 'production'
    if (secret && isProd) {
      if (!token) return NextResponse.json({ ok: false, error: 'Captcha faltante.' }, { status: 400 })
      const verify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
      })
      const result = await verify.json()
      if (!result.success || (typeof result.score === 'number' && result.score < 0.5)) {
        return NextResponse.json({ ok: false, error: 'Captcha inválido.' }, { status: 400 })
      }
    }

    // SMTP
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json({ ok: false, error: 'SMTP no configurado' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    const brandPrimary = '#0ea5e9'
    const brandBG = '#0f172a'
    const brandText = '#e2e8f0'

    const ownerHtml = `
      <table width="100%" cellpadding="0" cellspacing="0" style="background:${brandBG};padding:24px;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${brandText}">
        <tr><td>
          <h2 style="margin:0 0 16px;color:#fff">Nueva solicitud de consulta</h2>
          <p style="margin:0 0 8px">Servicio: <strong>${selectedService || '-'}</strong></p>
          <p style="margin:0 0 8px">Nombre: <strong>${name}</strong></p>
          <p style="margin:0 0 8px">Email: <strong>${email}</strong></p>
          <p style="margin:0 0 8px">Teléfono: <strong>${phone || '-'}</strong></p>
          <p style="margin:0 0 8px">Empresa: <strong>${company || '-'}</strong></p>
          <p style="margin:0 0 8px">Presupuesto: <strong>${budget || '-'}</strong></p>
          <p style="margin:0 0 8px">Timeline: <strong>${timeline || '-'}</strong></p>
          <div style="margin:16px 0;padding:16px;border:1px solid #334155;border-radius:12px;background:#111827">
            <p style="margin:0 0 8px;color:#94a3b8">Mensaje:</p>
            <p style="white-space:pre-wrap;margin:0;color:#cbd5e1">${message}</p>
          </div>
        </td></tr>
      </table>
    `

    const userHtml = `
      <table width="100%" cellpadding="0" cellspacing="0" style="background:${brandBG};padding:24px;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${brandText}">
        <tr><td>
          <h2 style="margin:0 0 12px;color:#fff">¡Gracias por tu interés, ${name}!</h2>
          <p style="margin:0 0 12px;color:#cbd5e1">Recibimos tu solicitud de consulta y te contactaremos en menos de 24 horas.</p>
          <table cellpadding="0" cellspacing="0" style="width:100%;margin:16px 0;border:1px solid #334155;border-radius:12px;background:#111827">
            <tr><td style="padding:16px">
              <p style="margin:0 0 8px;color:#94a3b8">Resumen:</p>
              <p style="margin:0;color:#cbd5e1">Servicio: ${selectedService || '-'}<br/>Nombre: ${name}<br/>Email: ${email}<br/>Teléfono: ${phone || '-'}<br/>Empresa: ${company || '-'}<br/>Presupuesto: ${budget || '-'}<br/>Timeline: ${timeline || '-'}</p>
              <div style="margin-top:12px">
                <p style="margin:0 0 8px;color:#94a3b8">Mensaje:</p>
                <p style="white-space:pre-wrap;margin:0;color:#cbd5e1">${message}</p>
              </div>
            </td></tr>
          </table>
          <a href="https://instagram.com/angelware.labs" style="display:inline-block;margin-top:8px;padding:10px 16px;background:${brandPrimary};color:#fff;border-radius:10px;text-decoration:none">Síguenos en Instagram</a>
          <p style="margin-top:12px;color:#64748b;font-size:12px">Angelware Labs • Cali, Colombia</p>
        </td></tr>
      </table>
    `

    const [ownerResult, userResult] = await Promise.allSettled([
      transporter.sendMail({
        from: `Angelware Labs <${SMTP_USER}>`,
        to: 'angelwarelabs@gmail.com',
        replyTo: email,
        subject: `Nueva consulta: ${name} (${selectedService || 'sin servicio'})`,
        html: ownerHtml,
        text: `Servicio: ${selectedService || '-'}\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || '-'}\nEmpresa: ${company || '-'}\nPresupuesto: ${budget || '-'}\nTimeline: ${timeline || '-'}\n\nMensaje:\n${message}`,
      }),
      transporter.sendMail({
        from: `Angelware Labs <${SMTP_USER}>`,
        to: email,
        subject: 'Hemos recibido tu solicitud - Angelware Labs',
        html: userHtml,
        text: `Hola ${name},\n\nGracias por escribirnos. Hemos recibido tu solicitud de consulta y te contactaremos en menos de 24 horas.\n\nResumen de tu envío:\n- Servicio: ${selectedService || '-'}\n- Nombre: ${name}\n- Email: ${email}\n- Teléfono: ${phone || '-'}\n- Empresa: ${company || '-'}\n- Presupuesto: ${budget || '-'}\n- Timeline: ${timeline || '-'}\n- Mensaje: ${message}\n\nSaludos,\nEquipo de Angelware Labs`,
      }),
    ])

    if (ownerResult.status === 'rejected' && userResult.status === 'rejected') {
      return NextResponse.json({ ok: false, error: 'No se pudo enviar el correo.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Error de servidor.' }, { status: 500 })
  }
}


