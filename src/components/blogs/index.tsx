'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const blogPosts = [
  {
    id: 1,
    title: 'Essential Cybersecurity Practices',
    content: 'Protect your business with these crucial cybersecurity measures...',
    image: 'https://picsum.photos/seed/picsum/400/200',
  },
  {
    id: 2,
    title: 'AI in Cyber Threats',
    content: 'Artificial Intelligence is changing the landscape of cyber threats...',
    image: 'https://picsum.photos/seed/some/400/200',
  },
];

const changingContent = [
  {
    id: 1,
    title: 'Latest Threat: Ransomware',
    content: 'New ransomware strain targets small businesses...',
    image: 'https://picsum.photos/seed/lorem/400/200',
  },
  {
    id: 2,
    title: 'Cybersecurity Tool Update',
    content: 'Our flagship security suite has been updated with new features...',
    image: 'https://picsum.photos/seed/yare/400/200',
  },
  {
    id: 3,
    title: 'Upcoming Webinar',
    content: 'Join us for a free webinar on cloud security best practices...',
    image: 'https://picsum.photos/seed/daze/400/200',
  },
];

export default function LatestBlogPosts() {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentContentIndex((prevIndex) => (prevIndex + 1) % changingContent.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="my-24">
      <div className="max-w-7xl mx-auto px-4 ">
        <h2 className="text-4xl font-bold mb-2  text-center ">
          Latest Insights in <strong className="text-primary">Cybersecurity</strong>
        </h2>
        <p className="text-gray-600 mb-12 max-w-5xl mx-auto text-center">
          Stay ahead of the curve with our groundbreaking 8-step approach to cybersecurity. Our
          advanced techniques and innovative solutions offer unmatched protection against emerging
          threats and vulnerabilities. As the landscape evolves, we're revolutionizing security
          measures to help you safeguard your assets like never before.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col shadow-lg   ">
                <CardContent className=" flex-grow p-6 space-y-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold  text-primary">{post.title}</h3>
                    <p className="text-gray-600 ">{post.content}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-6">
                  <motion.div
                    key={post.id}
                    className="w-fit"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Button
                      variant="outline"
                      className="text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                    >
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full flex flex-col shadow-lg bg-primary text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentContentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className=""
                >
                  <CardContent className="p-6 flex-grow space-y-6">
                    <Image
                      src={changingContent[currentContentIndex].image}
                      alt={changingContent[currentContentIndex].title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold mb-3">
                        {changingContent[currentContentIndex].title}
                      </h3>
                      <p className="mb-4">{changingContent[currentContentIndex].content}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <motion.div
                      key={changingContent[currentContentIndex].id}
                      className="w-fit"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <Button
                        variant="secondary"
                        className="bg-white text-primary hover:bg-gray-100 transition-colors duration-200"
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </CardFooter>
                </motion.div>
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
