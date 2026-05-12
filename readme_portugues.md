<div align="center">

# ⚖️ LicitSystem API

---

> API robusta para gerenciamento de licitações públicas, secretarias e anexos.
> Robust API for managing public biddings, departments, and attachments.

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://mysql.com)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)

</div>

---
## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Rodar](#como-rodar)
- [Endpoints da API](#endpoints-da-api)
- [Banco de Dados](#banco-de-dados)
- [Contribuindo](#contribuindo)

---

## Sobre o Projeto

O **LicitSystem** é uma API RESTful desenvolvida para digitalizar e centralizar o gerenciamento de licitações públicas. O sistema permite cadastrar secretarias (departments), categorias, licitações completas com seus documentos anexos, além de oferecer um painel (dashboard) com resumo estatístico.

---

## Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| **Python** | 3.11+ | Linguagem principal |
| **FastAPI** | Latest | Framework web de alta performance |
| **MySQL** | 8.0 | Banco de dados relacional |
| **Docker & Compose** | Latest | Conteinerização e orquestração |
| **Pydantic** | v2 | Validação de dados e schemas |
| **Uvicorn** | Latest | Servidor ASGI |

---

## Como Rodar

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados
- Portas `3306` (MySQL) e `8000` (API) disponíveis na sua máquina

### Passo a Passo

**1. Clone o repositório**
```bash
git clone git@github.com:Unisal-Project/licit-system.git
cd licit-system/BackEnd
```

**2. Suba os containers**

O comando abaixo constrói a imagem da API, provisiona o banco de dados e aplica as tabelas automaticamente.

```bash
docker compose up -d --build
```

**3. Acesse a documentação interativa**

Com a API rodando, abra o **Swagger UI** em:

```
http://localhost:8000/docs
```

> Também disponível em formato ReDoc: `http://localhost:8000/redoc`

---

## Endpoints da API

### 🏛️ Secretarias — `/departments`

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/departments/` | Lista todas as secretarias |
| `POST` | `/departments/` | Cadastra uma nova secretaria |
| `GET` | `/departments/{id}` | Busca secretaria pelo ID |
| `PATCH` | `/departments/{id}` | Atualiza dados de uma secretaria |
| `DELETE` | `/departments/{id}` | Remove uma secretaria |

<details>
<summary>📋 Exemplo de payload — <code>POST /departments/</code></summary>

```json
{
  "sigla": "SEINFRA",
  "nome": "Secretaria de Infraestrutura"
}
```
</details>

---

### 🏷️ Categorias — `/categories`

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/categories/` | Lista todas as categorias |
| `POST` | `/categories/` | Cadastra uma nova categoria |
| `GET` | `/categories/{id}` | Busca categoria pelo ID |
| `PATCH` | `/categories/{id}` | Atualiza uma categoria |
| `DELETE` | `/categories/{id}` | Remove uma categoria |

<details>
<summary>📋 Exemplo de payload — <code>POST /categories/</code></summary>

```json
{
  "nome": "Obras e Serviços de Engenharia",
  "tipo": "Comum"
}
```
</details>

---

### 📜 Licitações — `/biddings`

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/biddings/` | Lista licitações com filtros |
| `POST` | `/biddings/` | Cria uma nova licitação |
| `GET` | `/biddings/{id}` | Busca licitação pelo ID |
| `PATCH` | `/biddings/{id}` | Atualiza dados da licitação |
| `DELETE` | `/biddings/{id}` | Remove uma licitação |

**Filtros disponíveis no `GET /biddings/`:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `page` | `integer` | Página (padrão: 1) |
| `limit` | `integer` | Itens por página (máx. 100, padrão: 10) |
| `number` | `integer` | Número da licitação |
| `year` | `integer` | Ano da licitação |
| `department_id` | `integer` | Filtrar por secretaria |
| `category_id` | `integer` | Filtrar por categoria |
| `status` | `string` | Filtrar por status (ex: `Aberto`) |
| `search` | `string` | Busca textual no objeto |

<details>
<summary>📋 Exemplo de payload — <code>POST /biddings/</code></summary>

```json
{
  "user_id": 1,
  "department_id": 2,
  "category_id": 3,
  "number": 42,
  "year": 2025,
  "bidding_type": "Pregão Eletrônico",
  "status": "Aberto",
  "classification": "Global",
  "object_name": "Aquisição de equipamentos de TI",
  "object_description": "Notebooks e periféricos para os laboratórios",
  "estimated_value": 150000.00,
  "publication_date": "2025-06-01",
  "opening_date": "2025-06-15"
}
```
</details>

---

### 📎 Anexos — `/licitacoes` · `/anexos`

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/licitacoes/{id}/anexos` | Upload de documento (`multipart/form-data`) |
| `GET` | `/licitacoes/{id}/anexos` | Lista todos os anexos de uma licitação |
| `GET` | `/anexos/{id}/download` | Download direto do arquivo |
| `DELETE` | `/anexos/{id}` | Remove um anexo |

---

### 📊 Dashboard — `/dashboard`

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/dashboard/` | Resumo estatístico geral do sistema |
| `GET` | `/dashboard/biddings` | Lista as licitações mais recentes |

---

## Banco de Dados

O banco é inicializado automaticamente via Docker com os scripts em `init-db/`. A estrutura principal é:

```
usuarios      → Gestores e administradores do sistema
secretarias   → Órgãos requisitantes (departments)
categorias    → Tipos de licitação (categories)
licitacoes    → Núcleo do sistema (biddings)
anexos        → Documentos vinculados (editais, atas, contratos)
```

---

> Desenvolvido como parte do [Unisal-Project](https://github.com/Unisal-Project).

---
