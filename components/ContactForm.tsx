"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border rule rounded-sm p-8">
        <p className="font-display text-xl mb-2">Mensagem recebida.</p>
        <p className="text-muted">Retornamos em até um dia útil.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 max-w-md">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm text-muted">
          Nome
        </label>
        <input
          id="name"
          name="name"
          required
          className="bg-surface border border-line rounded-sm px-4 py-3 text-text focus:border-signal outline-none"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm text-muted">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="bg-surface border border-line rounded-sm px-4 py-3 text-text focus:border-signal outline-none"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm text-muted">
          Descreva seu projeto ou necessidade
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="bg-surface border border-line rounded-sm px-4 py-3 text-text focus:border-signal outline-none resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-signal text-ink px-6 py-3 rounded-sm font-medium hover:bg-signal/90 transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400">
          Não foi possível enviar agora. Tente novamente ou use o e-mail ao lado.
        </p>
      )}
    </form>
  );
}
