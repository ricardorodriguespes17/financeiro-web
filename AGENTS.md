# AGENTS.md — Frontend

Instruções para o agente de IA que desenvolve o frontend deste projeto. Leia este arquivo inteiro antes de qualquer tarefa.

## 1. Contexto do projeto

Gestor financeiro pessoal (MVP): web app responsivo, nos moldes de uma planilha de Excel, para pessoas que precisam se organizar financeiramente. O lançamento é 100% manual, então a **rapidez do lançamento é o ponto central**: a meta é registrar uma Despesa em até 3 toques (valor, Categoria, salvar) e uma Receita em 2 (valor, salvar).

Critério de sucesso do MVP: teste com 5 a 8 pessoas em um único dia, onde 80% lançam a primeira Despesa sem ajuda, medindo o tempo médio de lançamento.

O backend é um projeto separado (Node, Express, Prisma e PostgreSQL), com seu próprio AGENTS.md. Este arquivo cobre só o frontend.

## 2. Regra principal: só o que a tarefa pede

Este é o ponto mais importante deste arquivo.

- Faça **somente** o que está descrito na tarefa que você recebeu (título, Descrição e Critério de aceite). Nada além.
- **Não adiante** trabalho de tarefas futuras, mesmo que pareça óbvio ou pequeno.
- **Não invente** requisitos, telas, campos, endpoints, regras, textos de negócio ou bibliotecas que a tarefa não cita.
- **Não refatore, reorganize nem "melhore"** código que a tarefa não menciona.
- **Não preveja** o que vem pela frente: não crie abstrações, parâmetros, componentes genéricos ou arquivos para uso futuro.
- Se a tarefa está ambígua, incompleta ou depende de algo que não existe, **pare e pergunte** ao Ricardo antes de seguir. Perguntar é sempre melhor do que supor.
- Se você achar um erro ou uma lacuna na tarefa ou em outra parte do projeto, **relate**, não corrija por conta própria.

## 3. Tecnologias definidas

| Item               | Definição                                                                                      |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Linguagem          | TypeScript                                                                                     |
| Biblioteca de UI   | React                                                                                          |
| Build e dev server | Vite                                                                                           |
| Roteamento         | React Router                                                                                   |
| Cliente HTTP       | `fetch` ou `axios` (a tarefa 5.1 decide o que instalar)                                        |
| Autenticação       | JWT recebido da API, enviado no header `Authorization: Bearer`                                 |
| Testes             | Definidos na tarefa 5.10 (sugestão: Vitest com Testing Library)                                |
| Hospedagem         | Site estático no Render, com a URL da API vinda de variável de ambiente no build (tarefa 10.4) |

**Ainda não definido** (não escolha por conta própria; se uma tarefa precisar, pergunte): biblioteca de estilos ou de componentes, gerenciador de estado global, biblioteca de busca e cache de dados, biblioteca de formulários, biblioteca de datas e de ícones.

Não instale dependências que a tarefa atual não exige.

## 4. Regras de negócio que afetam o frontend

- **Dinheiro:** a API trabalha em **centavos (inteiro)**. O frontend guarda e calcula em centavos e só formata em BRL na exibição (`123456` vira `R$ 1.234,56`). Nunca use `float` para valores.
- **Mês:** período ao qual os Lançamentos pertencem. É criado quando o usuário o abre pela primeira vez. Cada usuário só vê os próprios meses.
- **Lançamento:** é uma Despesa ou uma Receita, com valor, dia (que deve existir no mês), Status e, só na Despesa, Categoria e Forma de Pagamento.
- **Tipo imutável:** não é possível trocar Despesa por Receita ao editar. Para mudar, o usuário exclui e cria de novo.
- **Despesa:** exige Categoria; Forma de Pagamento é **opcional** (Pix, Crédito, Débito, Dinheiro).
- **Receita:** **não tem** Categoria nem Forma de Pagamento.
- **Categorias:** lista padrão fixa, vinda da API (Essencial, Mercado, Lazer e Transporte). Não há criar, editar ou excluir categorias no MVP.
- **Status:** pago ou pendente (padrão pendente).
- **Saldo do Mês:** Receitas menos Despesas do mês, pagas e pendentes. **Saldo Atual:** só lançamentos pagos. Nada é acumulado entre meses. O cálculo é feito pelo backend; o frontend só exibe o que a API devolve.
- **Fixo:** marcação que permite copiar o lançamento para o mês seguinte (Fase 2).
- **Dia padrão** do lançamento rápido: hoje; se o mês aberto não for o atual, o dia de hoje ajustado ao último dia do mês.
- **Textos da interface** em português do Brasil.

## 5. Contrato com a API

- A fonte da verdade são os endpoints **realmente implementados** pelo backend e as tarefas do backend. Não invente rotas, campos nem formatos de resposta.
- Use os nomes de campos exatamente como a API retorna (por exemplo `amount_cents`, `category_id`, `payment_method`, `limit_cents`, `percent_used`).
- Se o endpoint de que a tarefa depende ainda não existe, a tarefa está **bloqueada**: avise o Ricardo em vez de simular o contrato no código final.
- Códigos de erro esperados e já definidos nas tarefas: 400 (dados inválidos), 401 (sem sessão ou token inválido), 404 (inexistente ou de outro usuário), 409 (conflito). Trate-os conforme a tarefa descrever.
- 401 em qualquer chamada autenticada limpa a sessão e leva ao login.

## 6. Como trabalhar em cada tarefa

1. Leia a tarefa inteira: **título, Descrição e Critério de aceite**.
2. Confira o campo **Bloqueado por**: se alguma tarefa bloqueadora não estiver Aprovada, não comece. Avise o Ricardo.
3. Implemente somente o descrito.
4. Verifique cada item do **Critério de aceite** e confirme que está atendido. Quando a tarefa pedir testes, escreva-os.
5. Ao terminar, informe de forma curta: o que foi feito, como verificar e qualquer dúvida ou lacuna encontrada. Não liste "próximos passos" que a tarefa não pediu.
6. **Commits:** siga a convenção definida pelo Ricardo. Se ainda não houver uma, pergunte antes do primeiro commit e não invente.

## 7. Escopo do frontend por fase

Esta tabela existe **só para você saber o que NÃO fazer antes da hora**. Não implemente nada de uma tarefa que você não recebeu.

| Fase   | Tarefas do frontend                                                                                                                                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fase 1 | 5.1 a 5.10 (setup, login, utilitários de dinheiro, navegação de mês, resumo, lista, lançamento rápido, editar e excluir, estados e responsividade, testes), 6.3 (medição do lançamento rápido) e 10.4 (publicação do frontend) |
| Fase 2 | 7.4 e 7.5 (Limites), 8.4 e 8.5 (Copiar Fixos e marcação de Fixo), 9.3 e 9.4 (Mover)                                                                                                                                            |

Consequências diretas na Fase 1:

- O resumo **não exibe Limite nem percentual usado** (a API devolve `null`); isso é do G7.
- **Não há** botão Copiar Fixos, ação Mover nem controle de Fixo até as tarefas da Fase 2 pedirem.

## 8. Wireframe do lançamento rápido (tarefa 5.7)

Referência para a tarefa 5.7, mobile-first:

```
┌───────────────────────────┐
│  Nova movimentação    [x] │
│  [ Despesa ] [ Receita ]  │  Despesa vem selecionada
│                           │
│        R$ 0,00            │  teclado numérico já aberto
│                           │
│  Mercado  Essencial       │  chips de Categoria
│  Lazer    Transporte      │  (só em Despesa)
│                           │
│  ▸ Mais detalhes          │  recolhido: dia, Forma de
│                           │  Pagamento, Status, Fixo
│  [        Salvar        ] │
└───────────────────────────┘
```

Padrões do formulário: tipo Despesa, Status pendente, Forma de Pagamento vazia, Fixo desmarcado. Depois de salvar, a folha fecha e a lista e o resumo do mês atualizam.

## 9. Design e qualidade mínima

**O design deve ser simples: isto é um MVP.** O objetivo é validar a rapidez do lançamento, não entregar uma interface sofisticada.

- Interface limpa e funcional, com poucos elementos e hierarquia visual clara.
- Sem animações, transições elaboradas, temas (claro e escuro), ilustrações ou efeitos decorativos, a menos que a tarefa peça.
- Sem identidade visual elaborada: uma paleta enxuta e uma única família de fonte bastam.
- Componentes padrão e simples têm preferência sobre soluções customizadas. Não construa um design system.
- Funcionalidade e clareza vêm antes de estética. Na dúvida entre a opção mais enfeitada e a mais simples, escolha a simples.

Mínimo obrigatório de qualidade:

- Layout responsivo, mobile-first, funcional de 360px de largura até desktop, sem rolagem horizontal.
- Estados de carregamento, vazio e erro nas telas, conforme a tarefa 5.9.
- Nunca transmitir a diferença entre Despesa e Receita (ou qualquer estado importante) só por cor.
- Nunca registrar valores, descrições ou dados financeiros em eventos de medição (tarefa 6.3).
- Não deixar segredos, URLs de produção ou tokens no código; configuração só por variáveis de ambiente.

## 10. Fora do MVP (não implementar)

Fatura de cartão, Custo de Vida e marcação Essencial, Despesa Líquida, recorrência automática (estilo Google Agenda), categorias personalizadas, gráficos e histórico, importação de extrato e app nativo.
