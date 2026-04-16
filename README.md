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

```cmd
git clone <repo>
cd psylu-web
```

### 2. Subir banco de dados

```cmd
docker-compose up -d
```

### 3. Configurar variáveis

Copiar e renomear arquivo `.env.example` para `.env` e preencher com as informações necessárias.

```dotenv
# POSTGRESQL CONFIG 
DB_NAME=your_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
# Prisma
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/your_db?schema=public"

# AUTH CONFIG
AUTH_SECRET="# Added by `npx auth`. Read more: https://cli.authjs.dev"
NEXTAUTH_URL=http://localhost:3000
# Google Provider
AUTH_GOOGLE_ID="Get from Google Cloud Console"
AUTH_GOOGLE_SECRET="Get from Google Cloud Console"
```

### 4. Rodar migrations

```cmd
npx prisma migrate dev
```

### 5. Rodar projeto

```cmd
npm run dev
```

---

## 🧪 Testes

```cmd
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
