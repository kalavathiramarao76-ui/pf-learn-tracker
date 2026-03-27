use client;

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { localStorage } from '../utils/localStorage';

const Page = () => {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(() => localStorage.get('darkMode') || false);
  const [learningPath, setLearningPath] = useState(() => localStorage.get('learningPath') || []);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.set('darkMode', !darkMode);
  };

  const handleLearningPathUpdate = (newPath: string[]) => {
    setLearningPath(newPath);
    localStorage.set('learningPath', newPath);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center justify-between w-full mb-4">
          <label className="text-lg font-medium">Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleDarkModeToggle}
            className="ml-2"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full mb-4">
          <label className="text-lg font-medium">Learning Path</label>
          <input
            type="text"
            value={learningPath.join(', ')}
            onChange={(e) => handleLearningPathUpdate(e.target.value.split(', '))}
            className="w-full p-2 pl-10 text-lg border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;