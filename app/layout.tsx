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
  const [pathwayCategories, setPathwayCategories] = useState([
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Business' },
    { id: 3, name: 'Creative Skills' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTheme(darkMode ? 'dark' : 'light');
  }, [darkMode, setTheme]);

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const handleCategorySelect = (categoryId: number) => {
    const selectedCategory = pathwayCategories.find(
      (category) => category.id === categoryId
    );
    if (selectedCategory) {
      setCategory(selectedCategory.name);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <html lang="en" className={theme}>
      <Head>
        <title>Learn Tracker - Personalized Learning Pathways</title>
        <meta
          name="description"
          content="A comprehensive online learning platform offering personalized learning pathways, adaptive assessments, and expert-led courses to help students and professionals achieve their goals in various fields, including technology, business, and creative skills."
        />
        <meta
          name="keywords"
          content="personalized learning, online learning platforms, learning management system, professional development, skill acquisition, e-learning, adaptive learning, educational technology, career development, online courses, certification programs, lifelong learning, skill development, career advancement, online education, learning analytics, artificial intelligence in education"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="16x16" type="image/x-icon" />
        <link rel="icon" href="/favicon-32x32.ico" sizes="32x32" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" type="image/png" />
        <meta name="theme-color" content="#000" />
        <meta name="color-scheme" content={theme} />
      </Head>
      <body className="font-sans text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
          <main id="main" className="mt-10">
            <PathwayFilter
              filter={filter}
              onFilterChange={handleFilterChange}
              aria-label="Filter pathways"
            />
            <PathwayCategories
              categories={pathwayCategories}
              selectedCategory={category}
              onCategorySelect={handleCategorySelect}
              aria-label="Select a category"
            />
            <div className="flex justify-center mb-4">
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search pathways"
                className="w-full max-w-md px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500 dark:border-gray-700 dark:focus:ring-gray-800"
                aria-label="Search pathways"
              />
            </div>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}