# SpendWise 

SpendWise is a full-stack, visually striking personal expense tracker. Built with a modern tech stack, it provides users with a seamless, secure, and beautiful interface to monitor their daily spending, automatically compute monthly financial health, and visualize outgoings through categorical breakdown charts.

##  Key Features

- **Secure Authentication**: Robust local authorization utilizing hashed passwords and JWT-based session caching.
- **Dynamic Dashboard**: A real-time overview displaying total transactions, monthly outgoings, and a lively responsive doughnut chart rendering expense categories.
- **Expense Management (CRUD)**: Easily add, edit, and delete expense history. Includes automated inline table tracking and custom category labeling.
- **Profile Customization**: Users can seamlessly apply profile pictures handled intelligently via Base64 formatting to directly integrate with PostgreSQL limits.
- **Premium UI/UX**: Designed using Tailwind CSS embracing elegant glassmorphism, responsive gradient clipping, subtle transition animations, and Google's premium `Quicksand` typography framework.

## Tech Stack

**Frontend Layer**
- React.js (Vite)
- Tailwind CSS
- Chart.js (Data Visualization)
- React Router DOM
- Axios

**Backend Layer**
- Node.js
- Express.js
- PostgreSQL (Database)
- JWT (JSON Web Tokens)
- Bcryptjs (Cryptography)

## Database Schema

The application utilizes PostgreSQL utilizing two primary relational tables:

### `users` table
Stores core user identities, encrypted credentials, and mapped profile pictures.
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `password_hash` (VARCHAR)
- `profile_photo` (TEXT, Base64 format)
- `created_at` (TIMESTAMP)

### `expenses` table
Records transactional data securely linked to authenticated users.
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → `users.id`)
- `amount` (DECIMAL)
- `category` (VARCHAR)
- `description` (TEXT)
- `date` (DATE)
- `created_at` (TIMESTAMP)

## Local Installation & Setup

### Prerequisites
Make sure you maintain current installations of Node.js and PostgreSQL.

### 1. Database Configuration
1. Access your local PostgreSQL client.
2. Initialize a new local database (e.g., `spendwise_db`).
3. Set up the foundational schemas by executing the file provided at `backend/db/schema.sql`.

### 2. Formulating Environment Variables
Navigate to your `backend` folder and spawn a `.env` file containing your local credentials:
```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=spendwise_db
JWT_SECRET=super_secret_key_example
```

### 3. Booting up the Application 

**Start the Backend**:
```bash
cd backend
npm install
npm run dev
```

**Start the Frontend**:
```bash
cd frontend
npm install
npm run dev
```

You can now freely load and experiment with the application typically accessible via `http://localhost:5173`. Enjoy tracking!
