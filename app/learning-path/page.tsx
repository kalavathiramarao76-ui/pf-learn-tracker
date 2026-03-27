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
    const filteredPathways = userPathways.filter((userPathway) => userPathway.id !== pathway.id);
    setUserPathways(filteredPathways);
    setLocalStorage('userPathways', filteredPathways);
  };

  const handleAddModule = (module: string) => {
    setModules([...modules, module]);
    setLocalStorage('modules', [...modules, module]);
  };

  const handleRemoveModule = (module: string) => {
    const filteredModules = modules.filter((m) => m !== module);
    setModules(filteredModules);
    setLocalStorage('modules', filteredModules);
  };

  const handleSelectModule = (module: string) => {
    if (selectedModules.includes(module)) {
      const filteredModules = selectedModules.filter((m) => m !== module);
      setSelectedModules(filteredModules);
      setLocalStorage('selectedModules', filteredModules);
    } else {
      setSelectedModules([...selectedModules, module]);
      setLocalStorage('selectedModules', [...selectedModules, module]);
    }
  };

  const handleUpdatePathwayProgress = (pathwayId: string, progress: number) => {
    setPathwayProgress({ ...pathwayProgress, [pathwayId]: progress });
    setLocalStorage('pathwayProgress', { ...pathwayProgress, [pathwayId]: progress });
  };

  return (
    <div>
      <h1>Personalized Learning Pathways</h1>
      <button onClick={handleOpenCreatePathwayModal}>Create Pathway</button>
      {isCreatePathwayModalOpen && (
        <CreatePathwayModal
          onClose={handleCloseCreatePathwayModal}
          onCreatePathway={handleCreatePathway}
        />
      )}
      {isCustomizePathwayModalOpen && (
        <CustomizePathwayModal
          onClose={handleCloseCustomizePathwayModal}
          pathway={customizingPathway}
          onUpdatePathway={handleUpdatePathway}
        />
      )}
      <div>
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
      <div>
        {userPathways.map((pathway) => (
          <PathwayCard
            key={pathway.id}
            pathway={pathway}
            onSelect={handleSelectPathway}
            onRemove={handleRemoveUserPathway}
          />
        ))}
      </div>
      <button onClick={handleCreateUserPathway}>Create User Pathway</button>
      <div>
        <h2>Modules</h2>
        <ul>
          {modules.map((module) => (
            <li key={module}>
              <input
                type="checkbox"
                checked={selectedModules.includes(module)}
                onChange={() => handleSelectModule(module)}
              />
              {module}
              <button onClick={() => handleRemoveModule(module)}>Remove</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add new module"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddModule(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
      <div>
        <h2>Pathway Progress</h2>
        <ul>
          {Object.keys(pathwayProgress).map((pathwayId) => (
            <li key={pathwayId}>
              {pathwayId}: {pathwayProgress[pathwayId]}%
              <input
                type="range"
                min="0"
                max="100"
                value={pathwayProgress[pathwayId]}
                onChange={(e) => handleUpdatePathwayProgress(pathwayId, parseInt(e.target.value))}
              />
            </li>
          ))}
        </ul>
      </div>
      <ProgressTracker progress={pathwayProgress} />
      <Recommendations pathways={pathways} />
      <DiscussionForum pathways={pathways} />
    </div>
  );
}