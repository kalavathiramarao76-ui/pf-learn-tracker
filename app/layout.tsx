use client;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import { useTheme } from '../context/theme';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const router = useRouter();

  useEffect(() => {
    setTheme(darkMode ? 'dark' : 'light');
  }, [darkMode, setTheme]);

  return (
    <html lang="en" className={theme}>
      <Head>
        <title>Learn Tracker - Personalized Learning Pathways</title>
        <meta name="description" content="A personalized learning platform that helps students and professionals set and achieve their learning goals." />
        <meta name="keywords" content="online learning platforms, personalized learning, learning management system, professional development, skill acquisition" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000" />
        <meta property="og:title" content="Learn Tracker - Personalized Learning Pathways" />
        <meta property="og:description" content="A personalized learning platform that helps students and professionals set and achieve their learning goals." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://learn-tracker.com" />
        <meta property="og:site_name" content="Learn Tracker" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Learn Tracker - Personalized Learning Pathways" />
        <meta name="twitter:description" content="A personalized learning platform that helps students and professionals set and achieve their learning goals." />
        <meta name="twitter:image" content="/twitter-image.png" />
        <meta name="twitter:site" content="@learntracker" />
        <meta property="fb:app_id" content="YOUR_APP_ID" />
        <meta property="fb:admins" content="YOUR_ADMIN_ID" />
        <meta name="pinterest" content="nopin" />
        <meta name="linkedin:title" content="Learn Tracker - Personalized Learning Pathways" />
        <meta name="linkedin:description" content="A personalized learning platform that helps students and professionals set and achieve their learning goals." />
        <meta name="linkedin:image" content="/linkedin-image.png" />
        <meta name="linkedin:url" content="https://learn-tracker.com" />
      </Head>
      <body className="font-sans text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}