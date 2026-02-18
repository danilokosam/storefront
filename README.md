# Storefront

A modern e-commerce application built with Astro, React, and TypeScript. This project implements a complete product listing, cart management, and order processing system with PayStack payment integration.

## 🚀 Project Status

**Current Stage:** In Development

### Completed Features
- ✅ Product listing and filtering
- ✅ Shopping cart management with localStorage persistence
- ✅ Product detail views
- ✅ Order creation and management system
- ✅ State management with Nanostores
- ✅ API integration with interceptors
- ✅ User authentication (register/login)
- ✅ User profile management
- ✅ Admin permissions system
- ✅ Product reviews system
- ✅ Payment processing with PayStack

### In Progress
- 🔄 UI Components refinement
- 🔄 Enhanced error handling
- 🔄 Additional admin features

## 📁 Project Structure

```
storefront/
├── public/                 # Static assets (images, icons, etc.)
│
├── src/
│   ├── actions/           # Action handlers & request functions
│   │   ├── authActions.ts              # Authentication request handlers
│   │   ├── cartActions.ts              # Cart operations (add, remove)
│   │   ├── orderActions.ts             # Order management handlers
│   │   ├── productsAction.ts           # Product operations handlers
│   │   └── userActions.ts              # User profile management
│   │
│   ├── api/               # API client & service layer
│   │   ├── apiClient.ts                # Axios instance configuration
│   │   ├── apiService.ts               # API endpoints & requests
│   │   └── interceptors.ts             # Request/response interceptors
│   │
│   ├── pages/             # Astro pages (routing)
│   │   └── index.astro                 # Homepage
│   │
│   ├── stores/            # Nanostores state management
│   │   ├── authStore.ts                # Authentication state
│   │   ├── cartStore.ts                # Shopping cart state
│   │   ├── orderStore.ts               # Orders state
│   │   ├── productsStore.ts            # Products state
│   │   └── userStore.ts                # User profile state
│   │
│   ├── styles/            # Global styles
│   │   └── global.css                  # Tailwind & global styles
│   │
│   ├── types/             # TypeScript type definitions
│   │   ├── auth.ts                     # Authentication types
│   │   ├── cart.ts                     # Cart item types
│   │   ├── order.ts                    # Order & payment types
│   │   ├── product.ts                  # Product types
│   │   └── user.ts                     # User types
│   │
│   └── utils/             # Utility functions
│       └── runAction.ts                # Generic action runner with loading/error handling
│
├── astro.config.mjs       # Astro configuration
├── biome.json             # Code formatting & linting config
├── package.json           # Project dependencies
├── pnpm-lock.yaml         # Lock file for dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 📂 Detailed Directory Guide

### `src/actions/`
Contains request handler functions that orchestrate API calls and state updates. Each action module separates concerns for specific features:

- **authActions.ts** - User registration and login handlers
- **cartActions.ts** - Add/remove products from cart with stock validation
- **orderActions.ts** - Create orders, fetch order details, process payments
- **productsAction.ts** - List, create, delete products, and handle reviews
- **userActions.ts** - Load profile, update profile, manage users, set admin permissions

### `src/api/`
Handles all HTTP communication with the backend:

- **apiClient.ts** - Configures Axios instance with base URL and interceptors
- **apiService.ts** - Defines all API endpoints with proper TypeScript types
- **interceptors.ts** - Request/response handling (authentication tokens, error management)

### `src/pages/`
Astro-powered routing. Each file creates a route:

- **index.astro** - Homepage and main application entry point

### `src/stores/`
Nanostores-based state management (lightweight alternative to Redux/Zustand):

- **authStore.ts** - Authentication state (user data, tokens)
- **cartStore.ts** - Shopping cart items and loading states
- **orderStore.ts** - Order details, lists, and payment status
- **productsStore.ts** - Product list, single product, reviews
- **userStore.ts** - User profile and admin user management

### `src/types/`
TypeScript interfaces and types for type safety:

- **auth.ts** - Login/Register payloads, AuthState interface
- **cart.ts** - ICartItem interface for cart items
- **order.ts** - IOrder, OrderItem, IPaymentResult interfaces
- **product.ts** - IProduct, ProductListRequest, Review types
- **user.ts** - IUser interface and user update payloads

### `src/utils/`
Reusable utility functions:

- **runAction.ts** - Generic wrapper for async operations with built-in loading/error state management

### `src/styles/`
Global styling with Tailwind CSS integration

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Astro** | Framework for building fast, content-focused websites |
| **React** | UI component library for interactive features |
| **TypeScript** | Type safety and better developer experience |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **Nanostores** | Lightweight state management library |
| **Axios** | HTTP client library for API requests |
| **React PayStack** | Payment processing integration |
| **Biome** | Fast formatter and linter for code quality |

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd storefront
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
SERVER_URL=https://your-backend-api.com
```

4. **Start the development server**
```bash
pnpm dev
```
The application will be available at `http://localhost:4321`

## 📜 Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server at `localhost:4321` |
| `pnpm build` | Build production-ready site to `./dist/` |
| `pnpm preview` | Preview build locally before deployment |
| `pnpm format` | Format code with Biome |
| `pnpm format:check` | Check code formatting without changes |
| `pnpm lint` | Lint and auto-fix code issues |
| `pnpm lint:check` | Check code for linting issues |
| `pnpm check` | Run complete Biome check (format + lint) |
| `pnpm check:ci` | CI/CD version of check (no auto-fix) |

## 🏗️ Architecture Overview

### Data Flow
```
User Interaction (Components)
        ↓
    Actions (src/actions/)
        ↓
    API Service (src/api/)
        ↓
    Axios + Interceptors
        ↓
    Backend Server
        ↓
    Response → Stores (Nanostores)
        ↓
    Components Re-render
```

### State Management Pattern
Each feature uses a consistent pattern:
- `loadingXXX` - Boolean atom for tracking loading state
- `errorXXX` - String atom for storing error messages
- `xxxState` - Map or atom storing actual data
- `xxxAction` - Function that runs operations and updates state

**Example:** Product management
```
loadingProductList → Boolean state during API call
errorProductList → Error message if request fails
productListState → Stores array of products
listProductRequest → Function that coordinates the action
```

## 🔐 Authentication Flow

1. User registers or logs in through authentication UI
2. `authActions` receive credentials (name, email, password)
3. API validates and returns user data + authentication token
4. Token is stored in localStorage for persistence
5. Interceptors automatically add token to subsequent requests headers
6. Token is included in global auth state for access across components

## 🛒 Cart Management

- Items stored in both Nanostores (global state) and localStorage (persistence)
- Stock validation performed before adding items to cart
- Automatic stock updates fetched from server to ensure accuracy
- SSR-safe implementation with null checks for browser APIs
- Cart persists across browser sessions

## 💳 Payment Processing

- Integrated with PayStack for secure online payments
- Order created in database before payment initialization
- Payment result updates order status (isPaid, paidAt)
- Admin dashboard can mark orders as delivered
- OrderItems track product details at time of purchase

## 🚀 Deployment

### Production Build
```bash
pnpm build
# Generates optimized site in dist/ directory
```

Deploy the `dist/` directory to your hosting service:
- Vercel, Netlify, or any static hosting service
- Or deploy to dedicated server with Node.js for SSR

## 🏢 Project Features in Detail

### Products Module
- **List products** with pagination support
- **Filter and search** functionality
- **Create products** (admin only)
- **Delete products** (admin only)
- **Leave reviews** with ratings and comments
- **Stock tracking** and validation

### Orders Module
- **Create orders** from cart items
- **View order details** with full transaction info
- **Process payments** via PayStack integration
- **Track payment status** (pending, completed, failed)
- **Mark as delivered** (admin capability)
- **View order history** (user's past orders)
- **Admin order list** (view all system orders)

### User Management
- **User registration** with name, email, password
- **User login** with credential validation
- **Profile management** (view, edit name/email)
- **Admin system** with make-admin functionality
- **User list** (admin view all users)

### Cart Management
- **Add to cart** with quantity selection
- **Remove from cart** by product ID
- **Validate stock** before adding items
- **Persist cart** in browser storage
- **Calculate totals** (items, tax, shipping)

## 📝 Code Quality

This project uses **Biome** for code formatting and linting:
- Consistent code style across all files
- Type checking with TypeScript
- Automatic fixes for common issues
- Pre-commit validation ready

```bash
pnpm check      # Format + lint with auto-fix
pnpm check:ci   # Validation only (CI/CD)
```

## 🔄 Current Development Process

Recent refactoring separated concerns across the codebase:
- **Stores** (`src/stores/`) - Pure state management
- **Actions** (`src/actions/`) - Business logic and API coordination
- **Types** (`src/types/`) - Type definitions and interfaces
- **API** (`src/api/`) - HTTP communication layer
- **Utils** (`src/utils/`) - Reusable helper functions

This architecture improves maintainability and makes testing easier.

## 📋 Future Enhancements

- [ ] Add advanced search with multiple filters
- [ ] Implement product recommendations engine
- [ ] Create wishlist feature
- [ ] Add user ratings and reviews display
- [ ] Enhance admin dashboard with analytics
- [ ] Implement order tracking with status updates
- [ ] Add multiple payment methods
- [ ] Create mobile-responsive UI
- [ ] Add product inventory management
- [ ] Implement email notifications

## 🤝 Contributing

This project is currently in active development. Contributions and suggestions are welcome!

## 📞 Support

For issues, questions, or suggestions:
1. Check existing issues in the repository
2. Create a detailed issue report with reproduction steps
3. Reference relevant code sections

---

**Last Updated:** February 18, 2026

**Version:** 0.0.1 (In Development)
