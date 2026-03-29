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
  const [navOpen, setNavOpen] = useState(false);
  const [subCategories, setSubCategories] = useState({
    Technology: ['Web Development', 'Data Science', 'Artificial Intelligence'],
    Business: ['Marketing', 'Finance', 'Management'],
    'Creative Skills': ['Graphic Design', 'Digital Photography', 'Writing'],
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  useEffect(() => {
    setTheme(darkMode ? 'dark' : 'light');
  }, [darkMode, setTheme]);

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
    setSelectedSubCategory('');
  };

  const handleCategorySelect = (categoryId: number) => {
    const selectedCategory = pathwayCategories.find(
      (category) => category.id === categoryId
    );
    if (selectedCategory) {
      setCategory(selectedCategory.name);
      setSelectedSubCategory('');
    }
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleNavToggle = () => {
    setNavOpen(!navOpen);
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
        <link rel="apple-touch-icon" href="/favicon-180x180.ico" sizes="180x180" type="image/x-icon" />
      </Head>
      <body>
        <Header
          navOpen={navOpen}
          handleNavToggle={handleNavToggle}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <main>
          <PathwayFilter
            filter={filter}
            handleFilterChange={handleFilterChange}
            category={category}
            handleCategoryChange={handleCategoryChange}
            subCategories={subCategories[category] || []}
            selectedSubCategory={selectedSubCategory}
            handleSubCategorySelect={handleSubCategorySelect}
          />
          <PathwayCategories
            pathwayCategories={pathwayCategories}
            handleCategorySelect={handleCategorySelect}
            selectedCategory={category}
          />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}