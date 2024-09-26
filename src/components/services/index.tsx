'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const serviceCards = [
  {
    title: 'HPC Cloud Solutions',
    href: 'hpc-solutions',
    description:
      'Our HPC cloud solutions enable you to access a high-performance computing environment on-demand, providing you with flexibility, scalability, and cost savings.',
    icon: '/services/subservice.svg',
    link: 'Learn about HPC Cloud Solutions',
  },
  {
    title: 'Servers and Storage',
    href: 'data-centre-solutions',
    description:
      'Our servers and storage solutions provide reliable and secure access to your data, ensuring your business runs smoothly and efficiently.',
    icon: '/services/security.svg',
    link: 'Learn about Servers and Storage',
  },
  {
    title: 'Data Center Security',
    href: 'data-centre-solutions',
    description:
      'Our data center security solutions provide comprehensive protection against cyber threats, ensuring your business remains secure and operational.',
    icon: '/retail.svg',
    link: 'Learn about Data Center Security',
  },
];

const otherServices = [
  'HPC Cloud Solutions',
  'HPC Cluster Solutions',
  'GPU Computing Solutions',
  'Network Monitoring',
  'Server Management & Support',
  'Servers',
  'Storage Solution',
  'Data Center Security',
  'Network Security',
  'Operating System Deployment',
  'System Design and Architecture',
  'Data Center',
];

export default function ServicesSection() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 mt-[32rem] md:mt-32 px-4" id="services">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center  mb-2 text-gray-900">
          Our <strong className="text-primary">Services</strong>
        </h1>
        <p className="text-gray-600 mb-12 text-center max-w-5xl mx-auto">
          Explore the range of customized IT solutions offered by Access Data Systems, designed to
          enhance your digital infrastructure across various industries. From educational
          institutions to corporate environments, our expert services ensure reliable performance,
          comprehensive security, and confidence in your technology investments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map((service, index) => (
            <ServicesCard key={service.href} {...service} index={index} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Core Services by Access Data Systems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherServices.map((service, index) => (
                  <motion.div
                    key={service}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <CheckCircle className="text-primary" />
                    <span>{service}</span>
                  </motion.div>
                ))}
              </div>
              {/* <motion.div
                className="mt-6 w-fit"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Button className="bg-primary text-white hover:bg-primary/80">
                  <Link href="/services/web-app-pen-test" className="w-full h-full">
                    View All Services →
                  </Link>
                </Button>
              </motion.div> */}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ServicesCard(props: {
  title: string;
  description: string;
  icon: string;
  index?: number;
  link?: string;
  href: string;
}) {
  const index = props.index || 0;
  return (
    <motion.div
      key={props.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <motion.img
            src={props.icon}
            alt={props.title}
            className="w-16 h-16 mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <CardTitle className="text-xl font-semibold">{props.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow ">
          <p className="text-gray-600 mb-4">{props.description}</p>
          {props.link && (
            <Button variant="link" className="p-0">
              <Link href={`/services/${props.href}`} className="w-full h-full">
                {props.link} →
              </Link>
            </Button>
          )}{' '}
        </CardContent>
      </Card>
    </motion.div>
  );
}
