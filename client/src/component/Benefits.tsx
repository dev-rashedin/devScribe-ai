import { useRef } from 'react';
import { benefitsData } from '../data';
import { revealVariants } from '../lib/utils';
import { TimelineContent, HomeSectionHeading } from './ui';



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
