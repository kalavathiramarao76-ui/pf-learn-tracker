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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSubCategoryDropdownOpen, setIsSubCategoryDropdownOpen] = useState(false);

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
      setSelectedCategory(selectedCategory);
      setSelectedSubCategory('');
      setIsCategoryDropdownOpen(false);
    }
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setIsSubCategoryDropdownOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  const handleCategoryDropdownToggle = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const handleSubCategoryDropdownToggle = () => {
    setIsSubCategoryDropdownOpen(!isSubCategoryDropdownOpen);
  };

  return (
    <html lang="en" className={theme}>
      <Head>
        <title>Learn Tracker</title>
      </Head>
      <body>
        <Header
          navOpen={navOpen}
          onNavToggle={handleNavToggle}
          onCategoryDropdownToggle={handleCategoryDropdownToggle}
          onSubCategoryDropdownToggle={handleSubCategoryDropdownToggle}
          isCategoryDropdownOpen={isCategoryDropdownOpen}
          isSubCategoryDropdownOpen={isSubCategoryDropdownOpen}
          pathwayCategories={pathwayCategories}
          onCategorySelect={handleCategorySelect}
          onSubCategorySelect={handleSubCategorySelect}
          subCategories={subCategories}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />
        <main className="flex flex-col items-center justify-center min-h-screen">
          <PathwayFilter
            filter={filter}
            onFilterChange={handleFilterChange}
            category={category}
            onCategoryChange={handleCategoryChange}
          />
          <PathwayCategories
            pathwayCategories={pathwayCategories}
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
            subCategories={subCategories}
            onSubCategorySelect={handleSubCategorySelect}
            selectedSubCategory={selectedSubCategory}
          />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}