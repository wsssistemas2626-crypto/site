import Link from "next/link";

const links = [
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  return (
    <header className="border-b rule sticky top-0 z-40 bg-ink/90 backdrop-blur">
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-lg tracking-tight">
          WSS<span className="text-signal">+</span>Sistemas
        </Link>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-text transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contato"
          className="text-sm border border-line rounded-sm px-4 py-2 hover:border-signal hover:text-signal transition-colors"
        >
          Falar com a equipe
        </Link>
      </div>
    </header>
  );
}
