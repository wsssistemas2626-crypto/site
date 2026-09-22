import { NextResponse } from "next/server";

// Envio via Resend (REST API, sem dependência extra).
// Env vars:
//   RESEND_API_KEY     — obrigatória para enviar (sem ela, 503)
//   CONTACT_TO_EMAIL   — destinatário (fallback: contato@wsssistemas.com.br)
//   CONTACT_FROM_EMAIL — remetente de domínio verificado no Resend
//                        (fallback: onboarding@resend.dev, só para testes)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim().slice(0, 200);
  const email = String(data.email ?? "").trim().slice(0, 200);
  const message = String(data.message ?? "").trim().slice(0, 5000);

  if (!email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY não configurada; contato não enviado.");
    return NextResponse.json(
      { error: "Envio de e-mail não configurado" },
      { status: 503 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || "contato@wsssistemas.com.br";
  const from =
    process.env.CONTACT_FROM_EMAIL || "WSS Sistemas <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Novo contato pelo site — ${name || email}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
      html: `<p><strong>Nome:</strong> ${escapeHtml(name)}</p>
<p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Falha no Resend:", res.status, await res.text());
    return NextResponse.json({ error: "Falha ao enviar" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
