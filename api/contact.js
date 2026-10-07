// api/contact.js — Vercel serverless function for Snowdrop contact leads

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({ ok: false, error: 'Dados obrigatórios ausentes.' });
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailIsValid) {
      return res.status(400).json({ ok: false, error: 'E-mail inválido.' });
    }

    if (name.length > 120 || email.length > 180 || message.length > 5000) {
      return res.status(400).json({ ok: false, error: 'Dados acima do limite permitido.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'snowdropage@gmail.com';

    if (!apiKey || !fromEmail) {
      console.error('Missing RESEND_API_KEY or CONTACT_FROM_EMAIL');
      return res.status(500).json({ ok: false, error: 'Serviço de contato não configurado.' });
    }

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeMessage = message.trim();

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: safeEmail,
        subject: `Novo lead Snowdrop — ${safeName}`,
        text: [
          'Novo contato recebido pelo site da Snowdrop.',
          '',
          `Nome: ${safeName}`,
          `E-mail: ${safeEmail}`,
          '',
          'Mensagem:',
          safeMessage,
        ].join('\n'),
      }),
    });

    const resendData = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error('Resend error:', resendData);
      return res.status(502).json({ ok: false, error: 'Não foi possível enviar a mensagem.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ ok: false, error: 'Erro interno ao enviar a mensagem.' });
  }
};
