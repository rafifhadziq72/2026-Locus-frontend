# Locus Room Booking System - Web Admin Dashboard

## 📝 Description

**Locus** is a room booking management system developed for the **PBL 2026** university project. This Frontend repository contains the Web Admin Dashboard, which allows administrators to monitor booking statuses, manage room schedules, and process approval requests.

The dashboard is designed to provide a real-time overview of the booking pipeline, integrating directly with the Locus Backend API to ensure data consistency and collision-free scheduling.

## 🚀 Tech Stack

* **Framework:** React
* **Language:** TypeScript
* **Build Tool:** Vite / Create React App
* **State Management:** React Hooks (useState, useEffect)
* **API Client:** Axios
* **Styling:** CSS Modules / Tailwind CSS

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-github-username/2026-Locus-frontend.git
   cd 2026-Locus-frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory and set your Backend API URL:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

The dashboard will be accessible at `http://localhost:5173` (or your local Vite port).

## 🛠 Project Standards & Workflow

This project follows the professional industry standards required for the PBL 2026 audit:

* **Branching Strategy:** GitHub Flow. Development is conducted in `feat/` and `fix/` branches.
* **Commit Format:** Conventional Commits (e.g., `fix(ui): reset loading state in BookingModal`).
* **Versioning:** Managed via Git Tags following Semantic Versioning (Current Release: `v1.1.0`).
* **State Lifecycle:** UI components implement robust state handling (e.g., `finally` blocks) to ensure loading indicators reset correctly even during API validation errors.

## 📡 Key Features & UI Logic

### Booking Management

* **Real-time Filtering:** The dashboard displays all bookings, including historical and soft-deleted records, for full audit transparency.
* **Error Handling:** Form submissions in the `BookingModal` include comprehensive validation feedback. If the backend returns a 400 Conflict (e.g., double-booking), the UI notifies the user and unlocks the submission button for correction.

### API Integration Layer

The frontend communicates with the following core backend workflows:

* `GET /api/bookings`: Populates the admin dashboard table.
* `PATCH /api/bookings/{id}`: Submits administrative approvals or rejections.

## 🧪 Build & Deployment

To create a production-ready build:

```bash
npm run build
```

## 📄 License & Audit Info

This project is developed for the PBL 2026 Track at Politeknik Elektronika Negeri Surabaya (PENS).

* **Target Deadline:** February 17, 2026
* **Audit Status:** Ready for Final Review
* **License:** MIT License