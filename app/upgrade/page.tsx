use client;

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { localStorage } from '../utils/localStorage';

const UpgradePage = () => {
  const router = useRouter();
  const [plan, setPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        user.plan = plan;
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 mt-10 mb-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Upgrade to Unlock More Features
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Get the most out of Learn Tracker with our premium plans.
      </p>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button
          className={`${
            plan === 'monthly'
              ? 'bg-gray-900 text-gray-100'
              : 'bg-gray-100 text-gray-900'
          } py-2 px-4 rounded-md`}
          onClick={() => setPlan('monthly')}
        >
          Monthly
        </button>
        <button
          className={`${
            plan === 'yearly'
              ? 'bg-gray-900 text-gray-100'
              : 'bg-gray-100 text-gray-900'
          } py-2 px-4 rounded-md`}
          onClick={() => setPlan('yearly')}
        >
          Yearly
        </button>
      </div>
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          Features
        </h2>
        <ul>
          <li className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Customizable learning pathways
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Progress tracking
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Personalized recommendations
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Reminders and alerts
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Integrations with popular learning resources
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Mobile optimization
          </li>
        </ul>
      </div>
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          Pricing
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Monthly
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              $9.99/month
            </p>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Yearly
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              $99.99/year
            </p>
          </div>
        </div>
      </div>
      <button
        className="bg-gray-900 text-gray-100 py-2 px-4 rounded-md"
        onClick={handleUpgrade}
        disabled={loading}
      >
        {loading ? 'Upgrading...' : 'Upgrade Now'}
      </button>
    </div>
  );
};

export default UpgradePage;