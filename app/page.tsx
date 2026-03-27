use client;

import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import { AiOutlineArrowRight } from 'react-icons/ai';

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', darkMode ? 'false' : 'true');
  };

  return (
    <Layout>
      <section className="h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
          <h1 className="text-3xl font-bold mb-4">Personalized Learning Pathways</h1>
          <p className="text-lg mb-8">
            Learn Tracker is a personalized learning platform that helps students and professionals set and achieve their learning goals.
          </p>
          <Link href="/dashboard">
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              Get Started <AiOutlineArrowRight className="inline-block" />
            </button>
          </Link>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200">
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">Customizable Learning Pathways</h3>
              <p>Create a tailored learning plan that suits your needs and goals.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">Progress Tracking</h3>
              <p>Track your progress and stay motivated with our intuitive tracking system.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">Personalized Recommendations</h3>
              <p>Get personalized recommendations for improvement and stay on track.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">Reminders and Alerts</h3>
              <p>Set reminders and receive alerts to stay on track and achieve your goals.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">Integrations with Popular Learning Resources</h3>
              <p>Integrate with popular learning resources and expand your learning possibilities.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">Mobile Optimization</h3>
              <p>Access Learn Tracker on-the-go with our mobile-optimized platform.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">Basic</h3>
              <p>$9.99/month</p>
              <ul>
                <li>Customizable learning pathways</li>
                <li>Progress tracking</li>
              </ul>
              <Link href="/upgrade">
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                  Upgrade
                </button>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">Premium</h3>
              <p>$19.99/month</p>
              <ul>
                <li>Customizable learning pathways</li>
                <li>Progress tracking</li>
                <li>Personalized recommendations</li>
                <li>Reminders and alerts</li>
              </ul>
              <Link href="/upgrade">
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                  Upgrade
                </button>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">Enterprise</h3>
              <p>Custom pricing</p>
              <ul>
                <li>Customizable learning pathways</li>
                <li>Progress tracking</li>
                <li>Personalized recommendations</li>
                <li>Reminders and alerts</li>
                <li>Integrations with popular learning resources</li>
              </ul>
              <Link href="/contact">
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200">
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">What is Learn Tracker?</h3>
              <p>Learn Tracker is a personalized learning platform that helps students and professionals set and achieve their learning goals.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">How does it work?</h3>
              <p>Learn Tracker provides a customizable learning path, tracks progress, and offers recommendations for improvement.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">Is it mobile-friendly?</h3>
              <p>Yes, Learn Tracker is optimized for mobile devices, allowing you to access it on-the-go.</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
          <p>&copy; 2024 Learn Tracker. All rights reserved.</p>
        </div>
      </footer>
    </Layout>
  );
}