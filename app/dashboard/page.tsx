use client;

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

  const getRecommendedPathways = () => {
    if (pathways.length > 0 && progress.length > 0) {
      const userInterests = progress.map((module) => module.category);
      const recommended = pathways.filter((pathway) => {
        const pathwayCategories = pathway.modules.map((module) => module.category);
        return pathwayCategories.some((category) => userInterests.includes(category));
      });
      setRecommendedPathways(recommended);
    }
  };

  const getAvailableModules = () => {
    if (pathways.length > 0) {
      const allModules = pathways.reduce((acc, pathway) => acc.concat(pathway.modules), []);
      setAvailableModules(allModules);
    }
  };

  const getCompletedPathways = () => {
    if (pathways.length > 0 && progress.length > 0) {
      const completed = pathways.filter((pathway) => {
        const pathwayModules = pathway.modules.map((module) => module.id);
        const completedModules = progress.filter((module) => pathwayModules.includes(module.id));
        return completedModules.length === pathwayModules.length;
      });
      setCompletedPathways(completed);
    }
  };

  const handleCreatePathway = () => {
    const newPathway = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPathwayName,
      description: newPathwayDescription,
      modules: newPathwayModules,
    };
    // Add new pathway to the list of pathways
    // ...
  };

  const handleViewCertificate = (pathway) => {
    setCertificatePathway(pathway);
    setCertificateModalOpen(true);
  };

  const handleDownloadCertificate = () => {
    const certificateHtml = `
      <html>
        <body>
          <h1>Certificate of Completion</h1>
          <p>Congratulations on completing the ${certificatePathway.name} pathway!</p>
          <p>This certificate is awarded to you for your hard work and dedication.</p>
        </body>
      </html>
    `;
    const certificateBlob = new Blob([certificateHtml], { type: 'application/pdf' });
    const certificateUrl = URL.createObjectURL(certificateBlob);
    const a = document.createElement('a');
    a.href = certificateUrl;
    a.download = `${certificatePathway.name}-certificate.pdf`;
    a.click();
  };

  return (
    <div>
      <SEO title="Personalized Learning Pathways" />
      <h1>Personalized Learning Pathways</h1>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search pathways"
      />
      <ul>
        {filteredPathways.map((pathway) => (
          <li key={pathway.id}>
            <Link href={`/learning-path/${pathway.id}`}>
              <a>
                {pathway.name}
                {completedPathways.includes(pathway) && (
                  <button onClick={() => handleViewCertificate(pathway)}>View Certificate</button>
                )}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {certificateModalOpen && (
        <div>
          <h2>Certificate of Completion</h2>
          <p>Congratulations on completing the {certificatePathway.name} pathway!</p>
          <p>This certificate is awarded to you for your hard work and dedication.</p>
          <button onClick={handleDownloadCertificate}>Download Certificate</button>
          <button onClick={() => setCertificateModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}