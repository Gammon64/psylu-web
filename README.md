# 🧠 PsychCare - Sistema de Gestão para Psicólogos

## 📌 Visão Geral

Sistema web simples e intuitivo para psicólogos gerenciarem pacientes, consultas e anamneses.

Projetado especialmente para profissionais com baixa familiaridade tecnológica.

---

## 🚀 Stack Tecnológica

* Next.js 16 (Fullstack)
* PostgreSQL 18
* Prisma ORM
* NextAuth (Google)
* Zod (validação)
* Vitest (testes)
* Docker Compose

---

## 🏗️ Arquitetura

Monolito modular com separação por domínio:

* Patient (Pacientes)
* Appointment (Consultas)
* Auth (Autenticação)

---

## 📂 Estrutura do Projeto

```
src/
  app/
  modules/
  components/
  lib/
  schemas/
  tests/
```

---

## ⚙️ Setup do Projeto

### 1. Clonar repositório

```
git clone <repo>
cd psylu-web
```

### 2. Subir banco de dados

```
docker-compose up -d
```

### 3. Configurar variáveis

Criar `.env`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/psylu-web
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
```

### 4. Rodar migrations

```
npx prisma migrate dev
```

### 5. Rodar projeto

```
npm run dev
```

---

## 🧪 Testes

```
npm run test
```

---

## 🔐 Segurança

* Variáveis separadas por ambiente
* Autenticação via OAuth (Google)
* Validação com Zod
* ORM previne SQL Injection

---

## 📌 Roadmap

* MVP: Pacientes + Agenda + Anamnese
* V2: Financeiro
* V3: Relatórios

---
