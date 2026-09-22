const values = [
  {
    t: "Processo antes de tela",
    d: "Nenhuma interface é desenhada antes de entendermos o processo que ela vai sustentar.",
  },
  {
    t: "IA com responsabilidade",
    d: "Cada departamento tem um agente de IA e cada etapa tem um responsável, com rastreabilidade de cada decisão.",
  },
  {
    t: "Operação contínua",
    d: "Entregar não é o fim do projeto — é o começo da fase de acompanhamento.",
  },
];

export default function Sobre() {
  return (
    <div className="max-w-content mx-auto px-6 py-20">
      <p className="text-signal font-display text-sm mb-4">sobre</p>
      <h1 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight">
        Tecnologia que funciona como uma empresa de verdade.
      </h1>
      <p className="text-muted mt-6 max-w-xl leading-relaxed">
        A WSS Sistemas (WEB SMART SISTEMAS+13) é uma empresa de
        desenvolvimento de sistemas e automações que vai além do código.
        Operamos com um ecossistema de 23 departamentos especializados, cada
        um com seu próprio agente de inteligência artificial, para entregar
        software com a estrutura, o processo e a qualidade de uma empresa
        sólida: CNPJ, processos documentados e compliance.
      </p>

      <div className="mt-20 grid gap-10 sm:grid-cols-3 border-t rule pt-12">
        {values.map((v) => (
          <div key={v.t}>
            <h3 className="font-display text-lg mb-3">{v.t}</h3>
            <p className="text-muted text-sm leading-relaxed">{v.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 border-t rule pt-12 grid sm:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl mb-4">Onde atuamos</h2>
          <p className="text-muted leading-relaxed">
            Sediada no Rio de Janeiro, a WSS Sistemas atende em todo o Brasil,
            de forma remota, PMEs, médias empresas, setor público e OSCIPs, e
            parceiros de TI que precisam de capacidade técnica com estrutura
            corporativa para projetos complexos.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl mb-4">Como trabalhamos</h2>
          <p className="text-muted leading-relaxed">
            Times enxutos, ciclos curtos de entrega e comunicação direta com
            quem decide — sem camadas desnecessárias entre o pedido e o
            código.
          </p>
        </div>
      </div>
    </div>
  );
}
