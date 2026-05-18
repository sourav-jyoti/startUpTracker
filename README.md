# startUpTracker

**startUpTracker** is a modern, full-stack web application built to help users discover, track, and manage startups. Users can browse a directory of startups, read the latest news, bookmark interesting companies, and even submit new ones. It also includes an admin dashboard for content moderation.

## 🚀 Features

* **Authentication:** Secure user registration and login, including seamless Google OAuth integration.
* **Startup Directory:** Browse and search through a list of curated startups with detailed information.
* **User Dashboard:** A personalized space to view bookmarked startups and manage submissions.
* **Startup Submissions:** Authenticated users can submit new startups to the database.
* **Bookmarking System:** Save your favorite startups for quick access later.
* **News Feed:** Stay updated with the latest news in the startup ecosystem.
* **Admin Dashboard:** A restricted area for administrators to moderate startups, toggle "featured" status, and delete entries.

## 💻 Tech Stack

This project is built using the **Laravel Boost** architecture, providing a highly performant and modern SPA experience without the complexity of separate repositories.

* **Backend:** Laravel 13.x (PHP 8.3+)
* **Frontend:** React 19.x
* **Routing:** Inertia.js v3
* **Styling:** Tailwind CSS v4
* **UI Components:** Radix UI, Framer Motion
* **Database:** MySQL / SQLite
* **Build Tool:** Vite

## 🛠️ Prerequisites

Make sure you have the following installed on your local machine:
* PHP >= 8.3
* Composer
* Node.js & npm (or pnpm/yarn)
* MySQL or SQLite (Database)

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd startUpTracker
   ```

2. **Install PHP Dependencies:**
   ```bash
   composer install
   ```

3. **Install Node.js Dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   Duplicate the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```

5. **Generate Application Key:**
   ```bash
   php artisan key:generate
   ```

6. **Configure Database & Credentials:**
   Open the `.env` file and set up your database connection details. Also, make sure to add your Google OAuth credentials if you want to use social login:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI="${APP_URL}/auth/google/callback"
   ```

7. **Run Database Migrations:**
   ```bash
   php artisan migrate
   ```

## 🏃‍♂️ Running the Application

To run the application locally, you need to start both the Laravel server and the Vite development server.

You can do this easily using the built-in dev script:
```bash
npm run dev
```
*(This uses concurrently to run `php artisan serve`, `php artisan queue:listen`, and Vite at the same time).*

Alternatively, you can run them in separate terminal tabs:
```bash
# Terminal 1: Start Laravel server
php artisan serve

# Terminal 2: Start Vite
npm run dev
```

Visit `http://localhost:8000` in your browser to access the application.

## 👥 Authors
* Tushar
* Alok
* Sourav