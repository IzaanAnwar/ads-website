import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';

const faqs = [
  {
    question: 'Who is Access Data Systems?',
    answer:
      'Access Data Systems Pvt. Ltd. is a leading IT company founded in 2014 by a group of dynamic and entrepreneurial IT professionals. We focus on delivering innovative information technology solutions, specializing in converged networks, high-performance computing, and security solutions.',
  },
  {
    question: 'What services does Access Data Systems offer?',
    answer:
      'Access Data Systems provides a wide range of services, including high-performance computing solutions, network solutions, data center solutions, security solutions, unified communication solutions, software, and consultancy services. Our goal is to simplify complex projects and deliver end-to-end solutions for our clients.',
  },
  {
    question: 'Where is Access Data Systems located?',
    answer:
      'Access Data Systems is headquartered in New Delhi, India, with branch offices in Jodhpur, Jaipur, Ranchi, Bhubaneswar, and Kanpur.',
  },
  {
    question: 'When was Access Data Systems founded?',
    answer:
      'Access Data Systems was founded in 2014, aiming to make a significant impact in the IT industry.',
  },
  {
    question: 'Why choose Access Data Systems?',
    answer:
      'Access Data Systems stands out for its expertise, experienced technical team, and commitment to customer satisfaction. Our strategic partnerships with industry leaders enable us to deliver cutting-edge solutions tailored to meet the specific needs of our clients across various sectors, including education, defense, and corporate.',
  },
];

export default function FAQSection() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-2 text-center">
        Frequently Asked <strong className="text-primary">Questions</strong>
      </h2>
      <p className="text-gray-600 mb-12 max-w-5xl mx-auto text-center">
        SomeOrg offers cutting-edge cybersecurity solutions with a unique 8-step approach, providing
        unmatched protection against emerging threats. Discover answers to common questions about
        how we can safeguard your business
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-between ">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <Image
            src="/faq/faqs.svg"
            alt="FAQs"
            width={1080}
            height={720}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem(props: { question: string; answer: string }) {
  return (
    <Accordion type="single" collapsible className="border px-2 border-zinc-800 rounded-md">
      <AccordionItem value={props.question}>
        <AccordionTrigger className="hover:no-underline hover:text-primary">
          {props.question}
        </AccordionTrigger>
        <AccordionContent>{props.answer}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
