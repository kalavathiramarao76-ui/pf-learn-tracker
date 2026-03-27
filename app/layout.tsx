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
        <meta name="description" content="A comprehensive online learning platform offering personalized learning pathways, adaptive assessments, and expert-led courses to help students and professionals achieve their goals in various fields, including technology, business, and creative skills." />
        <meta name="keywords" content="personalized learning, online learning platforms, learning management system, professional development, skill acquisition, e-learning, adaptive learning, educational technology, career development, online courses, certification programs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000" />
        <meta property="og:title" content="Learn Tracker - Unlock Your Potential with Personalized Learning Pathways" />
        <meta property="og:description" content="Discover a world of limitless learning opportunities with our adaptive learning platform, featuring expert-led courses, personalized recommendations, and a supportive community to help you achieve your goals." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://learn-tracker.com" />
        <meta property="og:site_name" content="Learn Tracker" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Learn Tracker - Transform Your Career with Personalized Learning" />
        <meta name="twitter:description" content="Take the first step towards unlocking your full potential with our personalized learning pathways, designed to help you acquire new skills, enhance your knowledge, and stay ahead in your field." />
        <meta name="twitter:image" content="/twitter-image.png" />
        <meta name="twitter:site" content="@learntracker" />
        <meta property="fb:app_id" content="YOUR_APP_ID" />
        <meta property="fb:admins" content="YOUR_ADMIN_ID" />
        <meta name="pinterest" content="nopin" />
        <meta name="linkedin:title" content="Learn Tracker - Empowering Professionals with Personalized Learning Solutions" />
        <meta name="linkedin:description" content="Stay ahead in your career with our expert-led courses, personalized learning pathways, and adaptive assessments, designed to help you develop the skills and knowledge you need to succeed in today's fast-paced business landscape." />
        <meta name="linkedin:image" content="/linkedin-image.png" />
        <meta name="linkedin:url" content="https://learn-tracker.com" />
      </Head>
      <body className={theme}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}