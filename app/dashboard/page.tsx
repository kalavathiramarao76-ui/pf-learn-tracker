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
  const [recommendedPathways, setRecommendedPathways] = useState([]);
  const [customPathways, setCustomPathways] = useState([]);
  const [newPathwayName, setNewPathwayName] = useState('');
  const [newPathwayDescription, setNewPathwayDescription] = useState('');
  const [newPathwayModules, setNewPathwayModules] = useState([]);
  const [availableModules, setAvailableModules] = useState([]);

  useEffect(() => {
    if (!isLoading && pathways.length > 0) {
      setSelectedPathway(pathways[0].id);
      getRecommendedPathways();
      getAvailableModules();
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

  const getRecommendedPathways = () => {
    if (pathways.length > 0 && progress.length > 0) {
      const userInterests = progress.map((module) => module.category);
      const recommended = pathways.filter((pathway) => {
        const pathwayCategories = pathway.modules.map((module) => module.category);
        return pathwayCategories.some((category) => userInterests.includes(category));
      });
      setRecommendedPathways(recommended);
    }
  };

  const getAvailableModules = () => {
    if (pathways.length > 0) {
      const allModules = pathways.reduce((acc, pathway) => acc.concat(pathway.modules), []);
      setAvailableModules(allModules);
    }
  };

  const handleCreatePathway = () => {
    const newPathway = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPathwayName,
      description: newPathwayDescription,
      modules: newPathwayModules,
    };
    setCustomPathways((prevPathways) => [...prevPathways, newPathway]);
    setNewPathwayName('');
    setNewPathwayDescription('');
    setNewPathwayModules([]);
  };

  const handleAddModule = (moduleId) => {
    const module = availableModules.find((m) => m.id === moduleId);
    if (module) {
      setNewPathwayModules((prevModules) => [...prevModules, module]);
    }
  };

  const handleRemoveModule = (moduleId) => {
    setNewPathwayModules((prevModules) => prevModules.filter((m) => m.id !== moduleId));
  };

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
            {customPathways.map((pathway) => (
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
            {filteredPathways.length === 0 && customPathways.length === 0 && (
              <p>No pathways found.</p>
            )}
          </div>
        )}
        <h2 className="text-xl font-bold mt-4">Create Custom Pathway</h2>
        <input
          type="text"
          placeholder="Pathway name"
          value={newPathwayName}
          onChange={(e) => setNewPathwayName(e.target.value)}
          className="w-full p-2 rounded border border-gray-400 mb-2"
        />
        <input
          type="text"
          placeholder="Pathway description"
          value={newPathwayDescription}
          onChange={(e) => setNewPathwayDescription(e.target.value)}
          className="w-full p-2 rounded border border-gray-400 mb-2"
        />
        <h3 className="text-lg font-bold mb-2">Add Modules</h3>
        <ul>
          {availableModules.map((module) => (
            <li key={module.id}>
              <input
                type="checkbox"
                checked={newPathwayModules.includes(module)}
                onChange={() => {
                  if (newPathwayModules.includes(module)) {
                    handleRemoveModule(module.id);
                  } else {
                    handleAddModule(module.id);
                  }
                }}
              />
              <span className="ml-2">{module.name}</span>
            </li>
          ))}
        </ul>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreatePathway}
        >
          Create Pathway
        </button>
      </main>
    </div>
  );
}