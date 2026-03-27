use client;

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ProgressTrackerData } from '../types';
import ProgressTrackerCard from '../components/ProgressTrackerCard';

const ProgressTrackerPage = () => {
  const pathname = usePathname();
  const [progressTrackerData, setProgressTrackerData] = useState<ProgressTrackerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('progressTrackerData');
    if (storedData) {
      setProgressTrackerData(JSON.parse(storedData));
      setLoading(false);
    } else {
      const initialData: ProgressTrackerData[] = [
        { id: 1, title: 'Learning Path 1', progress: 20 },
        { id: 2, title: 'Learning Path 2', progress: 50 },
        { id: 3, title: 'Learning Path 3', progress: 80 },
      ];
      setProgressTrackerData(initialData);
      localStorage.setItem('progressTrackerData', JSON.stringify(initialData));
      setLoading(false);
    }
  }, []);

  const handleUpdateProgress = (id: number, progress: number) => {
    const updatedData = progressTrackerData.map((item) => {
      if (item.id === id) {
        return { ...item, progress };
      }
      return item;
    });
    setProgressTrackerData(updatedData);
    localStorage.setItem('progressTrackerData', JSON.stringify(updatedData));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">Progress Tracker</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progressTrackerData.map((item) => (
            <ProgressTrackerCard
              key={item.id}
              title={item.title}
              progress={item.progress}
              onUpdateProgress={(progress) => handleUpdateProgress(item.id, progress)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressTrackerPage;