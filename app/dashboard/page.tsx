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
      const pathwayInterests = pathway.modules.map((module) => module.category);
      const pathwayDifficulty = pathway.modules.map((module) => module.difficulty);
      const pathwayLearningStyle = pathway.modules.map((module) => module.learningStyle);

      const interestScore = calculateInterestScore(userInterests, pathwayInterests);
      const progressScore = calculateProgressScore(userProgress, pathwayDifficulty);
      const learningStyleScore = calculateLearningStyleScore(userLearningStyle, pathwayLearningStyle);

      const overallScore = interestScore + progressScore + learningStyleScore;

      return overallScore > 0.5;
    });

    return recommendedPathways;
  };

  const calculateInterestScore = (userInterests, pathwayInterests) => {
    const commonInterests = userInterests.filter((interest) => pathwayInterests.includes(interest));
    return commonInterests.length / userInterests.length;
  };

  const calculateProgressScore = (userProgress, pathwayDifficulty) => {
    const averageUserProgress = userProgress.reduce((a, b) => a + b, 0) / userProgress.length;
    const averagePathwayDifficulty = pathwayDifficulty.reduce((a, b) => a + b, 0) / pathwayDifficulty.length;
    return Math.abs(averageUserProgress - averagePathwayDifficulty) / 10;
  };

  const calculateLearningStyleScore = (userLearningStyle, pathwayLearningStyle) => {
    const commonLearningStyle = userLearningStyle.filter((style) => pathwayLearningStyle.includes(style));
    return commonLearningStyle.length / userLearningStyle.length;
  };

  return (
    <div>
      <SEO title="Personalized Learning Pathways" />
      <PathwayList
        pathways={sortedAndFilteredPathways}
        handlePathwayClick={handlePathwayClick}
        selectedPathway={selectedPathway}
      />
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
      <h2>Recommended Pathways</h2>
      <PathwayList
        pathways={recommendedPathways}
        handlePathwayClick={handlePathwayClick}
        selectedPathway={selectedPathway}
      />
    </div>
  );
}