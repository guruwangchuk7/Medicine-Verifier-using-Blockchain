
# MedSure - Blockchain-Based Medicine Verification System

## 📘 Project Overview
MedSure is a decentralized application (dApp) designed to ensure the authenticity and traceability of pharmaceutical products. By leveraging blockchain technology, it prevents counterfeiting and allows stakeholders (manufacturers, distributors, and consumers) to verify the provenance of medicines at every stage of the supply chain.

## 🏗️ Blueprint & Architecture

### **Core Modules**
1.  **Manufacturer Portal**: Secure dashboard for pharmaceutical companies to register batches, generate QR codes, and manage recalls.
2.  **Supply Chain Tracking**: Real-time logging of shipment events (Received, In Transit, Delivered) by distributors and retailers.
3.  **Consumer Verification**: Public interface to scan QR codes and verify the entire history of the medicine.
4.  **Admin/Regulatory View**: Oversight tools for ensuring compliance and responding to safety alerts.

### **Functional Flow**
1.  **Production**: Manufacturer creates a batch -> Hash generated on Blockchain.
2.  **Distribution**: Distributors scan shipments -> Location/Time appended to the chain.
3.  **Retail**: Pharmacy confirms receipt.
4.  **Consumption**: End-user scans the product -> Instant verification of "Safe" or "Counterfeit".

## 🛠️ Technology Stack

### **Frontend (Client)**
*   **Framework**: Next.js 14 (App Router)
*   **Styling**: Tailwind CSS & Shadcn UI
*   **Authentication**: Custom JWT & Google OAuth 2.0
*   **State Management**: React Hooks & Context

### **Backend (Server)**
*   **Framework**: NestJS (Modular Architecture)
*   **Database**: PostgreSQL
*   **ORM**: Prisma
*   **Caching/Queue**: Redis
*   **Authentication**: Passport.js (JWT, Google Strategy)

### **Infrastructure**
*   **Containerization**: Docker & Docker Compose
*   **Version Control**: Git & GitHub

## 🚀 Getting Started

### **Prerequisites**
*   Node.js (v18+)
*   Docker Desktop

### **Installation**

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/guruwangchuk7/Medicine-Verifier-using-Blockchain.git
    cd Medicine-Verifier-using-Blockchain
    ```

2.  **Setup Environment Variables**
    *   Create `.env` in `server/` with `DATABASE_URL`, `JWT_SECRET`, and Google Credentials.
    *   Create `.env.local` in `client/` with `NEXT_PUBLIC_API_URL`.

3.  **Start Infrastructure (DB & Redis)**
    ```bash
    docker-compose up -d postgres redis
    ```

4.  **Run Server**
    ```bash
    cd server
    npm install
    npx prisma generate
    npx prisma migrate dev
    npm run start:dev
    ```

5.  **Run Client**
    ```bash
    cd client
    npm install
    npm run dev
    ```

## 🔑 Key Features
*   **Secure Authentication**: Role-based access control (RBAC) for Manufacturers, Distributors, and Consumers.
*   **Interactive Dashboard**: Real-time stats, interactive charts, and batch management.
*   **Google Login**: Seamless One-Tap authentication.
*   **Recall System**: Instant global alerts for compromised medicine batches.

---
*Developed by Guru Wangchuk*