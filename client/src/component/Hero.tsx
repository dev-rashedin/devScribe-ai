import { sponsorLogos } from '../data';
import Marquee from 'react-fast-marquee';
import {Button, HighlightedText} from './ui';
import {banner} from '../data/assets';

const repeatedLogos = Array.from({ length: 3 }, () => sponsorLogos).flat();

const Hero = () => {
  return (
    <main className='h-[91.3vh] overflow-y-hidden  flex-col-center'>
      <section className='boundary lg:h-[80vh]  flex flex-col-reverse items-center justify-center w-full xl:px-6  xl:flex-row xl:items-center xl:justify-between '>
        {/* hero text and buttons */}
        <div className='max-w-3xl flex flex-col justify-center items-center text-center  xl:items-start xl:text-left '>
          {/* tagline for large screen */}
          <p className='hidden xl:block bg-amber-100 text-amber-500 font-semibold  px-4 py-1 rounded-full mb-2'>
            Your ultimate productivity tool
          </p>
          <h1>AI Assistant for</h1>
          <h1 className='md:hidden'>Developers & Writers</h1>
          <div className='hidden md:block'>
            <HighlightedText label='Developers & Writers' />
          </div>

          <p className='max-w-xl xl:max-w-2xl lg:text-lg text-muted mt-6 '>
            Explain code, refactor smarter, summarize documents, write articles,
            craft emails, and polish your resume — all in one place.
          </p>

          <div className='flex-center gap-4 mt-8 '>
            <Button label='Get Started' type='primary' />
            <Button
              label='Explore Services'
              type='secondary'
              href='#services'
            />
          </div>

          <p className='hidden  max-w-2xl text-muted text-xs mt-4 text-center xl:mt-6 xl:text-left'>
            <span className='font-bold'>Note:</span> Some features described
            here might be planned in our roadmap but not yet released. You can
            open a live chat from within your account and our Support team can
            offer more details or help you with workarounds.
          </p>
        </div>
        {/* hero image */}
        <div className='w-[300px] md:w-[400px] h-auto lg:w-[400px] xl:w-[530px] mt-8 lg:mt-0 relative'>
          <div className='absolute top-0 left-0 w-full h-full -z-50 rounded-full bg-blue-300/10 blur-3xl'></div>
          <img src={banner} alt='coding' className='w-[1000px] h-full -z-10' />
        </div>
      </section>

      {/* bottom marquee */}
      <section className='w-[100%] xl:mb-0 py-4 h-20  bg-faded-pearl'>
          <Marquee direction='left' speed={80} gradient={false}>
            {repeatedLogos.map((logo) => (
              <img
                key={`${logo.id}-${Math.random()}`}
                src={logo.href}
                alt={logo.name}
                className='h-9 mr-20'
              />
            ))}
          </Marquee>    
      </section>
    </main>
  );
};

export default Hero;
