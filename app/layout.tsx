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

const MemoizedHeader = React.memo(Header);
const MemoizedFooter = React.memo(Footer);
const MemoizedPathwayFilter = React.memo(PathwayFilter);
const MemoizedPathwayCategories = React.memo(PathwayCategories);

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

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Personalized Learning Pathways</title>
        <meta name="description" content="Personalized Learning Pathways" />
      </Head>
      <NextSeo title="Personalized Learning Pathways" description="Personalized Learning Pathways" />
      <MemoizedHeader
        navOpen={navOpen}
        handleNavToggle={handleNavToggle}
        isCategoryDropdownOpen={isCategoryDropdownOpen}
        handleCategoryDropdownToggle={handleCategoryDropdownToggle}
        isSubCategoryDropdownOpen={isSubCategoryDropdownOpen}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        handleCategorySelect={handleCategorySelect}
        handleSubCategorySelect={handleSubCategorySelect}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        pathwayCategories={pathwayCategories}
        subCategories={subCategories}
      />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <MemoizedPathwayFilter
            filter={filter}
            handleFilterChange={handleFilterChange}
          />
          <MemoizedPathwayCategories
            category={category}
            handleCategoryChange={handleCategoryChange}
            pathwayCategories={pathwayCategories}
            subCategories={subCategories}
            selectedSubCategory={selectedSubCategory}
            handleSubCategorySelect={handleSubCategorySelect}
          />
          {children}
        </div>
      </main>
      <MemoizedFooter />
    </div>
  );
}