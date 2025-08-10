import { NextResponse } from 'next/server'
export const runtime = 'nodejs'
import nodemailer from 'nodemailer'

function isValidEmail(email: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
}

export async function POST(request: Request) {
  try {
    // Rate limit simple en memoria (para prod usar KV/Redis)
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
    const { name, email, phone, company, message, budget, timeline, selectedService } = body || {}

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Faltan campos requeridos.' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Email inválido.' }, { status: 400 })
    }

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
    const brandAccent = '#22d3ee'
    const brandBG = '#0f172a'
    const brandText = '#e2e8f0'
    const brandMuted = '#94a3b8'
    const brandName = 'Angelware Labs'
    const brandWebsite = 'https://instagram.com/angelware.labs'

    const preheaderOwner = `Nueva consulta de ${name} (${email})`
    const preheaderUser = 'Hemos recibido tu solicitud de consulta'

    const headerBlock = `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:8px 0 16px 0">
            <table role="presentation" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td style="background:linear-gradient(135deg, ${brandPrimary}, ${brandAccent});width:40px;height:40px;border-radius:10px;text-align:center;vertical-align:middle;color:#fff;font-weight:700;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif">A</td>
                <td style="width:12px"></td>
                <td style="font-size:18px;font-weight:700;color:#fff;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif">${brandName}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`

    const footerBlock = `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;border-top:1px solid #334155">
        <tr><td style="padding-top:12px;color:${brandMuted};font-size:12px">© ${new Date().getFullYear()} ${brandName}. Cali, Colombia • <a href="${brandWebsite}" style="color:${brandPrimary};text-decoration:none">@angelware.labs</a></td></tr>
      </table>`

    const ownerHtml = `
      <div style="display:none;max-height:0;overflow:hidden;color:transparent">${preheaderOwner}</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:${brandBG};padding:24px;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${brandText}">
        <tr><td>
          ${headerBlock}
          <h2 style="margin:0 0 8px;color:#fff">Nueva solicitud de consulta</h2>
          <p style="margin:0 0 16px;color:${brandMuted}">Un usuario ha completado el formulario de consulta.</p>
          <table cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 12px;border:1px solid #334155;border-radius:12px;background:#111827">
            <tr><td style="padding:16px">
              <table cellpadding="0" cellspacing="0" style="width:100%">
                <tr><td style="color:${brandMuted};padding-bottom:6px">Nombre</td><td style="color:${brandText}"><strong>${name}</strong></td></tr>
                <tr><td style="color:${brandMuted};padding-bottom:6px">Email</td><td style="color:${brandText}"><strong>${email}</strong></td></tr>
                <tr><td style="color:${brandMuted};padding-bottom:6px">Teléfono</td><td style="color:${brandText}">${phone || '-'}</td></tr>
                <tr><td style="color:${brandMuted};padding-bottom:6px">Empresa</td><td style="color:${brandText}">${company || '-'}</td></tr>
                <tr><td style="color:${brandMuted};padding-bottom:6px">Servicio</td><td style="color:${brandText}">${selectedService || '-'}</td></tr>
                <tr><td style="color:${brandMuted};padding-bottom:6px">Presupuesto</td><td style="color:${brandText}">${budget || '-'}</td></tr>
                <tr><td style="color:${brandMuted};padding-bottom:6px">Timeline</td><td style="color:${brandText}">${timeline || '-'}</td></tr>
              </table>
              <div style="margin-top:12px;padding-top:12px;border-top:1px dashed #334155">
                <p style="margin:0 0 6px;color:${brandMuted}">Mensaje</p>
                <p style="white-space:pre-wrap;margin:0;color:${brandText}">${message}</p>
              </div>
            </td></tr>
          </table>
          <p style="margin:4px 0 0;color:${brandMuted};font-size:12px">Responde a este correo para contactar al usuario.</p>
          ${footerBlock}
        </td></tr>
      </table>
    `

    const userHtml = `
      <div style="display:none;max-height:0;overflow:hidden;color:transparent">${preheaderUser}</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:${brandBG};padding:24px;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${brandText}">
        <tr><td>
          ${headerBlock}
          <h2 style="margin:0 0 6px;color:#fff">¡Gracias por solicitar una consulta, ${name}!</h2>
          <p style="margin:0 0 16px;color:${brandMuted}">Hemos recibido tu solicitud y te contactaremos en menos de 24 horas.</p>
          <table cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 12px;border:1px solid #334155;border-radius:12px;background:#111827">
            <tr><td style="padding:16px">
              <p style="margin:0 0 8px;color:${brandMuted}">Resumen</p>
              <p style="margin:0;color:${brandText}">Servicio: ${selectedService || '-'}<br/>Presupuesto: ${budget || '-'}<br/>Timeline: ${timeline || '-'}</p>
              <div style="margin-top:12px">
                <p style="margin:0 0 8px;color:${brandMuted}">Mensaje</p>
                <p style="white-space:pre-wrap;margin:0;color:${brandText}">${message}</p>
              </div>
            </td></tr>
          </table>
          <a href="${brandWebsite}" style="display:inline-block;margin-top:4px;padding:10px 16px;background:${brandPrimary};color:#fff;border-radius:10px;text-decoration:none">Conoce más sobre ${brandName}</a>
          ${footerBlock}
        </td></tr>
      </table>
    `

    const ticketId = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 12)
    const [ownerResult, userResult] = await Promise.allSettled([
      transporter.sendMail({
        from: `Angelware Labs <${SMTP_USER}>`,
        to: 'angelwarelabs@gmail.com',
        replyTo: email,
        subject: `[Consulta #${ticketId}] ${name}${selectedService ? ' · ' + selectedService : ''}`,
        html: ownerHtml,
        text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || '-'}\nEmpresa: ${company || '-'}\nServicio: ${selectedService || '-'}\nPresupuesto: ${budget || '-'}\nTimeline: ${timeline || '-'}\n\nMensaje:\n${message}`,
      }),
      transporter.sendMail({
        from: `Angelware Labs <${SMTP_USER}>`,
        to: email,
        subject: `Recibimos tu consulta (#${ticketId}) - Angelware Labs`,
        html: userHtml,
        text: `Hola ${name},\n\nHemos recibido tu solicitud de consulta y te contactaremos en menos de 24 horas.\n\nResumen:\n- Servicio: ${selectedService || '-'}\n- Presupuesto: ${budget || '-'}\n- Timeline: ${timeline || '-'}\n\nMensaje:\n${message}\n\nSaludos,\nEquipo de Angelware Labs`,
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


