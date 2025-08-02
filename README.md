# 🛒 SEO-Optimized E-commerce Frontend

A minimal yet fully functional e-commerce frontend built with **Next.js App Router**, **Redux Toolkit**, **TypeScript**, and **Tailwind CSS**. This project demonstrates key skills in frontend architecture, responsive UI, SEO optimization, and state management — all without any backend.

## 🚀 Live Demo

[Link to Vercel Deployment](https://shopping-square.vercel.app/) *(Update this once deployed)*

---

## 📁 Features Overview

### ✅ Home Page (`/`)
- Fetches and displays products from [Fake Store API](https://fakestoreapi.com/products)
- Responsive grid layout
- Each product shows:
  - Thumbnail
  - Title
  - Price
  - "View Details" button (links to product page)

### ✅ Product Details Page (`/product/[id]`)
- Uses `getStaticPaths` and `getStaticProps` (SSG)
- Dynamically generated SEO metadata (`<title>`, `<meta description>`)
- Displays:
  - Full product image
  - Title, description, price, category, rating
  - "Add to Cart" button
- Accessible, semantic markup

### ✅ Cart Sidebar
- Redux-managed cart
- Slides in from the right
- Shows products with quantity, total price, and remove button

### ✅ Checkout Page (`/checkout`)
- Form fields:
  - Full Name
  - Shipping Address
  - Phone Number
- React Hook Form with validation
- Order stored in Redux on submit
- Redirects to "Thank You" confirmation

### ✅ Orders Page (`/orders`)
- Lists all submitted orders (Redux)
- Order fields:
  - Order ID
  - Customer Name
  - Total Items
  - Total Amount
  - Order Date
- Click an order to see full details

---

## 🧠 SEO Techniques Used

- Dynamic `<title>` and `<meta description>` using `next/head`
- Clean, crawlable URLs: `/`, `/product/5`, `/checkout`, `/orders`
- Semantic HTML (`<main>`, `<section>`, `<article>`, etc.)
- All images include descriptive `alt` tags
- Sitemap and robots.txt included in `public/`

---

## 🧱 Tech Stack

| Tool             | Purpose                      |
|------------------|------------------------------|
| **Next.js**      | App Router, SSG, routing     |
| **TypeScript**   | Static typing                |
| **Redux Toolkit**| State management (cart & orders) |
| **Tailwind CSS** | Utility-first styling        |
| **React Hook Form** | Form management & validation |

---

---

## 🛠️ Setup Instructions

### Prerequisites:
- Node.js 18+
- Yarn or npm

### Installation:

```bash
git clone https://github.com/Sifat-Ikram/shopping-square.git
cd seo-ecommerce-task
npm install
# or
yarn install
npm run dev
# or
yarn dev
npm run build
npm run start
