'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs } from '../ui/tabs-animated';
import Image from 'next/image';
import Link from 'next/link';
const sectors = [
  {
    id: 'hpc-solutions',

    title: 'High-Performance Computing Solutions',
    description:
      "Optimize your organization's computational power with our tailored High-Performance Computing solutions, designed to handle complex workloads, accelerate research, and enhance productivity.",
    cta: 'Enhance Your Infrastructure',
    image: '/high-computing.svg',
    tab: 'Computing',
  },
  {
    id: 'network-solutions',

    title: 'Network Solutions',
    description:
      "Safeguard your organization's most critical assets with our end-to-end network security services. We provide comprehensive protection against emerging threats while ensuring reliable, secure connectivity.",
    cta: 'Protect Your Network',
    image: 'network.svg',
    tab: 'Network',
  },
  {
    id: 'data-centre-solutions',

    title: 'Data Center Solutions',
    description:
      'Maximize efficiency and scalability with our custom-built Data Center solutions, designed to manage large-scale data storage and optimize infrastructure for growth and security.',
    cta: 'Learn More',
    image: 'data-center.svg',
    tab: 'Data Center',
  },
  {
    id: 'security-solutions',

    title: 'Security Solutions',
    description:
      'Protect your organization with cutting-edge security solutions that address every layer of vulnerability, from physical to digital assets, ensuring your business remains resilient to threats.',
    cta: 'Secure Your Business',
    image: 'security.svg',
    tab: 'Security',
  },
  {
    id: 'unified-communication-solutions',

    title: 'Unified Communications',
    description:
      'Streamline communication across your enterprise with our Unified Communication solutions, enhancing collaboration, improving efficiency, and supporting remote workforces seamlessly.',
    cta: 'Improve Collaboration',
    image: '/communication.svg',
    tab: 'Communication',
  },
  {
    id: 'software-solutions',
    title: 'Software Solutions',
    description:
      'Empower your operations with tailored software solutions that enhance productivity, simplify workflows, and provide scalable platforms to meet your evolving business needs.',
    cta: 'Discover More',
    image: '/software.svg',
    tab: 'Software',
  },
  {
    id: 'it-product-consultancy',
    title: 'Consultancy Services',
    description:
      'Leverage our IT consultancy expertise to align your technology strategy with your business goals. We offer specialized guidance on implementing the right solutions for sustainable growth.',
    cta: 'Consult with Us',
    image: '/consulting.svg',
    tab: 'Consultancy',
  },
];

function Sectors() {
  const tabs: { title: string; value: string; content: React.ReactNode; tab: string }[] =
    sectors.map((sector, index) => ({
      title: sector.title,
      value: sector.title,
      tab: sector.tab,
      content: (
        <div className="w-full overflow-hidden relative h-[80svh] md:h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#e53259] to-[#7142fd] space-y-8 flex flex-col justify-center items-center">
          <div className="md:flex md:justify-between items-center md:gap-8 px-4 space-y-4 md:space-y-0">
            <div className="w-full ">
              <Image
                width={600}
                height={400}
                src={sector.image}
                alt={sector.title}
                className="w-full h-full object-cover "
              />
            </div>
            <div className="w-full flex flex-col justify-center h-fit space-y-4   ">
              <h2 className="text-2xl md:text-4xl font-bold">{sector.title}</h2>

              <p className="text-lg font-medium leading-relaxed">{sector.description}</p>
              <motion.div
                className="mt-6 w-fit"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Button
                  size={'lg'}
                  className="bg-primary hover:bg-primary/90 text-white font-bold rounded-md"
                >
                  <Link
                    href={`/services/${sector.id}`}
                    className="w-full h-full flex justify-center items-center"
                  >
                    {sector.cta}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      ),
    }));

  return (
    <div className="h-screen px-4  [perspective:1000px] relative flex space-y-8 flex-col max-w-7xl mx-auto w-full items-start justify-start mt-20 ">
      <div className="space-y-2 mx-auto">
        <h5 className="text-xl md:text-3xl font-bold text-center w-full">
          Area of <strong className="text-primary">Expertise</strong>
        </h5>
        <p className="text-gray-600 mb-12 max-w-5xl mx-auto text-center">
          A comprehensive look into our specialized skills, honed over years of experience. We
          leverage deep industry knowledge to deliver innovative solutions tailored to your needs.
        </p>
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
}

export default Sectors;
