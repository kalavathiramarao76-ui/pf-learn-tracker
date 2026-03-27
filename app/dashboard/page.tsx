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
  const [completedPathways, setCompletedPathways] = useState([]);

  useEffect(() => {
    if (!isLoading && pathways.length > 0) {
      setSelectedPathway(pathways[0].id);
      getRecommendedPathways();
      getAvailableModules();
      getCompletedPathways();
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

  const getCompletedPathways = () => {
    if (pathways.length > 0 && progress.length > 0) {
      const completed = pathways.filter((pathway) => {
        const pathwayModules = pathway.modules.map((module) => module.id);
        const completedModules = progress.filter((module) => pathwayModules.includes(module.id));
        return completedModules.length === pathwayModules.length;
      });
      setCompletedPathways(completed);
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

  const handleMarkPathwayAsCompleted = (pathwayId) => {
    const pathway = pathways.find((p) => p.id === pathwayId);
    if (pathway) {
      const pathwayModules = pathway.modules.map((module) => module.id);
      const updatedProgress = progress.concat(pathwayModules.map((moduleId) => ({ id: moduleId, category: pathway.category })));
      setCompletedPathways((prevCompleted) => [...prevCompleted, pathway]);
    }
  };

  return (
    <div>
      <SEO title="Personalized Learning Pathways" />
      <h1>Personalized Learning Pathways</h1>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search pathways"
      />
      <ul>
        {filteredPathways.map((pathway) => (
          <li key={pathway.id}>
            <Link href={`/learning-path/${pathway.id}`}>
              {pathway.name}
            </Link>
            {completedPathways.includes(pathway) ? (
              <span> (Completed)</span>
            ) : (
              <button onClick={() => handleMarkPathwayAsCompleted(pathway.id)}>Mark as Completed</button>
            )}
          </li>
        ))}
      </ul>
      <h2>Recommended Pathways</h2>
      <ul>
        {recommendedPathways.map((pathway) => (
          <li key={pathway.id}>
            <Link href={`/learning-path/${pathway.id}`}>
              {pathway.name}
            </Link>
          </li>
        ))}
      </ul>
      <h2>Custom Pathways</h2>
      <ul>
        {customPathways.map((pathway) => (
          <li key={pathway.id}>
            <Link href={`/learning-path/${pathway.id}`}>
              {pathway.name}
            </Link>
          </li>
        ))}
      </ul>
      <h2>Create Custom Pathway</h2>
      <input
        type="text"
        value={newPathwayName}
        onChange={(e) => setNewPathwayName(e.target.value)}
        placeholder="Pathway name"
      />
      <input
        type="text"
        value={newPathwayDescription}
        onChange={(e) => setNewPathwayDescription(e.target.value)}
        placeholder="Pathway description"
      />
      <ul>
        {availableModules.map((module) => (
          <li key={module.id}>
            <input
              type="checkbox"
              checked={newPathwayModules.includes(module)}
              onChange={() => handleAddModule(module.id)}
            />
            {module.name}
          </li>
        ))}
      </ul>
      <button onClick={handleCreatePathway}>Create Pathway</button>
    </div>
  );
}