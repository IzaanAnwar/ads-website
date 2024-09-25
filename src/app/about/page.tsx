'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className=" mx-auto max-w-7xl py-20 px-4">
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
        <motion.div
          className="w-full lg:w-1/2"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold mb-6">About Access Data Systems Pvt. Ltd.</h1>
          <p className="mb-4">
            Access Data Systems Pvt Ltd, founded in 2014, is a leading company in the IT industry.
            Started by a group of young and dynamic entrepreneurial IT professionals, we have a
            vision to make a mark in Information Technology.
          </p>
          <p className="mb-4">
            Our strong technical team background enables us to implement and maintain Converged
            Networks with end-to-end solutions for Data, Voice and Video, LAN and WAN Access
            Products, Wireless Solutions, HPC, DPU-GPU, VDI, Wi-Fi, WI Mesh, and turnkey projects
            with cutting-edge technologies.
          </p>
          <p>
            We pride ourselves on making complex projects simpler and easily deployable, offering
            our clients expert advice for the best experience.
          </p>
        </motion.div>
        <motion.div
          className="w-full lg:w-1/2"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Image
            src={'/about.svg'}
            alt="About Access Data Systems Pvt. Ltd."
            width={600}
            height={600}
          />
        </motion.div>
      </div>

      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <AnimatedStat end={5} label="Our Branches" />
        <AnimatedStat end={500} label="Projects Done" />
        <AnimatedStat end={400} label="Happy Users" />
      </motion.div>

      <motion.div className="text-center" initial="hidden" animate="visible" variants={fadeIn}>
        <h2 className="text-3xl font-semibold mb-4">Ready to Experience Our Expertise?</h2>
        <p className="text-xl mb-8">Let us help you transform your IT infrastructure.</p>
        <motion.div
          className="mx-auto w-fit"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Button
            size={'lg'}
            className="bg-primary hover:bg-primary/90 text-white font-bold rounded-md"
          >
            <Link href={`/#contact`} className="w-full h-full flex justify-center items-center">
              Contact Us Today
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function AnimatedStat({ end, label }: { end: number; label: string }) {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / 2000, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, controls, end]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={controls}>
      <Card>
        <CardContent className="p-6 text-center">
          <span className="text-4xl font-bold mb-2">{count}+</span>
          <p className="text-xl">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
