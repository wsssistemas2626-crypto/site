import Link from "next/link";

const services = [
  {
    code: "SW-01",
    title: "Desenvolvimento sob encomenda",
    text: "Sistemas web construídos do zero para o processo específico da sua empresa, sem forçar seu negócio a caber em um produto genérico.",
  },
  {
    code: "SW-02",
    title: "Software licenciável",
    text: "Produtos próprios, prontos para licenciamento, quando a solução vale para mais de um cliente com o mesmo tipo de operação.",
  },
  {
    code: "CN-03",
    title: "Consultoria em tecnologia",
    text: "Diagnóstico técnico, escolha de arquitetura e priorização antes de investir em desenvolvimento, inclusive para setor público e OSCIPs, com foco em conformidade e governança.",
  },
  {
    code: "SP-04",
    title: "Suporte e manutenção",
    text: "Evolução contínua, correção e acompanhamento de sistemas que já estão em produção — inclusive os que não construímos nós.",
  },
  {
    code: "IN-05",
    title: "Hospedagem e tratamento de dados",
    text: "Provisionamento de infraestrutura, armazenamento e processamento de dados para aplicações que não podem parar.",
  },
  {
    code: "PT-06",
    title: "Portais e plataformas de conteúdo",
    text: "Ambientes digitais para publicação, distribuição e organização de conteúdo e informação.",
  },
];

export default function Servicos() {
  return (
    <div className="max-w-content mx-auto px-6 py-20">
      <p className="text-signal font-display text-sm mb-4">serviços</p>
      <h1 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight">
        Seis frentes, uma estrutura completa por trás de todas elas.
      </h1>
      <p className="text-muted mt-6 max-w-xl leading-relaxed">
        Cada serviço pode ser contratado isoladamente ou combinado. Por trás
        de todos está o mesmo ecossistema de departamentos especializados com
        agentes de IA. Muitos projetos começam com consultoria e terminam em
        operação contínua.
      </p>

      <div className="mt-16 border-t rule">
        {services.map((s) => (
          <div
            key={s.code}
            className="grid sm:grid-cols-[100px_1fr] gap-4 sm:gap-10 py-8 border-b rule"
          >
            <p className="font-display text-muted text-sm">{s.code}</p>
            <div>
              <h2 className="font-display text-xl mb-2">{s.title}</h2>
              <p className="text-muted leading-relaxed max-w-xl">{s.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border rule rounded-sm p-8">
        <p className="font-display text-xl max-w-md">
          Não sabe qual serviço se encaixa no seu caso?
        </p>
        <Link
          href="/contato"
          className="shrink-0 bg-signal text-ink px-6 py-3 rounded-sm font-medium hover:bg-signal/90 transition-colors"
        >
          Descrever seu problema
        </Link>
      </div>
    </div>
  );
}
