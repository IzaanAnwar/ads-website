type ServiceItem = {
  title: string;
  description: string;
};

export type ServiceCategory = {
  category: string;
  desc: string;
  href: string;
  subServices: ServiceItem[];
};

export const subServices: ServiceCategory[] = [
  {
    category: 'High Performance Computing Solutions',
    href: 'hpc-solutions',
    desc: "Optimize your organization's computational power with our tailored High-Performance Computing solutions, designed to handle complex workloads, accelerate research, and enhance productivity.",
    subServices: [
      {
        title: 'HPC Cloud Solutions',
        description:
          'Access high-performance computing environments on-demand for flexibility and scalability.',
      },
      {
        title: 'Parallel File Systems',
        description:
          'Efficiently manage large datasets across multiple nodes for improved data access and processing.',
      },
      {
        title: 'HPC Cluster Solutions',
        description:
          'Deploy and manage clusters for parallel processing to enhance computational capabilities.',
      },
      {
        title: 'DPU Solutions',
        description:
          'Utilize Data Processing Units to accelerate data-intensive tasks and improve performance.',
      },
      {
        title: 'Big Data Solutions',
        description:
          'Analyze and manage vast amounts of data to extract meaningful insights for informed decision-making.',
      },
      {
        title: 'CPU Solutions',
        description:
          'Provide high-performance CPU solutions for various computing needs, ensuring optimal performance.',
      },
      {
        title: 'GPU Computing Solutions',
        description:
          'Leverage GPU technology for faster data processing and improved graphical performance in applications.',
      },
    ],
  },
  {
    category: 'Data Centre Solutions',
    href: 'data-centre-solutions',
    desc: 'Maximize efficiency and scalability with our custom-built Data Center solutions, designed to manage large-scale data storage and optimize infrastructure for growth and security.',
    subServices: [
      {
        title: 'Server Management & Support',
        description:
          'Comprehensive management and support services for server infrastructures to ensure reliability.',
      },
      {
        title: 'Data Backup & Disaster Recovery',
        description:
          'Implement backup solutions and recovery plans to protect critical data from loss or damage.',
      },
      {
        title: 'Vulnerability Assessments',
        description:
          'Identify and analyze potential vulnerabilities within the data center to enhance security.',
      },
      {
        title: 'Server Hardening',
        description:
          'Enhance server security by reducing vulnerabilities through configuration and policy adjustments.',
      },
      {
        title: 'Network Services',
        description:
          'Provide robust network solutions for efficient connectivity and communication within the data center.',
      },
      {
        title: 'Colocation Services',
        description:
          'Offer space, power, and cooling for clients to house their servers and network equipment securely.',
      },
      {
        title: 'Server Racks',
        description:
          'Provide server rack solutions designed for optimal organization and airflow in data centers.',
      },
      {
        title: 'Cooling Systems',
        description:
          'Implement cooling solutions to maintain optimal temperature and performance in data centers.',
      },
      {
        title: 'Servers',
        description:
          'Supply high-performance server solutions tailored to meet specific organizational needs.',
      },
      {
        title: 'Storage Solutions',
        description: 'Offer scalable storage options to efficiently manage and protect data.',
      },
    ],
  },
  {
    category: 'Security Solutions',
    href: 'security-solutions',
    desc: 'Protect your organization with cutting-edge security solutions that address every layer of vulnerability, from physical to digital assets, ensuring your business remains resilient to threats.',
    subServices: [
      {
        title: 'Identity and Access Management',
        description: 'Manage user identities and control access to resources to enhance security.',
      },
      {
        title: 'Cloud Security',
        description: 'Implement security measures to protect cloud environments and applications.',
      },
      {
        title: 'Endpoint Security',
        description: 'Protect endpoints from threats with comprehensive security solutions.',
      },
      {
        title: 'Physical Security',
        description:
          'Safeguard physical premises and assets through surveillance and access control.',
      },
      {
        title: 'Data Center Security',
        description: 'Ensure data centers are secure from physical and cyber threats.',
      },
      {
        title: 'Server Security',
        description: 'Protect servers from vulnerabilities and unauthorized access.',
      },
      {
        title: 'Network Security',
        description: 'Implement measures to safeguard network infrastructure from cyber threats.',
      },
    ],
  },
  {
    category: 'Unified Communication Solutions',
    href: 'unified-communication-solutions',
    desc: 'Streamline communication across your enterprise with our Unified Communication solutions, enhancing collaboration, improving efficiency, and supporting remote workforces seamlessly.',
    subServices: [
      {
        title: 'Contact Center',
        description:
          'Provide solutions for managing customer interactions and support through various channels.',
      },
      {
        title: 'Messaging & Collaboration',
        description:
          'Enhance team communication and collaboration with integrated messaging tools.',
      },
      {
        title: 'VoIP Phone Systems',
        description:
          'Implement voice over IP solutions for efficient and cost-effective communication.',
      },
      {
        title: 'Smart Classroom',
        description:
          'Create interactive and engaging learning environments using modern technology.',
      },
      {
        title: 'Video Conferencing',
        description: 'Facilitate virtual meetings with high-quality video conferencing solutions.',
      },
      {
        title: 'Audio Systems & IP EPBX',
        description:
          'Deploy advanced audio systems and IP EPBX solutions for improved communication.',
      },
    ],
  },
  {
    category: 'Software Solutions',
    href: 'software-solutions',
    desc: 'Empower your operations with tailored software solutions that enhance productivity, simplify workflows, and provide scalable platforms to meet your evolving business needs.',
    subServices: [
      {
        title: 'Supply Chain Management (SCM) Solutions',
        description:
          'Optimize supply chain processes for better efficiency and cost-effectiveness.',
      },
      {
        title: 'Business Intelligence (BI) Solutions',
        description: 'Implement BI tools to analyze data and support strategic decision-making.',
      },
      {
        title: 'Customer Relationship Management (CRM) Solutions',
        description: 'Manage customer interactions and data effectively with CRM systems.',
      },
      {
        title: 'Enterprise Resource Planning (ERP) Solutions',
        description: 'Integrate core business processes through comprehensive ERP solutions.',
      },
      {
        title: 'Cloud Migration Services',
        description:
          'Assist organizations in migrating their operations to cloud environments seamlessly.',
      },
      {
        title: 'Server Management Services',
        description: 'Provide ongoing management and support for server infrastructure.',
      },
      {
        title: 'Operating System Deployment',
        description: 'Deploy and manage operating systems for optimal performance and security.',
      },
      {
        title: 'Industry Leading Software',
        description: 'Offer access to top-tier software solutions tailored to business needs.',
      },
      {
        title: 'Backup Solutions',
        description: 'Implement effective backup strategies to protect critical data.',
      },
      {
        title: 'Windows OS (End User/Server)',
        description: 'Provide Windows OS solutions for both end-user and server environments.',
      },
    ],
  },
  {
    category: 'IT Product Consultancy Services',
    href: 'it-product-consultancy',
    desc: 'Leverage our IT consultancy expertise to align your technology strategy with your business goals. We offer specialized guidance on implementing the right solutions for sustainable growth.',
    subServices: [
      {
        title: 'Training and Support',
        description:
          'Provide training and support to enhance the use of IT products and solutions.',
      },
      {
        title: 'Implementation and Integration',
        description: 'Assist in the deployment and integration of IT systems and solutions.',
      },
      {
        title: 'System Design and Architecture',
        description: 'Design and architect IT systems tailored to organizational needs.',
      },
      {
        title: 'Product Evaluation and Selection',
        description:
          'Help organizations evaluate and select the right IT products for their requirements.',
      },
      {
        title: 'Passive Network Solutions',
        description:
          'Provide passive networking solutions to support efficient data transfer and communication.',
      },
      {
        title: 'HPC (CPU & GPU)',
        description:
          'Offer consulting for high-performance computing using both CPU and GPU technologies.',
      },
      {
        title: 'Data Center Solutions',
        description: 'Provide consultancy on optimizing data center operations and infrastructure.',
      },
      {
        title: 'Network Solutions (Wired/Wireless)',
        description:
          'Assist in the design and implementation of wired and wireless network solutions.',
      },
    ],
  },
  {
    category: 'Network Solutions',
    href: 'network-solutions',
    desc: "Safeguard your organization's most critical assets with our end-to-end network security services. We provide comprehensive protection against emerging threats while ensuring reliable, secure connectivity.",

    subServices: [
      {
        title: 'Risk Management',
        description:
          'Identify and mitigate risks to protect your organization’s critical data and infrastructure.',
      },
      {
        title: 'Vulnerability Assessments',
        description:
          'Conduct assessments to identify weaknesses in your network and improve security.',
      },
      {
        title: 'Threat Detection',
        description: 'Implement solutions to detect and respond to potential threats in real-time.',
      },
      {
        title: 'Network Monitoring',
        description:
          'Monitor network traffic and performance to ensure optimal operations and security.',
      },
      {
        title: 'Structured Cabling',
        description:
          'Design and install structured cabling solutions for efficient network connectivity.',
      },
      {
        title: 'Wireless Network',
        description:
          'Provide reliable and secure wireless networking solutions for seamless connectivity.',
      },
      {
        title: 'Wired Network',
        description:
          'Implement wired network solutions for stable and high-performance connectivity.',
      },
    ],
  },
];
