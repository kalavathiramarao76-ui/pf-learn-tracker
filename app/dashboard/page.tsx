import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathways, useProgress } from '../hooks';
import Link from 'next/link';
import { ArrowRightIcon } from '../icons';
import { SEO } from '../components/SEO';
import PathwayList from './PathwayList';
import PathwayFilter from './PathwayFilter';
import PathwaySort from './PathwaySort';
import CreatePathwayForm from './CreatePathwayForm';
import CertificateModal from './CertificateModal';

export default function DashboardPage() {
  const router = useRouter();
  const { pathways, isLoading } = usePathways();
  const { progress, isProgressLoading } = useProgress();

  const [selectedPathway, setSelectedPathway] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isCreatingPathway, setIsCreatingPathway] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [certificatePathway, setCertificatePathway] = useState(null);
  const [recommendedPathways, setRecommendedPathways] = useState([]);

  useEffect(() => {
    if (!isLoading && pathways.length > 0) {
      setSelectedPathway(pathways[0].id);
    }
  }, [pathways, isLoading]);

  useEffect(() => {
    if (progress && pathways) {
      const recommendedPathways = getRecommendedPathways(progress, pathways);
      setRecommendedPathways(recommendedPathways);
    }
  }, [progress, pathways]);

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
    if (sortBy === 'name') {
      return pathways.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'description') {
      return pathways.sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortBy === 'modules') {
      return pathways.sort((a, b) => a.modules.length - b.modules.length);
    } else {
      return pathways;
    }
  };

  const sortedAndFilteredPathways = getSortedPathways(filteredPathways);

  const getRecommendedPathways = (progress, pathways) => {
    const userInterests = progress.map((item) => item.category);
    const recommendedPathways = pathways.filter((pathway) => {
      const pathwayCategories = pathway.modules.map((module) => module.category);
      return pathwayCategories.some((category) => userInterests.includes(category));
    });
    return recommendedPathways;
  };

  return (
    <div>
      <SEO title="Personalized Learning Pathways" />
      <PathwayFilter
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <PathwaySort
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <h2>Recommended Pathways</h2>
      <PathwayList
        pathways={recommendedPathways}
        handlePathwayClick={handlePathwayClick}
        selectedPathway={selectedPathway}
      />
      <h2>All Pathways</h2>
      <PathwayList
        pathways={sortedAndFilteredPathways}
        handlePathwayClick={handlePathwayClick}
        selectedPathway={selectedPathway}
      />
      <CreatePathwayForm
        isCreatingPathway={isCreatingPathway}
        setIsCreatingPathway={setIsCreatingPathway}
      />
      <CertificateModal
        certificateModalOpen={certificateModalOpen}
        setCertificateModalOpen={setCertificateModalOpen}
        certificatePathway={certificatePathway}
        setCertificatePathway={setCertificatePathway}
      />
    </div>
  );
}