# Event Management System

Website Event Management System berbasis **React TypeScript**, **ExpressJS**, **Prisma ORM**, dan **PostgreSQL (Supabase)**.

Project ini dibuat untuk memenuhi tugas **UTS Pemrograman Web**.

---

## Tech Stack

### Frontend
- React TypeScript
- React Router DOM
- Tailwind CSS
- Zustand
- React Hook Form
- Zod
- Axios
- Lucide React

### Backend
- ExpressJS
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- Railway Deployment

---

## Features

### Authentication
✔ Login menggunakan **NIM & Password**  
✔ State Management menggunakan **Zustand**  
✔ Protected Routes

### Category Management
✔ Create Category  
✔ Read Category  
✔ Update Category  
✔ Delete Category

### Speaker Management
✔ Create Speaker  
✔ Read Speaker  
✔ Update Speaker  
✔ Delete Speaker

### Event Management
✔ Create Event  
✔ Read Event  
✔ Update Event  
✔ Delete Event  
✔ Dynamic Dropdown Category & Speaker

### Biodata Page
✔ Menampilkan biodata mahasiswa pembuat website

---

## Database Schema

Project memiliki 3 tabel utama:

### Category

| Field | Type |
|-------|------|
| id | Int |
| name | String |

### Speaker

| Field | Type |
|-------|------|
| id | Int |
| name | String |
| role | String |
| image | String |

### Event

| Field | Type |
|-------|------|
| id | Int |
| name | String |
| categoryId | Int |
| speakerId | Int |
| location | String |
| dateEvent | DateTime |
| description | String |

---

## API Endpoints

### Categories

```http
GET /categories
POST /categories
PUT /categories/:id
DELETE /categories/:id
```

### Speakers

```http
GET /speakers
POST /speakers
PUT /speakers/:id
DELETE /speakers/:id
```

### Events

```http
GET /events
POST /events
PUT /events/:id
DELETE /events/:id
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

---

### Backend Setup

Masuk ke folder backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Buat file `.env`

```env
DATABASE_URL="your_database_url"
PORT=3000
```

Run migration:

```bash
npx prisma migrate dev
```

Jalankan server:

```bash
npm run dev
```

---

### Frontend Setup

Masuk ke folder frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Jalankan frontend:

```bash
npm run dev
```

---

## Deployment

### Frontend Deployment (Vercel)

Live Demo:

```txt
https://uts-pemweb-ayusef9s-projects.vercel.app
```

### Backend Deployment (Railway)

API Base URL:

```txt
https://utspemweb-production.up.railway.app/
```

---

## Author

**Ayu Seftiani**  
NIM: **24090116**  
Mata Kuliah: **Pemrograman Web**
