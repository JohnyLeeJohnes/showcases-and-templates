# Showcases & Templates

A collection of small projects. Every folder is one project:

- **Template** = a starting point you can copy and build your own app on.
- **Showcase** = a small example that shows how something works.

| Folder | Type | What it is | Tech |
|---|---|---|---|
| [jecna-template-project](jecna-template-project) | Template | Web app with register / login / logout | Node.js, Express, EJS, Passport, MySQL |
| [mailer-project](mailer-project) | Template | App + REST API for sending emails | PHP, Slim 4, PHPMailer |
| [nestjs-template](nestjs-template) | Template | REST API (CRUD for books) with Swagger and Docker | NestJS, Fastify, TypeORM, MySQL |
| [promise-showcase](promise-showcase) | Showcase | Small scripts that explain JavaScript Promises | Node.js, axios |
| [simple-php-routing](simple-php-routing) | Showcase | Routing in plain PHP without a framework, with a simple login | PHP, MySQL |

Every project is independent - go into its folder and follow the steps below.

---

## jecna-template-project

A server-rendered web app. Users can register, log in and log out. Passwords are hashed (scrypt with a random salt) and users are stored in MySQL.

```bash
cd jecna-template-project
npm install
cp .env.example .env     # then fill in your database login
```

1. Create the database and the `user` table: run `script/init.sql` in MySQL.
2. Start the app: `npm run dev` (restarts on file change) or `npm start`.
3. Open http://localhost:5000

## mailer-project

A website where you write an email and the server sends it through SMTP. The browser calls the REST API `POST /api/sendEmail` with an `Api-Key` header. If sending fails, the email is saved in the browser (localStorage) and sent again automatically every minute. The idea is drawn in [docs/architecture.png](mailer-project/docs/architecture.png).

```bash
cd mailer-project
composer install
cp .env.example .env     # set API_KEY and your SMTP server
composer start
```

1. Open http://localhost:8080
2. Go to **API key** and enter the same value as `API_KEY` in `.env`.
3. Go to **Send email**.

## nestjs-template

A REST API template: books CRUD, validation of requests, Swagger docs, logging of every request into the database, migrations and seeding. Everything can run in Docker.

```bash
cd nestjs-template
npm install
cp .env.example .env
docker compose up -d db  # starts MySQL
npm run migration:run    # creates the tables
npm run seed             # adds some books
npm run start:dev
```

- API: http://localhost:3000/api/v1/books
- Swagger: http://localhost:3000/api
- Tests: `npm test`
- Run the API in Docker too: `docker compose up -d --build`

## promise-showcase

Five short scripts, from the basics to async/await. Read the code, run it, and look at the output.

```bash
cd promise-showcase
npm install
npm run base      # 1. create a promise, then / catch / finally
npm run all       # 2. Promise.all, allSettled, race
npm run chaining  # 3. chaining .then() calls
npm run axios     # 4. HTTP requests with axios
npm run async     # 5. the same request with .then() and with async/await
```

## simple-php-routing

One `index.php` handles every URL and decides which page to show - no framework. It also has a simple login against MySQL.

1. Run `database.sql` in MySQL (creates the `LoginTest` database and a demo user **karel** / **ahoj123**).
2. Check the database login in `views/login/DBC.php`.
3. Start it:

```bash
cd simple-php-routing
php -S localhost:8000 index.php
```

4. Open http://localhost:8000

With Apache, put the folder in the web root - `.htaccess` sends every request to `index.php`.
