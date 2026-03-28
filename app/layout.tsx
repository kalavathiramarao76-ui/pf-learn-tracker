use client;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import { useTheme } from '../context/theme';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NextSeo } from 'next-seo';
import PathwayFilter from '../components/PathwayFilter';
import PathwayCategories from '../components/PathwayCategories';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const router = useRouter();
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    setTheme(darkMode ? 'dark' : 'light');
  }, [darkMode, setTheme]);

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  return (
    <html lang="en" className={theme}>
      <Head>
        <title>Learn Tracker - Personalized Learning Pathways</title>
        <meta name="description" content="A comprehensive online learning platform offering personalized learning pathways, adaptive assessments, and expert-led courses to help students and professionals achieve their goals in various fields, including technology, business, and creative skills." />
        <meta name="keywords" content="personalized learning, online learning platforms, learning management system, professional development, skill acquisition, e-learning, adaptive learning, educational technology, career development, online courses, certification programs, lifelong learning, skill development, career advancement, online education, learning analytics, artificial intelligence in education" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="16x16" type="image/x-icon" />
        <link rel="icon" href="/favicon-32x32.ico" sizes="32x32" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" type="image/png" />
        <meta name="theme-color" content="#000" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Learn Tracker" />
        <meta name="copyright" content="2024 Learn Tracker" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <NextSeo
        title="Learn Tracker - Unlock Your Potential with Personalized Learning Pathways"
        description="Discover a world of limitless learning opportunities with our adaptive learning platform, featuring expert-led courses, personalized recommendations, and a supportive community to help you achieve your goals."
        openGraph={{
          type: 'website',
          url: 'https://learn-tracker.com',
          title: 'Learn Tracker - Transform Your Career with Personalized Learning',
          description: 'Take the first step towards unlocking your potential with our personalized learning pathways, adaptive assessments, and expert-led courses.',
          images: [
            // Add image URLs here
          ],
        }}
      />
      <Header />
      <main className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <PathwayFilter filter={filter} onFilterChange={handleFilterChange} />
        <PathwayCategories category={category} onCategoryChange={handleCategoryChange} />
        {children}
      </main>
      <Footer />
    </html>
  );
}