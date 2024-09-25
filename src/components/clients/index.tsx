'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const clients = [
  { name: 'IIT Kanpur', logo: '/clients/iitk.jpg', color: '#FF6B6B' },
  {
    name: 'National Law University, Jodhpur',
    logo: '/clients/nluj.jpg',
    color: '#4ECDC4',
  },
  { name: 'IIT Jodhpur', logo: '/clients/iitj.jpg', color: '#45B7D1' },
  { name: 'Defense Ministry', logo: '/clients/dfm.jpg', color: '#F7B731' },
  { name: 'NITs', logo: '/clients/nits.jpg', color: '#5D78FF' },
  {
    name: 'Police University Jodhpur',
    logo: '/clients/pluj.jpg',
    color: '#FF8C69',
  },
  { name: 'IIT Bhilai', logo: '/clients/iitbhilae.jpg', color: '#FF6B6B' },
  { name: 'IIT Jammu', logo: '/clients/iitjamu.jpg', color: '#4ECDC4' },
  { name: 'NHPC', logo: '/clients/nhpc.jpg', color: '#45B7D1' },
  { name: 'IIITDM Jabalpur', logo: '/clients/iiitdm.jpg', color: '#F7B731' },
  { name: 'Delhi Technological University', logo: '/clients/dtu.jpg', color: '#5D78FF' },
  { name: 'GeM', logo: '/clients/gem.jpg', color: '#FF8C69' },
  { name: 'PFC', logo: '/clients/pfc.jpg', color: '#FF6B6B' },
  { name: 'BHEL', logo: '/clients/bhel.jpg', color: '#4ECDC4' },
  { name: 'NTPC', logo: '/clients/ntpc.jpg', color: '#45B7D1' },
  { name: 'Delhi University', logo: '/clients/du.jpg', color: '#F7B731' },
  { name: 'IIT Mandi', logo: '/clients/iitmandi.jpg', color: '#5D78FF' },
];

export default function ClientShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (autoplay) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [autoplay]);

  const nextClient = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
    setAutoplay(false);
  };

  const prevClient = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + clients.length) % clients.length);
    setAutoplay(false);
  };

  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Our Esteemed <strong className="text-primary">Clients</strong>
      </h2>
      <p className="text-gray-600 mb-12 text-center max-w-5xl mx-auto">
        We are proud to partner with leading institutions and organizations across various sectors.
        Our esteemed clients trust us to deliver innovative solutions tailored to their unique
        needs, ensuring excellence in performance and security.
      </p>
      <div className="bg-white max-w-7xl mx-auto rounded-md p-4 md:p-8 lg:p-12">
        <div className="relative ">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center mb-8"
                // style={{ backgroundColor: clients[currentIndex].color }}
              >
                <img
                  src={clients[currentIndex].logo}
                  alt={clients[currentIndex].name}
                  className="w-32 h-32 object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {clients[currentIndex].name}
              </h3>
              <p className="text-gray-600 text-center max-w-2xl">
                Proud partner of {clients[currentIndex].name}. Together, we're revolutionizing the
                IT landscape with cutting-edge hardware and software solutions.
              </p>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevClient}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
            aria-label="Previous client"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextClient}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
            aria-label="Next client"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {clients.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setAutoplay(false);
              }}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to client ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
