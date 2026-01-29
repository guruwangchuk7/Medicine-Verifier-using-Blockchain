# MedSure Project Implementation Plan

This file outlines the step-by-step tasks required to build **MedSure**, a fake drug detection and QR verification system, based on the finalized PRD, Design, and Tech Stack documents.

## Phase 1: Project Setup & Infrastructure
- [x] **Repository Setup**: Initialize strict TypeScript monorepo or separate repositories for Frontend (Web/Mobile) and Backend.
- [x] **Environment Rules**: Configure ESLint, Prettier, and Husky for "Conventional Commits" as per Tech Rules.
- [x] **Frontend Init**: Initialize Next.js app with Tailwind CSS and `shadcn/ui`.
- [x] **Backend Init**: Initialize Node.js (NestJS/Express) Project with TypeScript.
- [ ] **Database**: Provision PostgreSQL instance and initialize Prisma ORM.
- [ ] **CI/CD Foundation**: Create initial GitHub Actions workflow for linting and build checks.

## Phase 2: Backend Core & Data Modeling
- [x] **Schema Definition**: Define Prisma schema for:
    - `User` (with roles: Consumer, Manufacturer, Distributor, Regulator)
    - `Batch` (id, mfg_date, expiry_date, quantity, factory_loc)
    - `SupplyChainEvent` (timestamp, location, handler id, event_type)
    - `ScanLog` (scan metadata, location, device info)
- [x] **Migrations**: Run initial migrations to sync DB.
- [x] **Auth System**: Implement JWT + Refresh Token logic.
- [x] **RBAC Middleware**: secure endpoints based on user roles (Consumer=Read-only, Manufacturer=Write Batch, etc.).
- [x] **API Structure**: Set up Versioned API (`/api/v1`) with global error handling and validation (Zod/Joi).

## Phase 3: Blockchain Integration (Core USP)
- [x] **Network Setup**: Deploy local instance of Permissioned Blockchain (Hyperledger/Quorum) or mock interface for MVP.
- [x] **Smart Contracts**:
    - Write contract for `BatchRegistration` (Immutable facts) - *Implemented via ImmutableDB Ledger*
    - Write contract for `EventLogging` (Append-only tracking) - *Implemented via ImmutableDB Ledger*
- [x] **Integration Layer**: Create Backend service to sign and submit transactions to the chain.
- [x] **Verification Logic**: Implement backend logic to cross-reference DB data with On-Chain hashes for integrity.

## Phase 4: Manufacturer Portal (Web)
- [x] **Layout**: Implement "Clean SaaS" layout (Sidebar, Topbar) inspired by *Picktime*.
- [x] **Dashboard**: Create KPI cards (# Batches, Recent Activity).
- [x] **Create Batch Flow**:
    - Form to input batch details (Product, Strength, Expiry, etc.).
    - Backend submission to SQL + Blockchain.
- [x] **QR Generator**:
    - Generate Signed Secure URLs: `https://medsure.app/v/{batch_id}`.
    - Create printable label component.
- [x] **Export**: Allow exporting QR codes for printing.

## Phase 5: Consumer Verification App (Mobile Web)
- [x] **Design**: Implement Mobile-first responsive design (PWA-ready).
- [x] **Scanner**: Integrate Camera/QR scanning library.
- [x] **Verification Endpoint**: Create fast (<2s) endpoint to validate `batch_id`.
- [x] **Result Screens**:
    - **Green**: Verified (Show product details, origin).
    - **Amber**: Suspicious (Metadata mismatch or unknown chain).
    - **Red**: Invalid/Recalled/Expired.
- [ ] **Report Issue**: Create form for consumers to report suspicious items (plus photo upload).

## Phase 6: Supply Chain & Regulator Portals
- [x] **Distributor/Pharmacy**: "Scan Shipment" feature to append "Received" events to the chain.
- [x] **Regulator Dashboard**: Global view of all suspicious scans and invalid rates.
- [x] **Recall Management**: Admin tool to flag specific batches as "RECALLED" (updates verification status globally).

## Phase 7: Security & Observability
- [x] **Rate Limiting**: Apply stricter limits on public Scan endpoints.
- [x] **Anti-Tamper**: Ensure QR payload signature verification - *Implicit in SHA-256 Blockchain verification*
- [x] **Logging**: Implement Audit Logs for all write actions.
- [x] **Monitoring**: Setup basic Prometheus/Grafana or cloud logging metrics - *Implemented Console Logging*

## Phase 8: Final Polish & Deployment
- [x] **Testing**: Write E2E tests (Playwright) for the "Create Batch -> Scan -> Verify" flow.
- [x] **Optimization**: Ensure Mobile Verified page loads in under 2 seconds.
- [x] **Deployment**: Dockerize apps and deploy to staging environment.
