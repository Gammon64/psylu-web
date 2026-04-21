# 🏗️ Architecture.md — Psylu Web

## 📌 Visão Geral

O **Psylu Web** é um sistema monolítico moderno construído com foco em simplicidade de uso (UX) e clareza arquitetural, voltado para psicólogos gerenciarem pacientes, consultas e anamneses.

A arquitetura segue princípios de:

* Separação de responsabilidades
* Baixo acoplamento
* Alta testabilidade
* Evolução incremental (sem overengineering)

---

## 🧠 Filosofia Arquitetural

O projeto adota um modelo de:

### ➤ Monolito modular (DDD leve)

Cada domínio é isolado em módulos independentes, evitando dependências diretas entre camadas.

```text
UI → API / Server Actions → Service → Repository → Database
```

---

## 🧱 Camadas da Aplicação

### 1. **App (Next.js App Router)**

Local: `src/app`

Responsável por:

* Rotas
* Server Components (SSR)
* Server Actions
* Integração com camada de domínio

Não contém:

* Regras de negócio
* Acesso direto ao banco

---

### 2. **Modules (Domínio)**

Local: `src/modules`

Cada módulo representa um contexto de negócio:

```text
patient/
appointment/
auth/
```

#### Estrutura interna:

```text
module/
  service.ts       → regras de negócio
  repository.ts    → acesso a dados
  schema.ts        → validação (Zod)
  index.ts         → builder/factory
```

---

### 3. **Service (Regra de Negócio)**

Responsável por:

* Validação (via Zod)
* Regras de negócio
* Autorização (userId)
* Orquestração de operações

Não acessa diretamente:

* HTTP
* UI

---

### 4. **Repository (Acesso a Dados)**

Responsável por:

* Comunicação com banco (Prisma)
* Queries e persistência

Não contém:

* Regras de negócio
* Validação

---

### 5. **Database (PostgreSQL + Prisma)**

* ORM: Prisma v7 com adapter `@prisma/adapter-pg`
* Banco relacional
* Modelos com suporte a multi-tenant via `userId`

---

## 🔐 Autenticação

* Implementada com Auth.js (NextAuth v5)
* Provider: Google OAuth
* Sessões persistidas no banco (Prisma Adapter)

### Fluxo:

```text
User → Google OAuth → Session → user.id disponível no backend
```

### Regra crítica:

Toda operação de domínio exige `userId`

---

## 🔄 Padrões de Comunicação

### ✔ Server Components (SSR)

Usado para:

* Listagens
* Fetch inicial

Exemplo:

```ts
await PatientServiceBuilder().list(userId)
```

---

### ✔ Server Actions

Usado para:

* Criação
* Atualização via formulários

---

### ✔ API Routes

Usado para:

* Auto-save
* Atualizações frequentes (ex: anamnese)

---

## 🧪 Testes

Ferramenta: Vitest

### Estratégia:

* Testar **Service**
* Mockar **Repository**
* Não testar Prisma diretamente

### Benefícios:

* Testes rápidos
* Isolamento de lógica
* Alta confiabilidade

---

## 🎨 UI / Design System

Local: `src/components/ui`

Componentes base:

```text
Input
Button
FormField
FormError
Card
EmptyState
```

### Princípios:

* Simplicidade (persona com baixa familiaridade digital)
* Consistência visual
* Reutilização

---

## 🧾 Forms

### Padrão adotado:

* Server Actions
* `useActionState`
* Validação via Zod (compartilhada com backend)

---

## 📅 Agenda (Appointments)

### Implementação inicial:

* Visualização diária
* Navegação via query param (`?date=YYYY-MM-DD`)
* Lista ordenada por horário

### Decisão:

Evitar complexidade prematura (sem calendário completo)

---

## 🧠 Anamnese

* Armazenada em `Appointment.notes`
* Auto-save com debounce (client-side)
* Atualização via API (PATCH)

### Objetivo:

Evitar perda de dados e permitir escrita contínua

---

## 🔐 Segurança

### Práticas adotadas:

* Validação com Zod
* Isolamento por `userId` (multi-tenant)
* Nenhuma confiança em dados do client
* Uso de ORM (proteção contra SQL Injection)

---

## ⚙️ Infraestrutura

* Next.js 16 (fullstack)
* PostgreSQL via Docker Compose (local)
* Variáveis de ambiente separadas

---

## 📦 Estrutura de Pastas

```text
src/
  app/
  modules/
  components/
    ui/
    forms/
  lib/
  hooks/
  tests/
```

---

## 🚀 Evolução Planejada

### Curto prazo:

* Histórico de paciente (timeline)
* Status de consultas
* Melhorias de UX

### Médio prazo:

* Agenda semanal
* Filtros e busca
* Logs/auditoria

### Longo prazo:

* Financeiro
* Multi-usuário
* API externa

---

## ⚠️ Decisões Intencionais

* ❌ Sem microserviços

* ❌ Sem estado global complexo

* ❌ Sem overengineering

* ✔ Foco em UX

* ✔ Simplicidade

* ✔ Evolução incremental

---

## 🧠 Conclusão

A arquitetura do Psylu prioriza:

* Clareza para novos desenvolvedores
* Segurança para dados sensíveis
* Simplicidade para o usuário final

É um sistema projetado para crescer de forma sustentável, sem sacrificar a experiência do usuário nem a qualidade do código.
