# Supplier Due Diligence Frontend

A modern frontend application built with **React**, **Vite**, and **Tailwind CSS**, providing an intuitive interface for supplier screening and due diligence.

---

## 🚀 Clone the Project

Clone the repository and move into the project directory:

```bash
git clone https://github.com/JexUgaz/SupplierDueDiligence-frontend.git
cd supplier-due-diligence-frontend
```

## 📦 Install Dependencies

Install the dependencies.

```bash
# Using pnpm (recommended)
pnpm install
```

## 🖥️ Backend Setup

This project requires the backend from the repository:

https://github.com/JexUgaz/SupplierDueDiligence-backend.git

Please clone that repo and follow its README instructions to install dependencies and run the backend server.

Once the backend is running, make sure to note the host and port where it is available.

---

## ⚙️ Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Update the .env file with your backend API URL, including host and port, and always ending with /api:

```bash
VITE_BACKEND_API_URL=http://<HOST>:<PORT>/api
```

Replace <HOST> and <PORT> with the actual backend server address and port. For example: http://localhost:5045/api.

If you want to run the frontend in development mode, you can also create a .env.development file instead.

## 🧪 Available Scripts

### Development Mode

Run the app locally in development mode:

```bash
# Default (uses .env)
pnpm run dev

# Or force development mode
pnpm run dev:dev
```

This will start the app on http://localhost:5173 (default port).

### Production Build

Build the app for production:

```bash
pnpm run build
```

Preview the production build locally:

```bash
pnpm run preview
```

You can also serve it manually:

```bash
npx serve -s dist -l 5173
```

## 🧭 Project Structure

```bash
src/
  ├── assets/          # Images, styles (Tailwind), background videos
  ├── config/          # App-level configuration
  ├── layouts/         # Layout components (e.g., HomeLayout)
  ├── modules/         # Feature-specific modules (auth, suppliers, errors)
  ├── navigation/      # Navigation setup (routes, redirects)
  ├── shared/          # Reusable components, hooks, context, services
  ├── App.tsx          # Root component
  └── main.tsx         # Entry point
```

## ✅ Requirements

- Node.js >= 18

- pnpm (recommended): Install globally via

```bash
npm install -g pnpm
```

- A working backend at the URL specified in VITE_BACKEND_API_URL

## 🎨 Stack

- React (Functional components, Hooks)

- Vite (Blazing-fast dev/build tool)

- Tailwind CSS (Utility-first styling)

- TypeScript (Static typing)
