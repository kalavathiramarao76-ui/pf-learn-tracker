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
    return (filterBy === 'all' || pathway.category === filterBy) && (pathwayName.includes(search) || pathwayDescription.includes(search));
  });

  const getSortedPathways = (pathways) => {
    if (sortBy === 'name') {
      return pathways.sort((a, b) => sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    } else if (sortBy === 'description') {
      return pathways.sort((a, b) => sortOrder === 'asc' ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description));
    } else if (sortBy === 'modules') {
      return pathways.sort((a, b) => sortOrder === 'asc' ? a.modules.length - b.modules.length : b.modules.length - a.modules.length);
    } else {
      return pathways;
    }
  };

  const sortedAndFilteredPathways = getSortedPathways(filteredPathways);

  const getRecommendedPathways = (progress, pathways) => {
    const userInterests = progress.map((item) => item.category);
    const userProgress = progress.map((item) => item.progress);
    const userLearningStyle = progress.map((item) => item.learningStyle);

    const recommendedPathways = pathways.filter((pathway) => {
      const pathwayCategory = pathway.category;
      const pathwayModules = pathway.modules;
      const pathwayLearningStyle = pathway.learningStyle;

      const interestScore = userInterests.includes(pathwayCategory) ? 1 : 0;
      const progressScore = userProgress.includes(pathwayCategory) ? 1 : 0;
      const learningStyleScore = userLearningStyle.includes(pathwayLearningStyle) ? 1 : 0;

      const score = interestScore + progressScore + learningStyleScore;

      return score >= 2;
    });

    return recommendedPathways;
  };

  const getAdvancedRecommendedPathways = (progress, pathways) => {
    const userInterests = progress.map((item) => item.category);
    const userProgress = progress.map((item) => item.progress);
    const userLearningStyle = progress.map((item) => item.learningStyle);

    const recommendedPathways = pathways.map((pathway) => {
      const pathwayCategory = pathway.category;
      const pathwayModules = pathway.modules;
      const pathwayLearningStyle = pathway.learningStyle;

      const interestScore = userInterests.includes(pathwayCategory) ? 1 : 0;
      const progressScore = userProgress.includes(pathwayCategory) ? 1 : 0;
      const learningStyleScore = userLearningStyle.includes(pathwayLearningStyle) ? 1 : 0;

      const score = interestScore + progressScore + learningStyleScore;

      return { ...pathway, score };
    });

    return recommendedPathways.sort((a, b) => b.score - a.score).slice(0, 5);
  };

  return (
    <div>
      <SEO title="Personalized Learning Pathways" />
      <PathwayFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      <PathwaySort sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <PathwayList pathways={sortedAndFilteredPathways} handlePathwayClick={handlePathwayClick} />
      <CreatePathwayForm isCreatingPathway={isCreatingPathway} setIsCreatingPathway={setIsCreatingPathway} />
      <CertificateModal certificateModalOpen={certificateModalOpen} setCertificateModalOpen={setCertificateModalOpen} certificatePathway={certificatePathway} />
      <div>
        <h2>Recommended Pathways</h2>
        <PathwayList pathways={getAdvancedRecommendedPathways(progress, pathways)} handlePathwayClick={handlePathwayClick} />
      </div>
    </div>
  );
}