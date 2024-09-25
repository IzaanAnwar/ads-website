'use client';

import { motion, Variants } from 'framer-motion';
import { Facebook, Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
const NewTwitterIcon = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.size || 24}
    height={props.size || 24}
    fill={'none'}
    {...props}
  >
    <path
      d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const socials = [
  { href: '#', icon: NewTwitterIcon },
  { href: 'https://www.facebook.com/adsystems2014', icon: Facebook },
  { href: 'https://www.linkedin.com/company/access-data-systems-pvt-ltd/', icon: Linkedin },
];

export default function Footer() {
  return (
    <motion.footer
      className="bg-primary text-rose-100 py-12 text-center md:text-left"
      initial="initial"
      animate="animate"
      variants={{
        animate: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <motion.div variants={fadeIn} className="col-span-1">
            <h2 className="text-lg font-bold mb-4 text-rose-200">About Access Data Systems</h2>
            <p className="mb-4 text-sm">
              Access Data Systems Pvt. Ltd. is considered one of the leading companies in the IT
              industry, started by a group of young and dynamic entrepreneurial IT professionals in
              2014 with a vision to make a mark in Information Technology.
            </p>
            <div className="flex space-x-4 mx-auto w-fit md:w-full">
              {socials.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-rose-300 hover:text-white transition-colors"
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h3 className=" font-semibold mb-4 text-rose-100">Contacts</h3>
            <p className="text-sm">+91 011-41051450</p>
            <p className="text-sm">+91 9871925813</p>
            <p className="text-sm">info@adsystems.in</p>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h3 className="font-semibold mb-4 text-rose-100">Registered Office</h3>
            <p className="text-sm ">307A, 3rd Floor, Govardhan House, 53‐54, Nehru Place,</p>
            <p className="text-sm ">New Delhi – 110019</p>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h3 className=" font-semibold mb-4 text-rose-200">Branch Offices</h3>
            <ul className="space-y-2">
              {[
                { location: 'Jodhpur, Rajasthan', email: 'sales@adsystems.in' },
                { location: 'Jaipur, Rajasthan', email: 'sales@adsystems.in' },
                { location: 'Ranchi, Jharkhand', email: 'sales_rnc@adsystems.in' },
              ].map(({ location, email }) => (
                <li key={location}>
                  <p className="text-sm">{location}</p>
                  <p className="text-sm">
                    (Sales & Services Please Mail -{' '}
                    <Link href={`mailto:${email}`} className="text-rose-300 hover:text-white">
                      {email}
                    </Link>
                    )
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeIn}>
            <h3 className="font-semibold mb-4 text-rose-200">Branch Offices</h3>
            <ul className="space-y-2">
              {[
                { location: 'Bhubaneswar, Odisha', email: 'sales_bbsr@adsystems.in' },
                { location: 'Kanpur, UP', email: 'sales_lko@adsystems.in' },
              ].map(({ location, email }) => (
                <li key={location}>
                  <p className="text-sm">{location}</p>
                  <p className="text-sm">
                    (Sales & Services Please Mail -{' '}
                    <Link href={`mailto:${email}`} className="text-rose-300 hover:text-white">
                      {email}
                    </Link>
                    )
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div variants={fadeIn} className="mt-8 pt-8 border-t border-rose-800 text-sm w-full">
          <div className="flex flex-wrap justify-between items-center">
            <p>&copy; 2024 Access Data Systems Pvt. Ltd. All rights reserved.</p>
            <div className="space-x-4 mt-4 md:mt-0">
              {[
                { href: '#privacy-policy', text: 'Privacy Policy' },
                { href: '#terms', text: 'Terms and Conditions' },
                { href: '#complaints', text: 'Complaints Policy' },
                { href: '#disclosure', text: 'Responsible Disclosure' },
              ].map(({ href, text }) => (
                <Link key={href} href={href} className="hover:text-rose-300 transition-colors">
                  {text}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
