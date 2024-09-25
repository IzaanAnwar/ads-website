'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5 " />
      <div className="flex flex-col lg:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full h-[70svh] lg:h-screen relative "
        >
          <div className="relative w-full h-full overflow-hidden ">
            <Image
              src="/hero-bg.svg"
              alt="IT Innovation"
              layout="fill"
              className="transition-transform object-contain lg:object-cover duration-300 hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-primary/40 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 p-8 lg:p-16  text-center  lg:text-left"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl  font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Driving IT Innovation for{' '}
            <span className="relative">
              <span className="relative z-10">Sustainable Growth</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-primary/70"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
            </span>
          </h1>
          <p className="text-lg   text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            Access Data Systems Private Limited: Empowering businesses with secure, scalable, and
            innovative IT solutions for a prosperous digital future.
          </p>
          <div className="relative mb-12 z-50 ">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Button size="lg" className="px-8 py-3 font-bold" asChild>
                <Link href="#contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
          <div className="grid grid-cols-3 gap-6 w-full md:w-fit mx-auto lg:mx-0">
            <FeatureIcon icon={SecurityCheckIcon} text="Advanced Security" />
            <FeatureIcon icon={SquareLockCheck02Icon} text="Data Protection" />
            <FeatureIcon icon={ComputerProtectionIcon} text="IT Infrastructure" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureIcon = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
  >
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
      <Icon size={20} className="text-primary dark:text-primary" />
    </div>
    <span className="text-sm text-gray-600 dark:text-gray-400 text-center">{text}</span>
  </motion.div>
);

const SecurityCheckIcon = (props: React.SVGProps<SVGSVGElement> & { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 13C9 13 10 13 11 15C11 15 14.1765 10 17 9" />
    <path d="M21 11.1833V8.28029C21 6.64029 21 5.82028 20.5959 5.28529C20.1918 4.75029 19.2781 4.49056 17.4507 3.9711C16.2022 3.6162 15.1016 3.18863 14.2223 2.79829C13.0234 2.2661 12.424 2 12 2C11.576 2 10.9766 2.2661 9.77771 2.79829C8.89839 3.18863 7.79784 3.61619 6.54933 3.9711C4.72193 4.49056 3.80822 4.75029 3.40411 5.28529C3 5.82028 3 6.64029 3 8.28029V11.1833C3 16.8085 8.06277 20.1835 10.594 21.5194C11.2011 21.8398 11.5046 22 12 22C12.4954 22 12.7989 21.8398 13.406 21.5194C15.9372 20.1835 21 16.8085 21 11.1833Z" />
  </svg>
);

const SquareLockCheck02Icon = (props: React.SVGProps<SVGSVGElement> & { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18.5002 11.4996C18.2252 10.4746 16.9752 8.99609 15.0752 9.09963C15.0752 9.09963 13.1434 8.99609 11.1909 8.99609C9.23839 8.99609 8.25019 9.02463 6.72519 9.09963C5.70019 9.09963 4.07519 9.67463 3.45019 11.4246C2.87446 13.1751 2.89974 16.7991 3.2502 18.6496C3.32529 19.5999 3.84822 20.9494 5.4002 21.6496C6.1502 22.0996 10.8502 21.9496 11.5002 21.9996" />
    <path d="M6.51635 8.19624C6.46629 5.82059 6.36616 3.94508 9.11967 2.39466C10.0458 2.01956 11.4226 1.69447 13.1248 2.49469C14.902 3.56998 15.1234 4.70796 15.2775 4.99537C15.7031 6.12068 15.4778 7.72111 15.5278 8.37129" />
    <path d="M15.6702 18.444C15.9702 18.588 16.3422 18.96 16.5222 19.26C16.5822 19.68 16.8822 18.06 18.3462 17.1M21.0002 18C21.0002 20.2091 19.2094 22 17.0002 22C14.7911 22 13.0002 20.2091 13.0002 18C13.0002 15.7909 14.7911 14 17.0002 14C19.2094 14 21.0002 15.7909 21.0002 18Z" />
  </svg>
);

const ComputerProtectionIcon = (props: React.SVGProps<SVGSVGElement> & { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 13C21.9221 14.8723 21.671 16.0203 20.8614 16.8284C19.6878 18 17.7989 18 14.021 18H10.014C6.23617 18 4.34725 18 3.17362 16.8284C2 15.6569 2 13.7712 2 10C2 6.22876 2 4.34315 3.17362 3.17157C4.34725 2 6.23617 2 10.014 2H11" />
    <path d="M12 18V22" />
    <path d="M8 22H16" />
    <path d="M11 15H13" />
    <path d="M22 5.5V3C20 3 18.5 2 18.5 2C18.5 2 17 3 15 3V5.5C15 9 18.5 10 18.5 10C18.5 10 22 9 22 5.5Z" />
  </svg>
);

export default HeroSection;
