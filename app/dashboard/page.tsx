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
  const [isCreatingPathway, setIsCreatingPathway] = useState(false);

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
    setCustomPathways([...customPathways, newPathway]);
    setNewPathwayName('');
    setNewPathwayDescription('');
    setNewPathwayModules([]);
    setIsCreatingPathway(false);
  };

  const handleAddModule = (module) => {
    setNewPathwayModules([...newPathwayModules, module]);
  };

  const handleRemoveModule = (moduleId) => {
    setNewPathwayModules(newPathwayModules.filter((module) => module.id !== moduleId));
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
      <button onClick={() => setIsCreatingPathway(true)}>Create Custom Pathway</button>
      {isCreatingPathway && (
        <div>
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
          <h3>Available Modules</h3>
          <ul>
            {availableModules.map((module) => (
              <li key={module.id}>
                <button onClick={() => handleAddModule(module)}>
                  Add {module.name}
                </button>
              </li>
            ))}
          </ul>
          <h3>Selected Modules</h3>
          <ul>
            {newPathwayModules.map((module) => (
              <li key={module.id}>
                {module.name}
                <button onClick={() => handleRemoveModule(module.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleCreatePathway}>Create Pathway</button>
        </div>
      )}
    </div>
  );
}