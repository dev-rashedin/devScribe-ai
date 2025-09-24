import { useRef } from 'react';
import { LuPlus } from '../data/icons';
import { faqData } from '../data';
import {revealVariants} from '../lib/utils';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  TimelineContent,
  HomeSectionHeading,
} from './ui';




export default function FAQ() {
  const faqsRef = useRef<HTMLDivElement>(null);


  return (
    <div className='bg-blackNWhite py-16 lg:py-24' ref={faqsRef}>
      <HomeSectionHeading
        title='Your Questions, Answered'
        subtitle='Explore our most asked questions to understand how DevScribe-AI can support you, your team, and your business.'
        ref={faqsRef}
      />
      <div className='boundary px-6! md:px-8! lg:px-0 h-full grid lg:grid-cols-12 gap-10  lg:gap-1 xl:gap-5'>
        <section className='lg:col-span-8 md:pr-16'>
          <TimelineContent
            as='span'
            animationNum={0}
            timelineRef={faqsRef}
            customVariants={revealVariants}
            className=' lg:text-lg font-semibold text-primary opacity-60!'
          >
            WHO WE SERVE
          </TimelineContent>

          <div className='mt-3'>
            <Accordion defaultValue='item-2'>
              {faqData.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className='mb-0 rounded-none bg-transparent  w-full'
                >
                  <TimelineContent
                    as='div'
                    animationNum={1 + index}
                    timelineRef={faqsRef}
                    customVariants={revealVariants}
                  >
                    <AccordionHeader
                      customIcon
                      className='hover:no-underline p-0 border-t border-neutral-400  py-2 relative data-[active]:bg-transparent hover:bg-transparent data-[active]:text-blue-500 hover:text-blue-500 sm:text-base text-sm'
                    >
                      <span className='font-medium lg:text-3xl md:text-2xl sm:text-lg'>
                        {item.question}
                      </span>
                      <span className='relative group-data-[active]:rotate-90 border border-neutral-500  sm:p-2 p-1.5 -translate-x-1 rounded-xl'>
                        <LuPlus className='group-data-[active]:rotate-90 transition-all duration-300 text-lg' />
                      </span>
                    </AccordionHeader>
                  </TimelineContent>
                  <TimelineContent
                    as='div'
                    animationNum={1 + index}
                    timelineRef={faqsRef}
                    customVariants={revealVariants}
                  >
                    <AccordionPanel
                      className='space-y-4 w-full mx-auto bg-card'
                      articleClassName='pt-2 px-2 '
                    >
                      <p className='text-sm sm:text-base'>{item.answer}</p>
                    </AccordionPanel>
                  </TimelineContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* right side : purpose and mission */}
        <section className='lg:col-span-4 w-full'>
          <div className='flex flex-col space-y-2 lg:space-y-8 md:pr-12 lg:pr-0 lg:w-80 ml-auto '>
            <TimelineContent
              as='div'
              animationNum={6}
              timelineRef={faqsRef}
              customVariants={revealVariants}
              className='space-y-2'
            >
              <span className='lg:text-lg font-semibold text-primary opacity-60'>
                OUR PURPOSE
              </span>
              <p className='text-sm lg:text-base text-primary opacity-80 mt-1'>
                Our purpose is to make AI accessible, affordable, and impactful
                for everyone. We aim to remove the barriers that prevent
                individuals from adopting AI by simplifying complex
                technologies. By doing so, we help transform bold ideas into
                practical solutions that fuel growth, innovation, and long-term
                sustainability.
              </p>
            </TimelineContent>

            <TimelineContent
              as='div'
              animationNum={7}
              timelineRef={faqsRef}
              customVariants={revealVariants}
              className='space-y-2 pt-10'
            >
              <span className='lg:text-lg font-semibold text-primary opacity-60'>
                OUR MISSION
              </span>
              <p className='text-sm lg:text-base text-primary opacity-80 mt-1'>
                Our mission is to democratize AI by building tools and services
                that are reliable, ethical, and tailored to real-world
                challenges. We strive to empower every individuals to harness AI
                in a way that boosts productivity, unlocks new opportunities and
                to stay competitive in an AI-driven future.
              </p>
            </TimelineContent>
          </div>
        </section>
      </div>
    </div>
  );
}
