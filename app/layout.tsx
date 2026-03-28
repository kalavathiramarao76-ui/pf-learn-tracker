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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" type="image/png" />
        <meta name="theme-color" content="#000" />
      </Head>
      <body>
        <Header>
          <nav className={`nav ${navOpen ? 'nav-open' : ''}`}>
            <button className="nav-toggle" onClick={handleNavToggle}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className="nav-links">
              <li>
                <Link href="#">Home</Link>
              </li>
              <li>
                <Link href="#">Learning Pathways</Link>
              </li>
              <li>
                <Link href="#">Categories</Link>
                <ul className="nav-submenu">
                  {pathwayCategories.map((category) => (
                    <li key={category.id}>
                      <Link href="#" onClick={() => handleCategorySelect(category.id)}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link href="#">Search</Link>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search learning pathways"
                />
              </li>
            </ul>
          </nav>
        </Header>
        <main>
          <PathwayFilter filter={filter} onFilterChange={handleFilterChange} />
          <PathwayCategories
            categories={pathwayCategories}
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
          />
          {children}
        </main>
        <Footer />
      </body>
      <style jsx>
        {`
          .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background-color: #333;
            color: #fff;
          }

          .nav-toggle {
            display: none;
            cursor: pointer;
          }

          .nav-links {
            display: flex;
            justify-content: space-between;
            align-items: center;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .nav-links li {
            margin-right: 20px;
          }

          .nav-links a {
            color: #fff;
            text-decoration: none;
          }

          .nav-submenu {
            display: none;
            list-style: none;
            margin: 0;
            padding: 0;
            background-color: #333;
            position: absolute;
            top: 100%;
            left: 0;
          }

          .nav-links li:hover .nav-submenu {
            display: block;
          }

          .nav-submenu li {
            margin-right: 0;
          }

          .nav-submenu a {
            display: block;
            padding: 10px;
            color: #fff;
            text-decoration: none;
          }

          @media (max-width: 768px) {
            .nav-toggle {
              display: block;
            }

            .nav-links {
              display: none;
              flex-direction: column;
              align-items: flex-start;
              padding: 1rem;
              background-color: #333;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
            }

            .nav-links li {
              margin-right: 0;
            }

            .nav-open .nav-links {
              display: flex;
            }
          }
        `}
      </style>
    </html>
  );
}