import Link from "next/link";

const capabilities = [
  {
    label: "Sob encomenda",
    title: "Sistemas construídos para o seu processo",
    text: "Sistemas sob medida, sem a burocracia das grandes fornecedoras. Mapeamos o processo real e construímos em torno dele.",
  },
  {
    label: "Automação",
    title: "Tarefas repetitivas saem da planilha",
    text: "Automações que eliminam retrabalho e integram seus processos, com trilha de auditoria e menos espaço para erro humano.",
  },
  {
    label: "Estrutura com IA",
    title: "23 departamentos, cada um com seu agente",
    text: "Requisitos, arquitetura, qualidade, compliance e suporte têm dono. É processo de empresa sólida, com a agilidade da inteligência artificial.",
  },
];

const process = [
  { n: "01", t: "Diagnóstico", d: "Entendemos o processo antes de qualquer linha de código." },
  { n: "02", t: "Arquitetura", d: "Definimos modelo de dados, integrações e limites do sistema." },
  { n: "03", t: "Construção", d: "Ciclos curtos, entregas visíveis, ajuste contínuo de rota." },
  { n: "04", t: "Operação", d: "Suporte, evolução e monitoramento após o go-live." },
];

export default function Home() {
  return (
    <>
      <section className="grain border-b rule">
        <div className="max-w-content mx-auto px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <p className="text-signal font-display text-sm mb-6">wss/sistemas</p>
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] max-w-3xl">
            Tecnologia que funciona como uma empresa de verdade.
          </h1>
          <p className="text-muted text-lg mt-6 max-w-xl leading-relaxed">
            Desenvolvemos sistemas sob medida, automações e soluções de TI com
            uma estrutura de 23 departamentos especializados, cada um operado
            por um agente de inteligência artificial. Do levantamento de
            requisitos ao suporte pós-entrega, cada etapa tem um responsável.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/contato"
              className="bg-signal text-ink px-6 py-3 rounded-sm font-medium hover:bg-signal/90 transition-colors"
            >
              Conversar sobre seu projeto
            </Link>
            <Link
              href="/servicos"
              className="border border-line px-6 py-3 rounded-sm text-text hover:border-signal transition-colors"
            >
              Ver serviços
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-content mx-auto px-6 py-24 grid gap-px sm:grid-cols-3 bg-line sm:bg-line/40 border rule sm:border-0 rounded-sm overflow-hidden">
        {capabilities.map((c) => (
          <div key={c.title} className="bg-ink p-8">
            <p className="text-mint text-xs font-medium mb-4">{c.label}</p>
            <h3 className="font-display text-xl mb-3 leading-snug">{c.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{c.text}</p>
          </div>
        ))}
      </section>

      <section className="border-t rule">
        <div className="max-w-content mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <h2 className="font-display text-3xl max-w-md">
              Como um projeto avança, da ideia à operação
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-4">
            {process.map((p, i) => (
              <div key={p.n} className="relative">
                <p className="font-display text-signal text-sm mb-4">{p.n}</p>
                <h3 className="font-display text-lg mb-2">{p.t}</h3>
                <p className="text-muted text-sm leading-relaxed">{p.d}</p>
                {i < process.length - 1 && (
                  <span className="hidden sm:block absolute top-2 -right-5 text-line">—</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t rule">
        <div className="max-w-content mx-auto px-6 py-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl max-w-md leading-tight">
              Tem um processo que ainda vive em planilha e mensagem de WhatsApp?
            </h2>
            <p className="text-muted mt-4 max-w-md">
              É esse tipo de problema que resolvemos primeiro.
            </p>
          </div>
          <Link
            href="/contato"
            className="shrink-0 bg-signal text-ink px-6 py-3 rounded-sm font-medium hover:bg-signal/90 transition-colors"
          >
            Contar o que você precisa
          </Link>
        </div>
      </section>
    </>
  );
}
