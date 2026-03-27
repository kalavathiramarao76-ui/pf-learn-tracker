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
  const [modules, setModules] = useState<string[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [pathwayProgress, setPathwayProgress] = useState<{ [key: string]: number }>({});
  const [customPathways, setCustomPathways] = useState<LearningPathway[]>([]);

  useEffect(() => {
    const storedPathways = getLocalStorage('pathways');
    if (storedPathways) {
      addPathway(storedPathways);
    }
    const storedUserPathways = getLocalStorage('userPathways');
    if (storedUserPathways) {
      setUserPathways(storedUserPathways);
    }
    const storedModules = getLocalStorage('modules');
    if (storedModules) {
      setModules(storedModules);
    }
    const storedSelectedModules = getLocalStorage('selectedModules');
    if (storedSelectedModules) {
      setSelectedModules(storedSelectedModules);
    }
    const storedPathwayProgress = getLocalStorage('pathwayProgress');
    if (storedPathwayProgress) {
      setPathwayProgress(storedPathwayProgress);
    }
    const storedCustomPathways = getLocalStorage('customPathways');
    if (storedCustomPathways) {
      setCustomPathways(storedCustomPathways);
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
  };

  const handleCreateCustomPathway = (newPathway: LearningPathway) => {
    setCustomPathways([...customPathways, newPathway]);
    setLocalStorage('customPathways', customPathways);
  };

  const handleRemoveCustomPathway = (pathway: LearningPathway) => {
    setCustomPathways(customPathways.filter((customPathway) => customPathway.id !== pathway.id));
    setLocalStorage('customPathways', customPathways);
  };

  const handleUpdateCustomPathway = (updatedPathway: LearningPathway) => {
    setCustomPathways(customPathways.map((customPathway) => customPathway.id === updatedPathway.id ? updatedPathway : customPathway));
    setLocalStorage('customPathways', customPathways);
  };

  return (
    <div>
      {pathways.map((pathway) => (
        <PathwayCard key={pathway.id} pathway={pathway} onSelect={handleSelectPathway} onRemove={handleRemovePathway} />
      ))}
      {customPathways.map((pathway) => (
        <PathwayCard key={pathway.id} pathway={pathway} onSelect={handleSelectPathway} onRemove={handleRemoveCustomPathway} />
      ))}
      <button onClick={() => setIsCreatePathwayModalOpen(true)}>Create Pathway</button>
      <button onClick={() => setIsManagingPathways(true)}>Manage Custom Pathways</button>
      {isCreatePathwayModalOpen && (
        <CreatePathwayModal onClose={() => setIsCreatePathwayModalOpen(false)} onCreate={handleCreatePathway} />
      )}
      {isCustomizePathwayModalOpen && (
        <CustomizePathwayModal onClose={() => setIsCustomizePathwayModalOpen(false)} pathway={customizingPathway} onUpdate={handleUpdatePathway} />
      )}
      {isManagingPathways && (
        <div>
          <h2>Custom Pathways</h2>
          {customPathways.map((pathway) => (
            <div key={pathway.id}>
              <h3>{pathway.name}</h3>
              <button onClick={() => handleRemoveCustomPathway(pathway)}>Remove</button>
              <button onClick={() => handleUpdateCustomPathway(pathway)}>Update</button>
            </div>
          ))}
          <button onClick={() => handleCreateCustomPathway({ id: Math.random().toString(), name: 'New Custom Pathway', modules: [] })}>Create Custom Pathway</button>
        </div>
      )}
      {selectedPathway && (
        <div>
          <ProgressTracker pathway={selectedPathway} />
          <Recommendations pathway={selectedPathway} />
          <DiscussionForum pathway={selectedPathway} />
        </div>
      )}
    </div>
  );
}