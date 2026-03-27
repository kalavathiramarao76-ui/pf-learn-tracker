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
import { CustomizePathwayModal } from '../components/CustomizePathwayModal';

export default function LearningPathPage() {
  const router = useRouter();
  const { pathways, addPathway, removePathway, updatePathway } = usePathways();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [selectedPathway, setSelectedPathway] = useState<LearningPathway | null>(null);
  const [isCreatePathwayModalOpen, setIsCreatePathwayModalOpen] = useState(false);
  const [isCustomizePathwayModalOpen, setIsCustomizePathwayModalOpen] = useState(false);
  const [customizingPathway, setCustomizingPathway] = useState<LearningPathway | null>(null);
  const [userPathways, setUserPathways] = useState<LearningPathway[]>([]);
  const [isManagingPathways, setIsManagingPathways] = useState(false);

  useEffect(() => {
    const storedPathways = getLocalStorage('pathways');
    if (storedPathways) {
      addPathway(storedPathways);
    }
    const storedUserPathways = getLocalStorage('userPathways');
    if (storedUserPathways) {
      setUserPathways(storedUserPathways);
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

  const handleCustomizePathway = (pathway: LearningPathway) => {
    setCustomizingPathway(pathway);
    setIsCustomizePathwayModalOpen(true);
  };

  const handleUpdatePathway = (updatedPathway: LearningPathway) => {
    updatePathway(updatedPathway);
    setLocalStorage('pathways', pathways);
    setIsCustomizePathwayModalOpen(false);
  };

  const handleOpenCreatePathwayModal = () => {
    setIsCreatePathwayModalOpen(true);
  };

  const handleCloseCreatePathwayModal = () => {
    setIsCreatePathwayModalOpen(false);
  };

  const handleCloseCustomizePathwayModal = () => {
    setIsCustomizePathwayModalOpen(false);
  };

  const handleCreateUserPathway = (newPathway: LearningPathway) => {
    setUserPathways([...userPathways, newPathway]);
    setLocalStorage('userPathways', [...userPathways, newPathway]);
  };

  const handleRemoveUserPathway = (pathway: LearningPathway) => {
    const filteredPathways = userPathways.filter((p) => p.id !== pathway.id);
    setUserPathways(filteredPathways);
    setLocalStorage('userPathways', filteredPathways);
  };

  const handleUpdateUserPathway = (updatedPathway: LearningPathway) => {
    const updatedPathways = userPathways.map((p) => (p.id === updatedPathway.id ? updatedPathway : p));
    setUserPathways(updatedPathways);
    setLocalStorage('userPathways', updatedPathways);
  };

  const handleManagePathways = () => {
    setIsManagingPathways(true);
  };

  const handleStopManagingPathways = () => {
    setIsManagingPathways(false);
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleManagePathways}
        >
          Manage Custom Pathways
        </button>
      </div>
      {isManagingPathways ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Custom Pathways</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPathways.map((pathway) => (
              <PathwayCard
                key={pathway.id}
                pathway={pathway}
                onSelect={handleSelectPathway}
                onRemove={() => handleRemoveUserPathway(pathway)}
                onCustomize={() => handleCustomizePathway(pathway)}
              />
            ))}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleStopManagingPathways}
          >
            Stop Managing Pathways
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Recommended Pathways</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pathways.map((pathway) => (
              <PathwayCard
                key={pathway.id}
                pathway={pathway}
                onSelect={handleSelectPathway}
                onRemove={handleRemovePathway}
                onCustomize={handleCustomizePathway}
              />
            ))}
          </div>
        </div>
      )}
      {selectedPathway && (
        <div>
          <ProgressTracker pathway={selectedPathway} />
          <Recommendations pathway={selectedPathway} />
          <DiscussionForum pathway={selectedPathway} />
        </div>
      )}
      {isCreatePathwayModalOpen && (
        <CreatePathwayModal
          onClose={handleCloseCreatePathwayModal}
          onCreate={(newPathway) => handleCreatePathway(newPathway)}
          onCreateUserPathway={(newPathway) => handleCreateUserPathway(newPathway)}
        />
      )}
      {isCustomizePathwayModalOpen && customizingPathway && (
        <CustomizePathwayModal
          onClose={handleCloseCustomizePathwayModal}
          pathway={customizingPathway}
          onUpdate={(updatedPathway) => handleUpdatePathway(updatedPathway)}
          onUpdateUserPathway={(updatedPathway) => handleUpdateUserPathway(updatedPathway)}
        />
      )}
    </div>
  );
}