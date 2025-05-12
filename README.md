# CRUD API

## 📦 Description

This project implements a full-featured RESTful CRUD API using an in-memory database. It allows creating, reading, updating, and deleting users. Built with TypeScript without using any web framework (e.g., Express).

---

## 🚀 Installation & Run

### 1. Install dependencies

```bash
npm install
```

### 2. Run in development mode

```bash
npm run start:dev
```

### 3. Run in production mode

```bash
npm run start:prod
```

### 4. Run with horizontal scaling (Cluster API)

```bash
npm run start:multi
```

### 5. Run tests

```bash
npm run test
```

> The server reads the port value from `.env`:
> ```
> PORT=4000
> ```

---

## 📋 API Endpoints

Base URL: `http://localhost:4000/api/users`

| Method | Path             | Description                   |
|--------|------------------|-------------------------------|
| GET    | `/api/users`     | Retrieve all users            |
| GET    | `/api/users/{id}`| Retrieve a user by ID         |
| POST   | `/api/users`     | Create a new user             |
| PUT    | `/api/users/{id}`| Update an existing user       |
| DELETE | `/api/users/{id}`| Delete a user                 |

---

## 🧾 User object format

```ts
{
  id: string;          // auto-generated (uuid)
  username: string;
  age: number;
  hobbies: string[];
}
```

---

## ✅ Validation & Error Handling

- UUIDs are validated
- 400 returned for invalid data or malformed requests
- 404 returned if user not found
- 500 for internal server errors
- 404 for non-existing routes

---

## 🧠 Extras

- Horizontal scaling via Node.js Cluster API
- Tests implemented covering all major scenarios
- In-memory storage shared across processes
- No external HTTP libraries or frameworks used

---

## 📁 Project Structure

```
src/
├── controllers/
├── db/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── app.ts
├── server.ts
├── cluster.ts
tests/
├── user.test.ts
```

---

## 🛡 Allowed dependencies only

Used packages are within allowed scope:
- `typescript`, `ts-node`, `ts-node-dev`, `nodemon`
- `dotenv`, `cross-env`, `uuid`
- `webpack`, `eslint`, `prettier`
- `@types/*`

---

## 👤 Author

- GitHub: [Cyber-Craftsman](https://github.com/Cyber-Craftsman)
