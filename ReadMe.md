
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

          
auth

Post : /api/v1/user/register .....For Register User
Post : /api/v1/auth/login .....For login User

Wallet

Post : /api/v1/wallet/add-money.....For add-money user and admin
Post : /api/v1/wallet/withdraw.....For withdraw user and admin
Post : /api/v1/wallet/transfer.....For transfer user and admin
get : /api/v1/wallet/transactions.....For view all transaction user
get : /api/v1/wallet/view-transactions-history.....For view all transaction history user and admin

patch : api/v1/wallet/block-user/id ...... for block user admin
---

Agent

Post : /api/v1/agent/add-money.....For add-money user and admin
Post : /api/v1/agent/withdraw.....For withdraw user and admin
patch : /api/v1/agent/approved-admin-status/id.....For admin  approved user   
patch : /api/v1/agent/suspended-admin-status/:adminId.....For admin  suspended user   




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





