import { TimelineContent } from './ui/TimelineAnimation';
import { useRef } from 'react';
import { revealVariants } from '../lib/utils';
import HomeSectionHeading from './ui/HomeSectionHeading';

const benefitsData = [
  {
    title: 'Save Time Instantly',
    description:
      'Automate code explanations, document summaries, and article generation to free up hours in your workflow.',
  },
  {
    title: 'Reduce Errors & Confusion',
    description:
      'Get precise AI-powered insights for your code, emails, and content to avoid mistakes and misunderstandings.',
  },
  {
    title: 'Boost Productivity',
    description:
      'Focus on creative and critical tasks while AI handles repetitive or complex operations efficiently.',
  },
  {
    title: 'Professional-Ready Output',
    description:
      'Generate clean, polished content and code improvements suitable for portfolio, reports, or client delivery.',
  },
  {
    title: 'Accessible & Easy to Use',
    description:
      'Intuitive interface designed for developers, writers, and teams with no steep learning curve.',
  },
  {
    title: 'Seamless Integration',
    description:
      'Works well with your existing workflow, supporting multiple tools, formats, and platforms.',
  },
];

const Benefits = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);

  return (
    <section className='bg-blackNWhite py-16 lg:py-24' ref={benefitsRef}>
      <HomeSectionHeading
        title='Why Choose DevScribe-AI'
        subtitle='Discover how DevScribe-AI helps developers, writers, and teams save time, reduce errors, and boost productivity with AI'
        ref={benefitsRef}
      />

      <div className='boundary px-6 md:px-8 lg:px-0 grid gap-8 lg:grid-cols-3 mt-10'>
        {benefitsData.map((benefit, index) => (
          <TimelineContent
            key={index}
            animationNum={index}
            timelineRef={benefitsRef}
            customVariants={revealVariants}
            className='bg-card p-6 rounded-xl shadow flex flex-col justify-between space-y-3'
          >
            <h3 className='text-xl font-bold text-primary'>{benefit.title}</h3>
            <p className='text-sm sm:text-base text-primary/80'>
              {benefit.description}
            </p>
          </TimelineContent>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
