import { PageLoadingSkeleton } from '@/components/common/page-loading';
import HeroSection from '@/components/hero';
import dynamic from 'next/dynamic';

const ContactSection = dynamic(() => import('@/components/contact/index'), {
  ssr: false,
  loading: () => <PageLoadingSkeleton />,
});

const Sectors = dynamic(() => import('@/components/sectors'), {
  ssr: false,
  loading: () => <PageLoadingSkeleton />,
});

const Approach = dynamic(() => import('@/components/approach'), {
  ssr: false,
  loading: () => <PageLoadingSkeleton />,
});

const Associations = dynamic(() => import('@/components/associations'), {
  // ssr: false,
  loading: () => <PageLoadingSkeleton />,
});
const OurClients = dynamic(() => import('@/components/clients'), {
  ssr: false,
  loading: () => <PageLoadingSkeleton />,
});
const FAQSection = dynamic(() => import('@/components/faq'), {
  ssr: false,
  loading: () => <PageLoadingSkeleton />,
});
const ServicesSection = dynamic(() => import('@/components/services'), {
  ssr: false,
  loading: () => <PageLoadingSkeleton />,
});

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <HeroSection />
      <Sectors />
      <ServicesSection />
      <Associations />
      <Approach />
      <OurClients />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
