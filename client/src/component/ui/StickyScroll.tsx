import { useRef, useState, useEffect } from 'react';
import { IconType } from 'react-icons';
import Lottie from 'lottie-react';
import { CgArrowTopRight } from 'react-icons/cg';
import { Link } from 'react-router';
import { cn } from '../../lib/utils';



 interface ServiceContent {
  title: string;
  desc: string;
  icon: IconType;
  path: string;
  cta: string;
  content?: React.ReactNode;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: ServiceContent[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
   const [animationData, setAnimationData] = useState<unknown>(null);

   useEffect(() => {
     import('../../assets/ai-animation.json').then((data) => {
       setAnimationData(data.default);
     });
   }, []);

  // Update activeCard based on which card is entering the viewport
  const handleScroll = () => {
    if (!containerRef.current) return;
    let newIndex = 0;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        newIndex = i; // update to the card currently visible
      }
    });
    setActiveCard(newIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeCard]);



  return (
    <section ref={containerRef} className='relative flex w-full'>
      {/* Left sticky column */}
      <div className='hidden lg:flex lg:flex-col w-1/2 h-screen sticky top-20 p-12 items-end bg-service'>
        <div
          className={cn(
            'relative h-[200px] w-[360px] rounded-xl overflow-hidden flex flex-col items-center justify-center primary-gradient',
            contentClassName
          )}
        >
          {(() => {
            const Icon = content[activeCard].icon;
            return (
              <div>
                <Icon size={36} className='mb-4' />
                <h2 className='text-2xl font-bold'>
                  {content[activeCard].title}
                </h2>
              </div>
            );
          })()}
        </div>
        <div className='mt-6'>
          <Lottie animationData={animationData} style={{ height: '400px' }} />
        </div>
      </div>

      {/* Right scrollable column */}
      <div className='w-full lg:w-1/2 px-6'>
        <div className='max-w-xl xl:max-w-2xl mx-auto'>
          {content.map((item, index) => (
            <div
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              key={item.title + index}
              className='my-8 border primary-border bg-card rounded-lg shadow p-6 lg:border-none lg:mt-[40vh] lg:mb-[90vh]  lg:bg-transparent lg:p-0 lg:shadow-none  relative'
            >
              <div className='absolute top-1  left-1 -z-10 rounded-lg bg-service-card w-full h-full lg:hidden'></div>
              <div className='flex items-center gap-4'>
                <span className='lg:hidden'>{<item.icon size={30} />}</span>
                <h2 className='text-2xl font-bold '>{item.title}</h2>
              </div>
              <p className='text-base my-6 max-w-sm'>{item.desc}</p>
              <div>
                <Link
                  to={item.path}
                  className='cursor-pointer flex gap-1  items-center text-[16px] group mt-6 justify-end lg:justify-start'
                >
                  <span className=' group-hover:translate-x-1 transition-all duration-300 ease-in'>
                    {item.cta}
                  </span>
                  <CgArrowTopRight className='text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-in' />
                </Link>
              </div>
            </div>
          ))}
          <div className='h-40' />
        </div>
      </div>
    </section>
  );
};
