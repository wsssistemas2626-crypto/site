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
        </div>
        <div className="sm:text-right text-muted">
          <p>WEB SMART SISTEMAS+13 LTDA</p>
          <p className="mt-1">© {new Date().getFullYear()} WSS+13. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
