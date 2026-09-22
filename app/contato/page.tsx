import ContactForm from "@/components/ContactForm";

// E-mail institucional (aprovado pelo cliente); pode ser sobrescrito via NEXT_PUBLIC_CONTACT_EMAIL.
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contato@wsssistemas.com.br";

export default function Contato() {
  return (
    <div className="max-w-content mx-auto px-6 py-20">
      <p className="text-signal font-display text-sm mb-4">contato</p>
      <h1 className="font-display text-4xl sm:text-5xl max-w-2xl leading-tight">
        Conte o que você precisa resolver.
      </h1>
      <p className="text-muted mt-6 max-w-xl leading-relaxed">
        Sem formulário de qualificação interminável — descreva o problema com
        suas palavras e retornamos com os próximos passos.
      </p>

      <div className="mt-16 grid gap-16 sm:grid-cols-[1fr_320px]">
        <ContactForm />

        <div className="border-t sm:border-t-0 sm:border-l rule pt-8 sm:pt-0 sm:pl-10">
          <p className="text-sm text-muted mb-1">E-mail</p>
          <p className="mb-6">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>

          <p className="text-sm text-muted mb-1">Localização</p>
          <p className="mb-6">
            Recreio dos Bandeirantes
            <br />
            Rio de Janeiro / RJ
          </p>

          <p className="text-sm text-muted mb-1">Razão social</p>
          <p>WEB SMART SISTEMAS+13 LTDA</p>
        </div>
      </div>
    </div>
  );
}
