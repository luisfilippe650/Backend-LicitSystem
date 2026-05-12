<div align="center">

# ⚖️ LicitSystem API

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Contributing](#contributing)

---

## About

**LicitSystem** is a RESTful API built to digitize and centralize the management of public bidding processes. It enables registering departments, categories, full bidding records with attached documents, and provides a dashboard with statistical summaries.

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| **Python** | 3.11+ | Primary language |
| **FastAPI** | Latest | High-performance web framework |
| **MySQL** | 8.0 | Relational database |
| **Docker & Compose** | Latest | Containerization & orchestration |
| **Pydantic** | v2 | Data validation and schemas |
| **Uvicorn** | Latest | ASGI server |



---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
- Ports `3306` (MySQL) and `8000` (API) available on your machine

### Step by Step

**1. Clone the repository**
```bash
git clone git@github.com:Unisal-Project/licit-system.git
cd licit-system/BackEnd
```

**2. Start the containers**

The command below builds the API image, provisions the database, and applies all tables automatically.

```bash
docker compose up -d --build
```

**3. Access the interactive documentation**

Once the API is running, open **Swagger UI** at:

```
http://localhost:8000/docs
```

> Also available in ReDoc format: `http://localhost:8000/redoc`

---

## API Endpoints

### 🏛️ Departments — `/departments`

| Method | Route | Description |
|---|---|---|
| `GET` | `/departments/` | List all departments |
| `POST` | `/departments/` | Create a new department |
| `GET` | `/departments/{id}` | Fetch department by ID |
| `PATCH` | `/departments/{id}` | Update a department |
| `DELETE` | `/departments/{id}` | Delete a department |

<details>
<summary>📋 Payload example — <code>POST /departments/</code></summary>

```json
{
  "sigla": "SEINFRA",
  "nome": "Infrastructure Department"
}
```
</details>

---

### 🏷️ Categories — `/categories`

| Method | Route | Description |
|---|---|---|
| `GET` | `/categories/` | List all categories |
| `POST` | `/categories/` | Create a new category |
| `GET` | `/categories/{id}` | Fetch category by ID |
| `PATCH` | `/categories/{id}` | Update a category |
| `DELETE` | `/categories/{id}` | Delete a category |

<details>
<summary>📋 Payload example — <code>POST /categories/</code></summary>

```json
{
  "nome": "Engineering Works and Services",
  "tipo": "Comum"
}
```
</details>

---

### 📜 Biddings — `/biddings`

| Method | Route | Description |
|---|---|---|
| `GET` | `/biddings/` | List biddings with filters |
| `POST` | `/biddings/` | Create a new bidding |
| `GET` | `/biddings/{id}` | Fetch bidding by ID |
| `PATCH` | `/biddings/{id}` | Update a bidding |
| `DELETE` | `/biddings/{id}` | Delete a bidding |

**Available query filters for `GET /biddings/`:**

| Parameter | Type | Description |
|---|---|---|
| `page` | `integer` | Page number (default: 1) |
| `limit` | `integer` | Items per page (max 100, default: 10) |
| `number` | `integer` | Bidding number |
| `year` | `integer` | Bidding year |
| `department_id` | `integer` | Filter by department |
| `category_id` | `integer` | Filter by category |
| `status` | `string` | Filter by status (e.g. `Aberto`) |
| `search` | `string` | Full-text search on object name |

<details>
<summary>📋 Payload example — <code>POST /biddings/</code></summary>

```json
{
  "user_id": 1,
  "department_id": 2,
  "category_id": 3,
  "number": 42,
  "year": 2025,
  "bidding_type": "Electronic Auction",
  "status": "Aberto",
  "classification": "Global",
  "object_name": "Acquisition of IT equipment",
  "object_description": "Laptops and peripherals for labs",
  "estimated_value": 150000.00,
  "publication_date": "2025-06-01",
  "opening_date": "2025-06-15"
}
```
</details>

---

### 📎 Attachments — `/licitacoes` · `/anexos`

| Method | Route | Description |
|---|---|---|
| `POST` | `/licitacoes/{id}/anexos` | Upload a document (`multipart/form-data`) |
| `GET` | `/licitacoes/{id}/anexos` | List all attachments for a bidding |
| `GET` | `/anexos/{id}/download` | Direct file download |
| `DELETE` | `/anexos/{id}` | Delete an attachment |

---

### 📊 Dashboard — `/dashboard`

| Method | Route | Description |
|---|---|---|
| `GET` | `/dashboard/` | General statistical summary |
| `GET` | `/dashboard/biddings` | List the most recent biddings |

---

## Database

The database is automatically initialized via Docker using the scripts in `init-db/`. The main structure is:

```
usuarios      → System managers and administrators
secretarias   → Requesting departments
categorias    → Bidding types / categories
licitacoes    → Core of the system (biddings)
anexos        → Linked documents (notices, minutes, contracts)
```

---


> Developed as part of [Unisal-Project](https://github.com/Unisal-Project).

