import { useRef } from 'react';
import { revealVariants } from '../lib/utils';
import { benefitsData } from '../data';
import { BenefitsSVG } from '../data/assets';
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

      <section className='boundary min-h-[65vh] px-6 md:px-8 lg:px-0  flex flex-row-reverse gap-8 xl:gap-12'>
        <TimelineContent
          animationNum={2}
          timelineRef={benefitsRef}
          customVariants={revealVariants}
          className='hidden lg:block lg:w-1/2 xl:w-5/12 bg-service'
        >
          <img src={BenefitsSVG} alt='Benefits' />
        </TimelineContent>
        <div className='lg:w-1/2 xl:w-7/12 grid gap-8 md:grid-cols-2'>
          {benefitsData.map((benefit, index) => (
            <TimelineContent
              key={index}
              animationNum={index}
              timelineRef={benefitsRef}
              customVariants={revealVariants}
              className='bg-card border border-gray-400 hover:border-gray-600 p-6 rounded-xl shadow flex flex-col justify-between space-y-3 group'
            >
              <h3 className='text-xl font-bold text-primary flex items-center gap-2'>
                <benefit.icon size={25} />
                {benefit.title}
              </h3>
              <p className='text-sm sm:text-base text-primary/80'>
                {benefit.description}
        
              </p>
            </TimelineContent>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Benefits;
