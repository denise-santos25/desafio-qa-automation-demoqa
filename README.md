# Desafio QA Automation - DemoQA

Solução do desafio proposto no arquivo `Desafio_QA (004).pptx`, usando:

- JavaScript
- Cypress
- Cucumber/Gherkin
- Page Objects para os fluxos de frontend

## Escopo implementado

### Parte 1 - API

Fluxo coberto em `cypress/e2e/api/book_store.feature`:

1. Criar usuario em `/Account/v1/User`
2. Gerar token em `/Account/v1/GenerateToken`
3. Validar autorizacao em `/Account/v1/Authorized`
4. Listar livros em `/BookStore/v1/Books`
5. Reservar dois livros em `/BookStore/v1/Books`
6. Consultar detalhes do usuario em `/Account/v1/User/{userID}`

O usuário criado e removido ao final do teste.

### Parte 2 - Frontend

Fluxos cobertos em `cypress/e2e/frontend`:

- Practice Form: preenchimento completo, upload de `.txt`, submit, validacao e fechamento do popup
- Browser Windows: clique em New Window e validação da mensagem `This is a sample page`
- Web Tables: criar, editar e deletar registro
- Web Tables bonus: criar 12 registros dinamicos e deletar todos
- Progress Bar: parar antes de 25%, validar valor e resetar ao chegar em 100%
- Sortable: reorganizar itens por drag and drop e validar ordem crescente

## Como executar

Instale as dependencias:

```bash
npm install
```

Execute todos os testes:

```bash
npm test
```

Execute apenas API:

```bash
npm run test:api
```

Execute apenas frontend:

```bash
npm run test:frontend
```

Abra o Cypress em modo interativo:

```bash
npm run cy:open
```

## Estrutura

```text
cypress/
  e2e/
    api/
    frontend/
  fixtures/
    sample-upload.txt
  support/
    pages/
```

## Observacoes

- O site DemoQA pode exibir anuncios e elementos fixos que interferem nos cliques; a suite injeta CSS para ocultar esses elementos durante os testes.
- O fluxo de nova janela e validado por stub de `window.open`, abordagem recomendada para automação com Cypress.
- Os dados sao gerados dinamicamente para evitar conflito entre execucoes.
