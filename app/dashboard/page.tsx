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

  const getFilteredSortedPathways = (pathways) => {
    if (filterBy === 'all') {
      return getSortedPathways(pathways);
    } else if (filterBy === 'recommended') {
      return getSortedPathways(pathways.filter((pathway) => recommendedPathways.includes(pathway)));
    } else if (filterBy === 'completed') {
      return getSortedPathways(pathways.filter((pathway) => completedPathways.includes(pathway)));
    }
  };

  const sortedPathways = getFilteredSortedPathways(filteredPathways);

  return (
    // existing JSX code
  );
}