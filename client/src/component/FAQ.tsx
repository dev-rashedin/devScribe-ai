import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '../component/ui/Accordion';
import { TimelineContent } from '../component/ui/TimelineAnimation';
import { LuPlus } from '../data/icons';
import { useRef } from 'react';


const faqData: FAQItem[] = [
  {
    question: 'CONSUMERS',
    answer:
      'We specialize in custom AI solutions including chatbots, predictive analytics, computer vision, NLP, and automation workflows tailored to your business needs.',
  },
  {
    question: 'SMALL & MEDIUM BUSINESSES',
    answer:
      'Absolutely! We offer seamless integration with CRMs, ERPs, databases, APIs, and other third-party tools your business relies on.',
  },
  {
    question: 'GOVERNMENT & PUBLIC SECTORS',
    answer:
      "We conduct thorough testing and offer ongoing optimization post-launch. If something's off, we'll tweak it until it delivers results.",
  },
  {
    question: 'LARGE ENTERPRISES',
    answer:
      'Yes, we provide clear documentation and offer team training to help you and your staff understand and make the most of the AI systems we implement.',
  },
  {
    question: 'BANKS & CREDT UNIONS',
    answer:
      'We offer flexible pricing based on project complexity and duration—ranging from fixed project fees to retainer and hourly models.',
  },
];

export default function FAQ() {
  const faqsRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: 'blur(10px)',
      y: -20,
      opacity: 0,
    },
  };

  return (
    <div
      className='boundary p-10 mx-auto  min-h-screen w-full grid md:grid-cols-12 gap-5'
      ref={faqsRef}
    >
      <div className='md:col-span-8 md:pr-16'>
        <TimelineContent
          as='span'
          animationNum={0}
          timelineRef={faqsRef}
          customVariants={revealVariants}
          className='text-sm font-semibold text-black/60'
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
                    className='hover:no-underline p-0 border-t border-neutral-400  py-2 relative data-[active]:bg-transparent hover:bg-transparent data-[active]:text-primary  sm:text-base text-sm'
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
                    className='space-y-4 w-full mx-auto bg-[#fdf9f6] px-0'
                    articleClassName='pt-2 px-0 bg-[#fdf9f6]'
                  >
                    <p className='text-sm sm:text-base'>{item.answer}</p>
                  </AccordionPanel>
                </TimelineContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className='md:col-span-4 w-full'>
        <div className='flex flex-col space-y-4 md:w-80 ml-auto'>
          <TimelineContent
            as='div'
            animationNum={6}
            timelineRef={faqsRef}
            customVariants={revealVariants}
            className='space-y-2'
          >
            <span className='text-sm font-semibold text-black/60'>
              OUR PURPOSE
            </span>
            <p className='text-sm sm:text-base text-black/90'>
              Our purpose is to make AI accessible and affordable for everyone,
              empowering businesses of all sizes to leverage the power of AI to
              drive innovation, automate processes, and unlock new
              opportunities.
            </p>
          </TimelineContent>

          <TimelineContent
            as='div'
            animationNum={7}
            timelineRef={faqsRef}
            customVariants={revealVariants}
            className='space-y-2 pt-10'
          >
            <span className='text-sm font-semibold text-black/60'>
              OUR MISSION
            </span>
            <p className='text-sm sm:text-base text-black/90'>
              Our mission is to make AI accessible and affordable for everyone,
              empowering businesses of all sizes to leverage the power of AI to
              drive innovation, automate processes, and unlock new
              opportunities.
            </p>
          </TimelineContent>
        </div>
      </div>
    </div>
  );
}
