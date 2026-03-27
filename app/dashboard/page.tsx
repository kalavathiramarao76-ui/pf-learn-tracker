use client;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathways, useProgress } from '../hooks';
import Link from 'next/link';
import { ArrowRightIcon } from '../icons';
import { SEO } from '../components/SEO';

export default function DashboardPage() {
  const router = useRouter();
  const { pathways, isLoading } = usePathways();
  const { progress, isProgressLoading } = useProgress();

  const [selectedPathway, setSelectedPathway] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isLoading && pathways.length > 0) {
      setSelectedPathway(pathways[0].id);
    }
  }, [pathways, isLoading]);

  const handlePathwayClick = (id) => {
    setSelectedPathway(id);
    router.push(`/learning-path/${id}`);
  };

  const filteredPathways = pathways.filter((pathway) => {
    const pathwayName = pathway.name.toLowerCase();
    const pathwayDescription = pathway.description.toLowerCase();
    const search = searchQuery.toLowerCase();
    return pathwayName.includes(search) || pathwayDescription.includes(search);
  });

  return (
    <div className="flex flex-col h-screen">
      <SEO title="Dashboard" description="Personalized learning pathways" />
      <header className="bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold">Learn Tracker</h1>
      </header>
      <main className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4">Your Learning Pathways</h2>
        <input
          type="search"
          placeholder="Search pathways"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded border border-gray-400 mb-4"
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredPathways.map((pathway) => (
              <div
                key={pathway.id}
                className={`bg-white p-4 rounded shadow ${
                  selectedPathway === pathway.id ? 'bg-gray-100' : ''
                }`}
                onClick={() => handlePathwayClick(pathway.id)}
              >
                <h3 className="text-lg font-bold">{pathway.name}</h3>
                <p className="text-gray-600">{pathway.description}</p>
              </div>
            ))}
            {filteredPathways.length === 0 && (
              <p>No pathways found matching your search query.</p>
            )}
          </div>
        )}
        {selectedPathway && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4">Your Progress</h2>
            {isProgressLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="bg-white p-4 rounded shadow">
                <p className="text-lg font-bold">
                  You have completed {progress.completed} out of {progress.total} modules
                </p>
                <progress
                  className="w-full h-4 rounded"
                  value={progress.completed}
                  max={progress.total}
                />
              </div>
            )}
          </div>
        )}
      </main>
      <footer className="bg-gray-900 text-white p-4">
        <p>&copy; 2024 Learn Tracker</p>
      </footer>
    </div>
  );
}