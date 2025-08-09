import { NextResponse } from 'next/server'
export const runtime = 'nodejs'
import nodemailer from 'nodemailer'

function isValidEmail(email: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body || {}

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Faltan campos requeridos.' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Email inválido.' }, { status: 400 })
    }

    // SMTP Gmail
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
          <h2 style="margin:0 0 16px;color:#fff">Nuevo contacto desde el portafolio</h2>
          <p style="margin:0 0 8px">Nombre: <strong>${name}</strong></p>
          <p style="margin:0 0 8px">Email: <strong>${email}</strong></p>
          <p style="margin:0 0 8px">Empresa: <strong>${company || '-'}</strong></p>
          <div style="margin:16px 0;padding:16px;border:1px solid #334155;border-radius:12px;background:#111827">
            <p style="margin:0 0 8px;color:#94a3b8">Mensaje:</p>
            <p style="white-space:pre-wrap;margin:0;color:#cbd5e1">${message}</p>
          </div>
          <p style="margin-top:16px;color:#94a3b8">Responder a este correo llegará al usuario.</p>
        </td></tr>
      </table>
    `

    const userHtml = `
      <table width="100%" cellpadding="0" cellspacing="0" style="background:${brandBG};padding:24px;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${brandText}">
        <tr><td>
          <h2 style="margin:0 0 12px;color:#fff">¡Gracias por contactarnos, ${name}!</h2>
          <p style="margin:0 0 12px;color:#cbd5e1">Hemos recibido tu mensaje y te responderemos en menos de 24 horas.</p>
          <table cellpadding="0" cellspacing="0" style="width:100%;margin:16px 0;border:1px solid #334155;border-radius:12px;background:#111827">
            <tr><td style="padding:16px">
              <p style="margin:0 0 8px;color:#94a3b8">Resumen:</p>
              <p style="margin:0;color:#cbd5e1">Nombre: ${name}<br/>Email: ${email}<br/>Empresa: ${company || '-'}</p>
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

    // Enviar en paralelo
    const [ownerResult, userResult] = await Promise.allSettled([
      transporter.sendMail({
        from: `Angelware Labs <${SMTP_USER}>`,
        to: 'angelwarelabs@gmail.com',
        replyTo: email,
        subject: `Nuevo contacto: ${name}`,
        html: ownerHtml,
        text: `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${company || '-'}\n\nMensaje:\n${message}`,
      }),
      transporter.sendMail({
        from: `Angelware Labs <${SMTP_USER}>`,
        to: email,
        subject: 'Hemos recibido tu mensaje - Angelware Labs',
        html: userHtml,
        text: `Hola ${name},\n\nGracias por escribirnos. Hemos recibido tu mensaje y te contactaremos en menos de 24 horas.\n\nResumen de tu envío:\n- Nombre: ${name}\n- Email: ${email}\n- Empresa: ${company || '-'}\n- Mensaje: ${message}\n\nSi necesitas añadir algo más, responde a este correo.\n\nSaludos,\nEquipo de Angelware Labs`,
      }),
    ])

    // Si ambos fallan
    if (ownerResult.status === 'rejected' && userResult.status === 'rejected') {
      return NextResponse.json({ ok: false, error: 'No se pudo enviar el correo.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Error de servidor.' }, { status: 500 })
  }
}


