# Personalized Learning Pathways

Learn Tracker is a personalized learning platform that helps students and professionals set and achieve their learning goals. It provides a customizable learning path, tracks progress, and offers recommendations for improvement.

## Features

* Customizable learning pathways
* Progress tracking
* Personalized recommendations
* Reminders and alerts
* Integrations with popular learning resources
* Mobile optimization

## Pages

* Dashboard
* Learning Path
* Progress Tracker
* Recommendations
* Settings
* Upgrade

## SEO Keywords

online learning platforms, personalized learning, learning management system, professional development, skill acquisition

## Getting Started

To get started with Learn Tracker, simply create an account and start building your personalized learning plan.

## Technology Stack

* Next.js 14 App Router
* TypeScript
* Tailwind CSS

## Premium UI

Learn Tracker features a premium UI with a clean typography, subtle animations, and dark mode support. The design is inspired by Linear and Notion, providing a seamless and intuitive user experience.

## Mobile Optimization

Learn Tracker is optimized for mobile devices, ensuring a smooth and responsive experience on any screen size.

## Local Storage

Learn Tracker uses local storage to store user data, eliminating the need for external services.

## Package.json

```json
{
  "name": "learn-tracker",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.0"
  }
}
```

## Next.config.mjs

```javascript
module.exports = {
  experimental: {
    appDir: true,
  },
}
```

## Layout.tsx

```typescript
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Learn Tracker</title>
        <meta name="description" content="Personalized learning platform" />
        <meta name="keywords" content="online learning platforms, personalized learning, learning management system, professional development, skill acquisition" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

## Landing Page

```typescript
use client;

import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="h-screen bg-gradient-to-b from-blue-500 to-blue-800 flex justify-center items-center">
        <h1 className="text-5xl text-white font-bold">Learn Tracker</h1>
      </div>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <h2 className="text-3xl text-gray-700 font-bold">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl text-gray-700 font-bold">Customizable learning pathways</h3>
            <p className="text-gray-600">Create a tailored learning plan that suits your needs.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl text-gray-700 font-bold">Progress tracking</h3>
            <p className="text-gray-600">Track your progress and stay motivated.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl text-gray-700 font-bold">Personalized recommendations</h3>
            <p className="text-gray-600">Get recommendations for improvement based on your learning style.</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <h2 className="text-3xl text-gray-700 font-bold">Pricing</h2>
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Features</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Basic</td>
              <td className="px-4 py-2">$9.99/month</td>
              <td className="px-4 py-2">Customizable learning pathways, progress tracking</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Premium</td>
              <td className="px-4 py-2">$19.99/month</td>
              <td className="px-4 py-2">Customizable learning pathways, progress tracking, personalized recommendations</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <h2 className="text-3xl text-gray-700 font-bold">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl text-gray-700 font-bold">What is Learn Tracker?</h3>
            <p className="text-gray-600">Learn Tracker is a personalized learning platform that helps students and professionals set and achieve their learning goals.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl text-gray-700 font-bold">How does it work?</h3>
            <p className="text-gray-600">Simply create an account, set your learning goals, and start building your personalized learning plan.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl text-gray-700 font-bold">What features does it offer?</h3>
            <p className="text-gray-600">Learn Tracker offers customizable learning pathways, progress tracking, personalized recommendations, and more.</p>
          </div>
        </div>
      </div>
      <footer className="bg-gray-200 p-4 text-gray-600">
        <p>&copy; 2024 Learn Tracker. All rights reserved.</p>
      </footer>
    </Layout>
  );
}