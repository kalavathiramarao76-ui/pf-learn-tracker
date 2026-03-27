use client;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathways } from '../hooks/usePathways';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LearningPathway } from '../types/LearningPathway';
import { PathwayCard } from '../components/PathwayCard';
import { ProgressTracker } from '../components/ProgressTracker';
import { Recommendations } from '../components/Recommendations';
import { DiscussionForum } from '../components/DiscussionForum';
import { CreatePathwayModal } from '../components/CreatePathwayModal';

export default function LearningPathPage() {
  const router = useRouter();
  const { pathways, addPathway, removePathway } = usePathways();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [selectedPathway, setSelectedPathway] = useState<LearningPathway | null>(null);
  const [isCreatePathwayModalOpen, setIsCreatePathwayModalOpen] = useState(false);

  useEffect(() => {
    const storedPathways = getLocalStorage('pathways');
    if (storedPathways) {
      addPathway(storedPathways);
    }
  }, []);

  const handleSelectPathway = (pathway: LearningPathway) => {
    setSelectedPathway(pathway);
  };

  const handleRemovePathway = (pathway: LearningPathway) => {
    removePathway(pathway);
    setLocalStorage('pathways', pathways);
  };

  const handleCreatePathway = (newPathway: LearningPathway) => {
    addPathway(newPathway);
    setLocalStorage('pathways', pathways);
    setIsCreatePathwayModalOpen(false);
  };

  const handleOpenCreatePathwayModal = () => {
    setIsCreatePathwayModalOpen(true);
  };

  const handleCloseCreatePathwayModal = () => {
    setIsCreatePathwayModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">Personalized Learning Pathways</h1>
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleOpenCreatePathwayModal}
        >
          Create New Pathway
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pathways.map((pathway) => (
          <PathwayCard
            key={pathway.id}
            pathway={pathway}
            onSelect={handleSelectPathway}
            onRemove={handleRemovePathway}
          />
        ))}
      </div>
      {selectedPathway && (
        <div className="mt-8">
          <ProgressTracker pathway={selectedPathway} />
          <Recommendations pathway={selectedPathway} />
          <DiscussionForum pathway={selectedPathway} />
        </div>
      )}
      {isCreatePathwayModalOpen && (
        <CreatePathwayModal
          onClose={handleCloseCreatePathwayModal}
          onCreatePathway={handleCreatePathway}
        />
      )}
    </div>
  );
}