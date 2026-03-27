use client;

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { RecommendationsData } from '../types/recommendations';
import RecommendationCard from '../components/RecommendationCard';
import Layout from '../layout';

const RecommendationsPage = () => {
  const pathname = usePathname();
  const [recommendations, setRecommendations] = useState<RecommendationsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRecommendations = localStorage.getItem('recommendations');
    if (storedRecommendations) {
      setRecommendations(JSON.parse(storedRecommendations));
      setLoading(false);
    } else {
      // Generate default recommendations
      const defaultRecommendations: RecommendationsData[] = [
        { id: 1, title: 'Introduction to Python', description: 'Learn the basics of Python programming', category: 'Programming' },
        { id: 2, title: 'Data Science with Python', description: 'Learn how to apply Python to data science tasks', category: 'Data Science' },
        { id: 3, title: 'Web Development with React', description: 'Learn how to build web applications with React', category: 'Web Development' },
      ];
      setRecommendations(defaultRecommendations);
      localStorage.setItem('recommendations', JSON.stringify(defaultRecommendations));
      setLoading(false);
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <h1 className="text-3xl font-bold mb-4">Personalized Recommendations</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecommendationsPage;