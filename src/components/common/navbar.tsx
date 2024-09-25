'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Users, Briefcase, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { ServiceCategory, subServices } from '@/lib/data';

type NavLink = {
  name: string;
  href: string;
  icon?: React.ElementType;
  dropdown?: NavLink[] | ServiceCategory[];
};

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '#services', dropdown: subServices },
  {
    name: 'Company',
    href: '#company',
    dropdown: [
      { name: 'About Us', href: '/about', icon: Users },
      { name: 'Careers', href: '/career', icon: Briefcase },
      { name: 'Contact Us', href: '/#contact', icon: Phone },
    ],
  },
];

const ServiceDropdown: React.FC<{ isScrolled: boolean; onClose: () => void }> = ({
  isScrolled,
  onClose,
}) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className={`fixed inset-0 z-50 overflow-y-auto ${isScrolled ? 'bg-secondary' : 'bg-white'}`}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Our Services</h2>
        <button onClick={onClose} className="text-primary hover:text-purple-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-6 gap-x-8">
        {subServices.map((category, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-medium text-primary">{category.category}</h3>
            <ul className="space-y-2">
              {category.subServices.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    href={`/services/${category.href}`}
                    className="block text-sm text-black hover:text-primary"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const DropdownMenu: React.FC<{ items: NavLink[]; isScrolled: boolean }> = ({
  items,
  isScrolled,
}) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg  ${
      isScrolled ? 'bg-secondary' : 'bg-white'
    }`}
  >
    <div className="py-1">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="flex items-center px-4 py-2 text-sm hover:text-primary text-black"
        >
          {item.icon && <item.icon className="mr-2 h-4 w-4 text-primary" />}
          {item.name}
        </a>
      ))}
    </div>
  </motion.div>
);

const NavItem: React.FC<{ item: NavLink; isScrolled: boolean }> = ({ item, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <a
        href={item.href}
        className={cn(
          'flex items-center px-3 py-2 rounded-md text-sm font-medium',
          isScrolled ? 'text-primary hover:text-purple-600' : 'text-primary hover:text-purple-600',
          isOpen && 'text-purple-600',
          !isScrolled && isOpen && 'text-primary'
        )}
      >
        {item.name}
        {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
      </a>
      <AnimatePresence>
        {isOpen &&
          item.dropdown &&
          (item.name === 'Services' ? (
            <ServiceDropdown isScrolled={isScrolled} onClose={() => setIsOpen(false)} />
          ) : (
            <DropdownMenu items={item.dropdown as NavLink[]} isScrolled={isScrolled} />
          ))}
      </AnimatePresence>
    </div>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`fixed w-full z-30 transition-all duration-300 ${
        scrolled ? 'bg-secondary shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={'/'} className="block">
            <div className="flex items-center">
              <Image
                src={'/adslogoimage.svg'}
                alt="Access Data Systems Pvt Ltd Logo"
                width={100}
                height={100}
              />
            </div>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((item) => (
                <NavItem key={item.name} item={item} isScrolled={scrolled} />
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <Button className="font-bold">
              <Link href="/#contact" className="w-full h-full flex justify-center items-center">
                Contact Us
              </Link>
            </Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-primary/10`}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${mobileMenuOpen ? 'block  backdrop:blur-md' : 'hidden'}`}>
        <div
          className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${scrolled ? 'bg-secondary' : 'bg-black/10'}`}
        >
          {navLinks.map((item) => (
            <NavItem key={item.name} item={item} isScrolled={scrolled} />
          ))}
          <Button
            className={`w-full z-50 ${
              scrolled
                ? 'bg-primary hover:bg-primary/80 text-white'
                : 'bg-white hover:bg-white/80 text-primary'
            }`}
          >
            <Link href="/#contact" className="w-full h-full">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
