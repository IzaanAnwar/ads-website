'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Search, Bug, Lock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServicesCard } from '@/components/services';
import { subServices } from '@/lib/data';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function SubServicesPage({ params }: { params: { serviceId: string } }) {
  const { serviceId } = params;
  const service = subServices.find((s) => s.href === serviceId);
  return (
    <div className="bg-gray-100">
      <section className="relative h-[90svh] flex items-center justify-center">
        <Image
          src="https://img.freepik.com/free-photo/cyber-security-concept-digital-art_23-2151637778.jpg?t=st=1726739066~exp=1726742666~hmac=77d6dbfa1b78655bbc61805efa4b402f7d6bec646336bc4a7c66018b089dd13e&w=1060"
          alt="Web Application Security"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 text-center text-white">
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4" {...fadeIn}>
            {service?.category}
          </motion.h1>
          <motion.p className="text-lg mb-8 max-w-5xl" {...fadeIn}>
            {service?.desc}
          </motion.p>

          <motion.div
            {...fadeIn}
            className="mx-auto w-fit "
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Button
              size="lg"
              className="px-8 py-2 rounded-md  text-white font-bold transition duration-200 hover:bg-primary/10  border-2 border-transparent hover:border-primary "
            >
              Contact us
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-3xl font-bold text-center mb-12" {...fadeIn}>
            Our Web Application Penetration Testing Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service?.subServices.map((subser, index) => (
              <ServicesCard
                href={subser.title}
                title={subser.title}
                description={subser.description}
                icon={'/services/subservice.svg'}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-primary">
          <motion.h2 className="text-3xl font-bold mb-4" {...fadeIn}>
            Ready to Secure Your Web Applications?
          </motion.h2>
          <motion.p className="text-xl mb-8" {...fadeIn}>
            Let our experts help you identify and address vulnerabilities before they can be
            exploited.
          </motion.p>
          <motion.div
            {...fadeIn}
            className="mx-auto w-fit "
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link
              href="/#contact"
              className="bg-primary text-white hover:bg-rose-400 font-bold py-3 px-6 rounded-md inline-flex items-center transition duration-300"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
