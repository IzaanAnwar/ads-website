import { InfiniteMovingCards } from '../ui/infinite-moving-cards';

const companies = [
  { name: 'Avaya', logo: '/associations/avaya.svg' },
  { name: 'Molex', logo: '/associations/molex.png' },
  { name: 'D-Link', logo: '/associations/dlink.svg' },
  { name: 'EMC', logo: '/associations/emc.svg' },
  { name: 'Juniper Networks', logo: '/associations/jupiter.svg' },
  { name: 'NetApp', logo: '/associations/netapp.svg' },
  { name: 'IBM', logo: '/associations/ibm.svg' },
  { name: 'Lenovo', logo: '/associations/lenovo.svg' },
  { name: 'Cisco', logo: '/associations/cisco.svg' },
  { name: 'Hewlett-Packard', logo: '/associations/hewlett.svg' },
  { name: 'RedHat', logo: '/associations/redhat.svg' },
  { name: 'Intel', logo: '/associations/intel.svg' },
  { name: 'Microsoft', logo: '/associations/microsoft.svg' },
];

export default function Associations() {
  return (
    <div className="max-w-7xl mx-auto my-24 px-4">
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-900 mt-12">
        Our <strong className="text-primary">Associations</strong>
      </h1>
      <p className="text-gray-600 mb-12 text-center max-w-5xl mx-auto">
        We take pride in our strategic alliances with leading technology providers and innovators.
        Together, we ensure that our IT solutions remain at the cutting edge, delivering security,
        reliability, and excellence.
      </p>
      <InfiniteMovingCards items={companies} direction="left" speed="slow" pauseOnHover={false} />
    </div>
  );
}
