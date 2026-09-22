# WSS Sistemas — Site institucional

Projeto Next.js 14 (App Router) + Tailwind CSS.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Estrutura

- `app/page.tsx` — Home
- `app/servicos/page.tsx` — Serviços
- `app/sobre/page.tsx` — Sobre
- `app/contato/page.tsx` — Contato (formulário)
- `app/api/contact/route.ts` — endpoint que recebe o formulário (hoje só loga; conecte um provedor de e-mail como Resend/SendGrid para envio real)
- `components/` — Header, Footer, ContactForm

## Antes de publicar

1. Trocar `contato@wsssistemas.com.br` (em `app/contato/page.tsx`) pelo e-mail institucional real.
2. Conectar um provedor de e-mail em `app/api/contact/route.ts` para o formulário enviar de fato.
3. Adicionar um favicon/logo real em `app/` (ex.: `app/icon.png`) — hoje o site usa apenas o wordmark em texto.
4. Revisar os textos de serviços/sobre e ajustar ao posicionamento real da empresa.

## Desenvolvimento autônomo (autoloop.sh)

O projeto vem com `PROGRESS.md` (backlog dos pendentes reais do site) e
`autoloop.sh` (adaptado do script original para este projeto: `CHECK_CMD`
padrão `npm run build`, 10 iterações — uma por item do backlog inicial).

```bash
npm install
chmod +x autoloop.sh
./autoloop.sh
```

O loop lê o próximo item pendente do `PROGRESS.md`, executa com o Claude
Code, valida com `npm run build` e atualiza o próprio `PROGRESS.md` a cada
rodada. Ele para sozinho se o build falhar ou se encontrar um bloqueio real
(credencial faltando, decisão de negócio) — nesses casos escreve
`TAREFA_BLOQUEADA` no status e explica o motivo no "Log de decisões".

## Deploy na Vercel

```bash
npm install -g vercel
vercel
```

Ou conecte o repositório diretamente pelo painel da Vercel.
