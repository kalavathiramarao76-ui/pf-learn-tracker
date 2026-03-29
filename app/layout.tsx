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

  const handleSubCategoryDropdownToggle = () => {
    setIsSubCategoryDropdownOpen(!isSubCategoryDropdownOpen);
  };

  return (
    <div className="root-layout">
      <Head>
        <title>Personalized Learning Pathways</title>
      </Head>
      <NextSeo title="Personalized Learning Pathways" />
      <MemoizedHeader
        navOpen={navOpen}
        handleNavToggle={handleNavToggle}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className="main-content">
        <div className="pathway-filter-container">
          <MemoizedPathwayFilter
            filter={filter}
            handleFilterChange={handleFilterChange}
            category={category}
            handleCategoryChange={handleCategoryChange}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
          <div className="category-dropdown">
            <button
              className="category-dropdown-toggle"
              onClick={handleCategoryDropdownToggle}
            >
              {category || 'Select Category'}
            </button>
            {isCategoryDropdownOpen && (
              <ul className="category-dropdown-list">
                {pathwayCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      className="category-dropdown-item"
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selectedCategory && (
            <div className="sub-category-dropdown">
              <button
                className="sub-category-dropdown-toggle"
                onClick={handleSubCategoryDropdownToggle}
              >
                {selectedSubCategory || 'Select Sub-Category'}
              </button>
              {isSubCategoryDropdownOpen && (
                <ul className="sub-category-dropdown-list">
                  {subCategories[selectedCategory.name].map((subCategory) => (
                    <li key={subCategory}>
                      <button
                        className="sub-category-dropdown-item"
                        onClick={() => handleSubCategorySelect(subCategory)}
                      >
                        {subCategory}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="pathway-categories-container">
          <MemoizedPathwayCategories
            filter={filter}
            category={category}
            subCategory={selectedSubCategory}
          />
        </div>
        {children}
      </div>
      <MemoizedFooter />
    </div>
  );
}