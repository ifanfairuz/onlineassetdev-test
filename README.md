# onlineassetdev-test

# Demo

https://onlineassetdev-test.vercel.app(https://onlineassetdev-test.vercel.app/)

# Getting Started

## Prerequisites

- Node.js >= v22
- PostgreSQL

## Installation

1. Clone the repository

```bash
git clone https://github.com/onlineassetdev/devtest.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following content:

| Variable    | Description                          | Default |
| ----------- | ------------------------------------ | ------- |
| PORT        | The port number to run the server on | 3000    |
| BASE_URL    | The base URL for the application     | /       |
| DISABLE_SSR | Disable server-side rendering        | false   |
| PGUSER      | PostgreSQL username                  |         |
| PGPASSWORD  | PostgreSQL password                  |         |
| PGHOST      | PostgreSQL host                      |         |
| PGPORT      | PostgreSQL port                      |         |
| PGDATABASE  | PostgreSQL database name             |         |

4. Build the project

```bash
npm run build
```

5. Run migrations and seeders

```bash
npm run db:migrate
npm run db:seed
```

6. Start the server

```bash
npm run start
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser or visit `http://localhost:PORT` in your browser

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vue 3](https://v3.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vue Sonner](https://github.com/ifanfairuz/vue-sonner)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Merge](https://github.com/dcastil/tailwind-merge)
- [Vee Validate](https://vee-validate.logaretm.com/)
- [Zod](https://github.com/colinhacks/zod)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/)
- [Node Pg](https://node-postgres.com/)
