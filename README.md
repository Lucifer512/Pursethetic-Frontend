# Pursethetic Ecommerce Web Application

This is a modern ecommerce web application built with [Next.js](https://nextjs.org), TypeScript, Tailwind CSS, styled-components, and axios. It features a clean UI, product listing, and a scalable folder structure for rapid development.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `src/components` – Reusable UI components (Navbar, ProductCard, etc.)
- `src/pages` – App routes (products, cart, account, etc.)
- `src/styles` – Global and component styles
- `src/features` – Feature-specific logic (cart, user, etc.)
- `src/data` – Static or mock data
- `src/hooks` – Custom React hooks
- `src/lib` – Utility libraries

## Features

- Modern, clean UI with Tailwind CSS and styled-components
- Product listing and detail pages
- Shopping cart basics
- Ready for API integration with axios

## Customization

Replace placeholder images in `/public/images` with your own product images.

## Learn More

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
