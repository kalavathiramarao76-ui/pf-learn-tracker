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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css"
        />
      </Head>
      <body className="animate__animated animate__fadeIn">
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
          <Header />
          <div className="flex flex-wrap justify-center mb-4">
            <div className="w-full lg:w-1/2 xl:w-1/3 p-6">
              <PathwayFilter
                filter={filter}
                handleFilterChange={handleFilterChange}
                className="animate__animated animate__slideInLeft"
              />
            </div>
            <div className="w-full lg:w-1/2 xl:w-1/3 p-6">
              <PathwayCategories
                category={category}
                handleCategoryChange={handleCategoryChange}
                handleCategorySelect={handleCategorySelect}
                pathwayCategories={pathwayCategories}
                className="animate__animated animate__slideInRight"
              />
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search pathways..."
              className="w-full lg:w-1/2 xl:w-1/3 p-4 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          <div className="flex flex-wrap justify-center">{children}</div>
          <Footer className="animate__animated animate__slideInUp" />
        </div>
      </body>
    </html>
  );
}