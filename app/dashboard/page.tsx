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
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [certificatePathway, setCertificatePathway] = useState(null);
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const sortedPathways = filteredPathways.sort((a, b) => {
    if (sortBy === 'name') {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else if (sortBy === 'description') {
      if (sortOrder === 'asc') {
        return a.description.localeCompare(b.description);
      } else {
        return b.description.localeCompare(a.description);
      }
    } else if (sortBy === 'modules') {
      if (sortOrder === 'asc') {
        return a.modules.length - b.modules.length;
      } else {
        return b.modules.length - a.modules.length;
      }
    }
    return 0;
  });

  const filteredSortedPathways = sortedPathways.filter((pathway) => {
    if (filterBy === 'all') {
      return true;
    } else if (filterBy === 'recommended') {
      return recommendedPathways.includes(pathway);
    } else if (filterBy === 'completed') {
      return completedPathways.includes(pathway);
    }
    return false;
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

  const handleFilterChange = (filter) => {
    setFilterBy(filter);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div>
      <SEO title="Personalized Learning Pathways" />
      <h1>Personalized Learning Pathways</h1>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search pathways..."
      />
      <select value={filterBy} onChange={(e) => handleFilterChange(e.target.value)}>
        <option value="all">All</option>
        <option value="recommended">Recommended</option>
        <option value="completed">Completed</option>
      </select>
      <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
        <option value="name">Name</option>
        <option value="description">Description</option>
        <option value="modules">Number of Modules</option>
      </select>
      <select value={sortOrder} onChange={(e) => handleSortOrderChange(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <ul>
        {filteredSortedPathways.map((pathway) => (
          <li key={pathway.id}>
            <Link href={`/learning-path/${pathway.id}`}>
              {pathway.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}