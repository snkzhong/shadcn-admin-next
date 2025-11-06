'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

// FAQ item type definition
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// FAQ sample data
const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "What is Next.js App Router?",
    answer: "Next.js App Router is a new routing system introduced in Next.js 13, built on React Server Components. It offers powerful routing capabilities including nested routes, shared layouts, loading states, and error handling. Compared to the traditional Pages Router, it provides a more intuitive file-system based routing structure and better performance optimizations."
  },
  {
    id: 2,
    question: "What are the features of shadcn/ui?",
    answer: "shadcn/ui is a customizable UI component library built on Radix UI and Tailwind CSS. Its features include: no runtime dependencies, full customizability, type safety, good accessibility support, and adherence to atomic design principles. Unlike other component libraries, shadcn/ui uses a copy-paste approach, giving you complete control over component code."
  },
  {
    id: 3,
    question: "How does TypeScript improve development efficiency?",
    answer: "TypeScript helps developers catch errors at compile time rather than runtime through static type checking. It provides better code hints and autocompletion, making maintenance of large projects easier. Type definitions also act as documentation, facilitating smoother team collaboration. Additionally, TypeScript integrates well with modern IDEs, offering refactoring tools and code navigation."
  },
  {
    id: 4,
    question: "How to implement animations in Next.js?",
    answer: "There are several ways to implement animations in Next.js: CSS transitions and animations, Framer Motion library, React Spring, etc. Framer Motion is a popular choice as it provides a declarative API supporting complex animation sequences, gesture recognition, and layout animations. For simple interactions, CSS transitions are usually sufficient, while Framer Motion offers more powerful features for complex animations."
  },
  {
    id: 5,
    question: "What's the difference between Next.js Server and Client Components?",
    answer: "Server Components render on the server and don't send JavaScript to the client, reducing client bundle size and improving performance. They can't use browser APIs or React state. Client Components render on the client, can use React state, event handling, and browser APIs, but increase JavaScript sent to the client. In Next.js, components are server components by default and can be made client components with the 'use client' directive."
  }
];

// FAQ Item Component - with animation for expand/collapse
const FAQItem = ({ item, expanded }: { item: FAQItem; expanded?: boolean }) => {
  const [isOpen, setIsOpen] = useState(!!expanded);

  // Sync with parent expandAll state
  useEffect(() => {
    if (expanded !== undefined) {
      setIsOpen(expanded);
    }
  }, [expanded]);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border py-0 gap-0">
      <Button
        variant="ghost"
        className="w-full justify-between items-center p-4 hover:bg-muted/50 h-auto text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </motion.div>
      </Button>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          paddingTop: isOpen ? "1rem" : 0,
          paddingBottom: isOpen ? "1rem" : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-6"
      >
        <CardContent className="p-0">
          <p className="text-muted-foreground">{item.answer}</p>
        </CardContent>
      </motion.div>
    </Card>
  );
};

export default function FAQPage() {
  const [expandAll, setExpandAll] = useState(false);

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Page Header with compact spacing */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg mt-2" // Reduced top margin for compactness
          >
            Answers to common questions about Next.js, shadcn/ui and TypeScript
          </motion.p>
        </div>

        {/* Control Button */}
        <div className="flex justify-end mb-6">
          <Button 
            variant="default" 
            size="sm"
            onClick={toggleExpandAll}
          >
            {expandAll ? "Collapse All" : "Expand All"}
          </Button>
        </div>

        {/* FAQ List */}
        <div className="space-y-3"> {/* Reduced spacing between items */}
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <FAQItem item={item} expanded={expandAll} />
            </motion.div>
          ))}
        </div>

        {/* Additional Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Have more questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">If you have other questions, feel free to contact our support team</p>
              <Button>Contact Support</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}