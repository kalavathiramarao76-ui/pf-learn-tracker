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
      const pathwayProgress = pathway.modules.map((module) => module.progress);
      const pathwayLearningStyle = pathway.modules.map((module) => module.learningStyle);

      const interestScore = calculateInterestScore(userInterests, pathwayInterests);
      const progressScore = calculateProgressScore(userProgress, pathwayProgress);
      const learningStyleScore = calculateLearningStyleScore(userLearningStyle, pathwayLearningStyle);

      const overallScore = interestScore + progressScore + learningStyleScore;

      return overallScore > 0.5; // threshold for recommendation
    });

    return recommendedPathways;
  };

  const calculateInterestScore = (userInterests, pathwayInterests) => {
    const commonInterests = userInterests.filter((interest) => pathwayInterests.includes(interest));
    return commonInterests.length / userInterests.length;
  };

  const calculateProgressScore = (userProgress, pathwayProgress) => {
    const averageUserProgress = userProgress.reduce((a, b) => a + b, 0) / userProgress.length;
    const averagePathwayProgress = pathwayProgress.reduce((a, b) => a + b, 0) / pathwayProgress.length;
    return Math.abs(averageUserProgress - averagePathwayProgress) / 100;
  };

  const calculateLearningStyleScore = (userLearningStyle, pathwayLearningStyle) => {
    const commonLearningStyles = userLearningStyle.filter((style) => pathwayLearningStyle.includes(style));
    return commonLearningStyles.length / userLearningStyle.length;
  };

  return (
    <div>
      <SEO title="Personalized Learning Pathways" />
      <PathwayFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      <PathwaySort sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <PathwayList pathways={sortedAndFilteredPathways} handlePathwayClick={handlePathwayClick} />
      <CreatePathwayForm isCreatingPathway={isCreatingPathway} setIsCreatingPathway={setIsCreatingPathway} />
      <CertificateModal certificateModalOpen={certificateModalOpen} setCertificateModalOpen={setCertificateModalOpen} certificatePathway={certificatePathway} setCertificatePathway={setCertificatePathway} />
      <div>
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
      </div>
    </div>
  );
}