// TODO: substituir Instagram e LinkedIn pelos perfis reais da WSS Sistemas
const social = [
  {
    name: "X",
    href: "https://x.com/websmartsistema",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227a3.7 3.7 0 0 1-.896 1.382 3.7 3.7 0 0 1-1.382.896c-.422.164-1.057.36-2.227.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.413a3.7 3.7 0 0 1-1.381-.896 3.7 3.7 0 0 1-.896-1.382c-.164-.422-.36-1.057-.413-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.413-2.227.217-.562.477-.96.896-1.381.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.902.333 4.14.63a5.9 5.9 0 0 0-2.126 1.384A5.9 5.9 0 0 0 .63 4.14C.333 4.902.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.058 1.277.261 2.15.558 2.912.306.789.717 1.459 1.384 2.126A5.9 5.9 0 0 0 4.14 23.37c.763.297 1.636.5 2.913.558C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.15-.261 2.912-.558a5.9 5.9 0 0 0 2.126-1.384 5.9 5.9 0 0 0 1.384-2.126c.297-.763.5-1.636.558-2.913.058-1.28.072-1.687.072-4.947s-.014-3.668-.072-4.948c-.058-1.277-.261-2.15-.558-2.912a5.9 5.9 0 0 0-1.384-2.126A5.9 5.9 0 0 0 19.86.63c-.763-.297-1.636-.5-2.913-.558C15.667.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125M7.119 20.452H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z",
  },
];

export default function Footer() {
  return (
    <footer className="border-t rule mt-24">
      <div className="max-w-content mx-auto px-6 py-12 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="font-display text-base mb-2">WSS Sistemas</p>
          <p className="text-muted leading-relaxed">
            Desenvolvimento de sistemas sob encomenda, automação e
            infraestrutura de TI para empresas que operam com processos
            complexos.
          </p>
        </div>
        <div>
          <p className="text-muted mb-2">Rio de Janeiro, RJ</p>
          <p className="text-muted">Recreio dos Bandeirantes</p>
          <ul className="flex gap-4 mt-4">
            {social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WSS Sistemas no ${s.name}`}
                  className="text-muted hover:opacity-70 transition-opacity"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:text-right text-muted">
          <p>WEB SMART SISTEMAS+13 LTDA</p>
          <p className="mt-1">© {new Date().getFullYear()} WSS+13. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
