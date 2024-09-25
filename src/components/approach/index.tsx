'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Package } from 'lucide-react';

type TabContent = {
  ads: {
    title: string;
    description: string;
    icon: React.ElementType;
  };
  industryAverage: {
    title: string;
    description: string;
    icon: React.ElementType;
  };
};

const tabs = [
  { id: 'quality', label: 'Quality' },
  { id: 'innovation', label: 'Innovation' },
  { id: 'communication', label: 'Communication' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'aftercare', label: 'Aftercare' },
] as const;
const cardContent: Record<(typeof tabs)[number]['id'], TabContent> = {
  quality: {
    ads: {
      title: 'Tailored IT Solutions',
      description:
        'At Access Data Systems, every solution is customized to meet the specific needs of our clients, ensuring optimal performance and satisfaction.',
      icon: Globe,
    },
    industryAverage: {
      title: 'Generic IT Packages',
      description:
        "Many IT companies offer standardized solutions that may not fully address each client's specific infrastructure requirements.",
      icon: Package,
    },
  },
  innovation: {
    ads: {
      title: 'Innovative Technology Solutions',
      description:
        'We stay at the forefront of the IT industry by continuously adopting cutting-edge technologies, from cloud solutions to AI-driven IT management.',
      icon: Globe,
    },
    industryAverage: {
      title: 'Outdated IT Infrastructure',
      description:
        'Many competitors use older technologies that struggle to keep pace with the rapid evolution of modern IT needs.',
      icon: Package,
    },
  },
  communication: {
    ads: {
      title: 'Clear Communication and Support',
      description:
        'We prioritize timely and transparent communication, keeping clients informed at every step of the project.',
      icon: Globe,
    },
    industryAverage: {
      title: 'Limited Communication',
      description:
        'IT companies often provide vague or overly technical updates, leaving clients unsure about project status or solutions.',
      icon: Package,
    },
  },
  expertise: {
    ads: {
      title: 'Specialized IT Experts',
      description:
        'Our team is made up of specialists in key IT fields, ensuring top-notch expertise in every project we handle.',
      icon: Globe,
    },
    industryAverage: {
      title: 'Generalist IT Approach',
      description:
        'Many companies rely on general IT professionals, which can limit the depth and effectiveness of their solutions.',
      icon: Package,
    },
  },
  sustainability: {
    ads: {
      title: 'Sustainable IT Practices',
      description:
        'We implement long-term IT solutions that grow with your business, ensuring continuous efficiency and security.',
      icon: Globe,
    },
    industryAverage: {
      title: 'Temporary IT Fixes',
      description:
        'Some companies focus on short-term solutions, which may not stand up to future challenges or technological advances.',
      icon: Package,
    },
  },
  aftercare: {
    ads: {
      title: 'Ongoing IT Support',
      description:
        'We provide continuous post-implementation support to keep your systems up-to-date and running smoothly.',
      icon: Globe,
    },
    industryAverage: {
      title: 'Minimal Ongoing Support',
      description:
        'Many providers offer limited support once a solution is deployed, leaving clients to manage updates and maintenance on their own.',
      icon: Package,
    },
  },
};

export default function CuttingEdgeApproach() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('quality');

  return (
    <div className=" max-w-7xl mx-auto py-8 text-center md:text-left px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">
        <span className="text-primary">
          <strong>Cutting-Edge</strong>
        </span>{' '}
        Approach
      </h1>
      <p className="text-gray-600 mb-12 max-w-5xl mx-auto text-center">
        Experience unmatched security with our innovative approach, designed by a team of skilled
        professionals. Leveraging advanced techniques and cutting-edge technology, we provide
        comprehensive protection across networks, safeguarding data, voice, and video.
      </p>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 space-y-2">
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              className="w-full"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-center hover:bg-primary/5 md:text-left py-2 px-4 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary/20 text-primary font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            </motion.div>
          ))}
        </div>
        <div className="w-full md:w-3/4 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Access Data Systems</CardTitle>
                </CardHeader>
                <CardContent className="flex items-start space-x-4">
                  {React.createElement(cardContent[activeTab].ads.icon, {
                    className: 'hidden md:block w-8 h-8 text-primary',
                  })}
                  <div>
                    <h3 className="text-lg font-semibold">{cardContent[activeTab].ads.title}</h3>
                    <p className="text-gray-600">{cardContent[activeTab].ads.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-industry`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Industry Average</CardTitle>
                </CardHeader>
                <CardContent className="flex items-start space-x-4">
                  {React.createElement(cardContent[activeTab].industryAverage.icon, {
                    className: 'hidden md:block w-8 h-8 text-gray-400',
                  })}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {cardContent[activeTab].industryAverage.title}
                    </h3>
                    <p className="text-gray-600">
                      {cardContent[activeTab].industryAverage.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
