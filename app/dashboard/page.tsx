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
  const [filterOptions, setFilterOptions] = useState([
    { label: 'All', value: 'all' },
    { label: 'Recommended', value: 'recommended' },
    { label: 'Completed', value: 'completed' },
  ]);
  const [sortOptions, setSortOptions] = useState([
    { label: 'Name', value: 'name' },
    { label: 'Description', value: 'description' },
    { label: 'Modules', value: 'modules' },
  ]);

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

  const getSortedPathways = (pathways) => {
    switch (sortBy) {
      case 'name':
        return pathways.sort((a, b) => sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
      case 'description':
        return pathways.sort((a, b) => sortOrder === 'asc' ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description));
      case 'modules':
        return pathways.sort((a, b) => sortOrder === 'asc' ? a.modules.length - b.modules.length : b.modules.length - a.modules.length);
      default:
        return pathways;
    }
  };

  const getFilteredPathways = (pathways) => {
    switch (filterBy) {
      case 'all':
        return pathways;
      case 'recommended':
        return pathways.filter((pathway) => recommendedPathways.includes(pathway.id));
      case 'completed':
        return pathways.filter((pathway) => completedPathways.includes(pathway.id));
      default:
        return pathways;
    }
  };

  const applyFiltersAndSorting = (pathways) => {
    const filtered = getFilteredPathways(pathways);
    const sorted = getSortedPathways(filtered);
    return sorted;
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div>
      <SEO title="Personalized Learning Pathways" />
      <h1>Personalized Learning Pathways</h1>
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search pathways"
      />
      <select value={filterBy} onChange={handleFilterChange}>
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select value={sortBy} onChange={handleSortChange}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select value={sortOrder} onChange={handleSortOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <ul>
        {applyFiltersAndSorting(filteredPathways).map((pathway) => (
          <li key={pathway.id}>
            <Link href={`/learning-path/${pathway.id}`}>
              {pathway.name}
            </Link>
            <ArrowRightIcon />
          </li>
        ))}
      </ul>
    </div>
  );
}