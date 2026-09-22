#!/usr/bin/env bash
#
# autoloop.sh — Loop de execução autônoma para Claude Code
# Adaptado para o projeto wss-sistemas (site institucional Next.js)
#
# Uso:
#   ./autoloop.sh                        # roda com defaults deste projeto
#   MAX_ITERACOES=20 ./autoloop.sh
#   PROMPT_CUSTOM="priorize o item de e-mail" ./autoloop.sh
#
# Como funciona:
#   1. A cada rodada, chama `claude -p` com uma instrução fixa pedindo
#      pra ler o PROGRESS.md, executar o próximo passo pendente, rodar
#      os testes/lint definidos no projeto, e atualizar o PROGRESS.md.
#   2. Se os testes falharem (exit code != 0 do comando de check),
#      o loop para e não avança — evita empilhar erro sobre erro.
#   3. Se o Claude sinalizar "TAREFA_CONCLUIDA" no PROGRESS.md, o loop encerra.
#   4. Tudo fica logado em ./autoloop.log com timestamp.
#
# Pré-requisitos:
#   - Claude Code instalado e autenticado (`claude` no PATH)
#   - Rodar a partir da raiz do projeto wss-sistemas (onde está o PROGRESS.md)
#   - npm install já executado (node_modules presente), para o CHECK_CMD funcionar
#   - Acesso à internet para o `npm run build` baixar as fontes do Google Fonts

set -uo pipefail

# ---------- Configuração (pode sobrescrever via variável de ambiente) ----------
PROJECT_DIR="${PROJECT_DIR:-$(pwd)}"
PROGRESS_FILE="${PROGRESS_FILE:-$PROJECT_DIR/PROGRESS.md}"
LOG_FILE="${LOG_FILE:-$PROJECT_DIR/autoloop.log}"
MAX_ITERACOES="${MAX_ITERACOES:-10}"                   # 10 itens no backlog inicial
SLEEP_ENTRE_RODADAS="${SLEEP_ENTRE_RODADAS:-5}"       # segundos
CHECK_CMD="${CHECK_CMD:-npm run build}"               # valida o site Next.js a cada rodada
CLAUDE_MODEL="${CLAUDE_MODEL:-}"                       # opcional: "sonnet", "opus" etc
PROMPT_CUSTOM="${PROMPT_CUSTOM:-}"                     # instrução extra opcional

TOKEN_CONCLUIDO="TAREFA_CONCLUIDA"
TOKEN_BLOQUEADO="TAREFA_BLOQUEADA"

# ---------- Funções auxiliares ----------
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

checar_prerequisitos() {
  if ! command -v claude &> /dev/null; then
    log "ERRO: comando 'claude' não encontrado no PATH. Instale o Claude Code primeiro."
    exit 1
  fi
  if [ ! -f "$PROGRESS_FILE" ]; then
    log "ERRO: $PROGRESS_FILE não existe. Rode este script a partir da raiz do projeto wss-sistemas (o PROGRESS.md já vem no repositório)."
    exit 1
  fi
  if [ ! -f "$PROJECT_DIR/package.json" ]; then
    log "AVISO: package.json não encontrado em $PROJECT_DIR — confirme que PROJECT_DIR aponta para a raiz do wss-sistemas."
  fi
  if [ ! -d "$PROJECT_DIR/node_modules" ]; then
    log "AVISO: node_modules não encontrado. Rodando 'npm install' antes de iniciar o loop."
    (cd "$PROJECT_DIR" && npm install) >> "$LOG_FILE" 2>&1
  fi
}

montar_prompt() {
  local extra="$1"
  cat <<EOF
Leia o arquivo PROGRESS.md na raiz do projeto wss-sistemas (site institucional em Next.js 14 / App Router / Tailwind).

Sua tarefa nesta rodada:
1. Identifique o próximo item pendente do backlog (primeiro item não marcado como concluído).
2. Execute esse item de ponta a ponta (código, configuração, testes, o que for necessário).
3. Rode "$CHECK_CMD" e garanta que passe antes de prosseguir. Se o build falhar por falta de acesso à internet (fontes do Google Fonts), registre isso no Log de decisões em vez de tratar como bloqueio de negócio.
4. Atualize o PROGRESS.md:
   - marque o item como concluído
   - adicione uma linha no "Log de decisões" explicando o que foi feito
   - se encontrar um bloqueio real (ex.: falta a API key de um provedor de e-mail, falta o e-mail institucional real, falta uma decisão de negócio), escreva "$TOKEN_BLOQUEADO" na seção Status e explique exatamente o que falta
   - se o backlog inteiro estiver concluído, escreva "$TOKEN_CONCLUIDO" na seção Status
5. Não peça confirmação ao usuário — decida e prossiga, a menos que seja um bloqueio real (item 4). Placeholders de conteúdo (copy, e-mail de contato) podem ser mantidos ou refinados com bom senso; credenciais reais (API keys, domínio de produção) são sempre bloqueio.

${extra}

Trabalhe apenas dentro deste projeto. Ao final, garanta que o PROGRESS.md reflita o estado real.
EOF
}

status_atual() {
  grep -A1 "^## Status" "$PROGRESS_FILE" 2>/dev/null | tail -n1 | tr -d '[:space:]'
}

# ---------- Loop principal ----------
main() {
  checar_prerequisitos
  cd "$PROJECT_DIR" || exit 1

  log "=== Iniciando autoloop.sh (wss-sistemas) ==="
  log "Projeto: $PROJECT_DIR"
  log "Máximo de iterações: $MAX_ITERACOES"
  [ -n "$CHECK_CMD" ] && log "Comando de verificação: $CHECK_CMD"

  local iteracao=1
  while [ "$iteracao" -le "$MAX_ITERACOES" ]; do
    log "--- Iteração $iteracao/$MAX_ITERACOES ---"

    local prompt
    prompt="$(montar_prompt "$PROMPT_CUSTOM")"

    local claude_args=(-p "$prompt" --dangerously-skip-permissions)
    [ -n "$CLAUDE_MODEL" ] && claude_args+=(--model "$CLAUDE_MODEL")

    log "Chamando Claude Code..."
    if ! claude "${claude_args[@]}" 2>&1 | tee -a "$LOG_FILE"; then
      log "ERRO: chamada ao Claude Code falhou nesta iteração. Parando o loop."
      exit 1
    fi

    # Verificação (build do Next.js) após a mudança
    if [ -n "$CHECK_CMD" ]; then
      log "Rodando comando de verificação: $CHECK_CMD"
      if ! eval "$CHECK_CMD" >> "$LOG_FILE" 2>&1; then
        log "FALHA na verificação ($CHECK_CMD). Parando o loop para revisão manual."
        exit 1
      fi
      log "Verificação passou."
    fi

    local status
    status="$(status_atual)"
    log "Status atual do PROGRESS.md: ${status:-desconhecido}"

    if [[ "$status" == *"$TOKEN_CONCLUIDO"* ]]; then
      log "Backlog concluído. Encerrando o loop com sucesso."
      exit 0
    fi

    if [[ "$status" == *"$TOKEN_BLOQUEADO"* ]]; then
      log "Tarefa bloqueada — precisa de decisão humana. Encerrando o loop."
      exit 2
    fi

    iteracao=$((iteracao + 1))
    log "Aguardando ${SLEEP_ENTRE_RODADAS}s antes da próxima rodada..."
    sleep "$SLEEP_ENTRE_RODADAS"
  done

  log "Número máximo de iterações ($MAX_ITERACOES) atingido sem conclusão. Revise o PROGRESS.md."
  exit 3
}

main
