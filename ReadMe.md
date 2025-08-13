
# 💳 Digital Wallet System

A secure and role-based digital wallet application built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**.  
This system supports multiple user roles (**Admin**, **User**, **Agent**) and provides essential wallet operations like top-up, withdrawal, transfer, and transaction history.

---

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based login system
  - Role-based access control (Admin, User, Agent)
  - Secure password hashing using `bcrypt`

- **Wallet Management**
  - Automatic wallet creation on registration
  - Wallet balance tracking
  - Top-up and withdrawal
  - Fund transfer between users
  - Transaction history

- **Admin Features**
  - View all users and transactions
  - Manage user accounts

- **Agent Features**
  - Process deposits and withdrawals for users

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB
- **CLI Tool:** Mongoose
- **Authentication:** JSON Web Token (JWT)
- **Security:** bcrypt password hashing
- **Environment Management:** dotenv

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Joyanti-Chowdhury/digital-wallet-system-backend
   cd digital-wallet-system
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root and set:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/digital_wallet
   JWT_SECRET=your_jwt_secret
   ```

4. **Build the project**

   ```bash
   npm run build
   ```

5. **Run the server**

   * Development mode:

     ```bash
     npm run dev
     ```
   * Production mode:

     ```bash
     npm start
     ```

---

## 📂 Project Structure

```
digital-wallet-system/
│
├── src/
│   ├── config/        # Database connection & environment setup
│   ├── controllers/   # Business logic for wallet operations
│   ├── middleware/    # Authentication & role-based authorization
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API route definitions
│   ├── utils/         # Helper functions
│   └── index.ts       # App entry point
│
├── .env               # Environment variables
├── tsconfig.json      # TypeScript configuration
├── package.json
└── README.md
```

---

## 🧪 API Endpoints

| Method | Endpoint                   | Description                    | Auth Required | Roles Allowed      |
| ------ | -------------------------- | ------------------------------ | ------------- | ------------------ |
| POST   | `/api/v1/auth/register`       | Register new user              | No            | -                  |
| POST   | `/api/v1/auth/login`          | User login                     | No            | -                  |
| GET    | `/api/v1/wallet/transactions`      | Get wallet balance             | Yes           | User, Agent, Admin |
| POST   | `/api/v1/wallet/topUp`        | Add funds to wallet            | Yes           | User, Agent        |
| POST   | `/api/v1/wallet/withdraw`     | Withdraw funds                 | Yes           | User, Agent        |
| POST   | `/api/v1/wallet/transfer`     | Transfer funds to another user | Yes           | User               |
| GET    | `/api/v1/wallet/transactions` | View transaction history       | Yes           | User, Agent, Admin |
| GET    | `/api/v1/admin/users`         | Get all users                  | Yes           | Admin              |

---

## 📜 Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start server in development mode |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start`     | Start server in production mode  |
| `npm test`      | Run tests                        |

---

## 🗄️ Database

* **MongoDB** is used to store:

  * User details
  * Wallet balances
  * Transactions
  * Role-based permissions
* Use **Mongoose** to inspect or modify database entries manually.

---

## 🔒 Security

* Passwords are hashed with `bcrypt` before storage.
* JWT is used for secure stateless authentication.
* Role-based middleware ensures restricted access to sensitive routes.

live linK: https://digital-wallet-system-backend-kappa.vercel.app





