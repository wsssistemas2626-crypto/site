import Link from "next/link";

export const metadata = {
  title: "Página não encontrada — WSS Sistemas",
};

export default function NotFound() {
  return (
    <section className="grain border-b rule">
      <div className="max-w-content mx-auto px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <p className="text-signal font-display text-sm mb-6">erro/404</p>
        <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] max-w-3xl">
          Esta página não existe.
        </h1>
        <p className="text-muted text-lg mt-6 max-w-xl leading-relaxed">
          O endereço pode ter mudado ou sido digitado incorretamente. Volte ao
          início ou fale com a gente se estiver procurando algo específico.
        </p>
        <div className="flex flex-wrap gap-4 mt-10">
          <Link
            href="/"
            className="bg-signal text-ink px-6 py-3 rounded-sm font-medium hover:bg-signal/90 transition-colors"
          >
            Voltar ao início
          </Link>
          <Link
            href="/contato"
            className="border border-line px-6 py-3 rounded-sm text-text hover:border-signal transition-colors"
          >
            Falar com a WSS
          </Link>
        </div>
      </div>
    </section>
  );
}
