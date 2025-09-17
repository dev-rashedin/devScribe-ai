'use client';

import { sponsorLogos } from '../data';
import Button from './ui/CustomButton';
import HighlightedText from './ui/HighlightedText';
import Marquee from 'react-fast-marquee';
import banner from '../assets/banner.png';

const repeatedLogos = Array.from({ length: 3 }, () => sponsorLogos).flat();

const Hero = () => {
  return (
    <main className='h-[91.3vh] overflow-y-hidden boundary flex flex-col items-center justify-between xl:justify-center'>
      <section className='flex flex-col-reverse items-center justify-center w-full xl:px-6  xl:flex-row xl:items-center xl:justify-between '>
        {/* hero text and buttons */}
        <div className='max-w-3xl flex flex-col justify-center items-center text-center  xl:items-start xl:text-left '>
          {/* tagline for large screen */}
          <p className='hidden xl:block bg-amber-100 text-amber-600 font-semibold  px-4 py-1 rounded-full mb-2'>
            Your ultimate productivity tool
          </p>
          <h1>AI Assistant for</h1>
          <h1 className='md:hidden'>Developers & Writers</h1>
          <div className='hidden md:block'>
            <HighlightedText label='Developers & Writers' />
          </div>

          <p className='max-w-xl xl:max-w-2xl md:text-lg xl:text-xl text-muted mt-6 xl:mt-8'>
            Explain code, refactor smarter, summarize documents, write articles,
            craft emails, and polish your resume — all in one place.
          </p>

          <div className='flex-center gap-4 mt-8 xl:mt-12'>
            <Button label='Get Started' type='primary' />
            <Button label='Explore Services' type='secondary' href='#services' />
          </div>

          <p className='hidden  max-w-2xl text-muted text-xs mt-4 text-center xl:mt-6 xl:text-left'>
            <span className='font-bold'>Note:</span> Some features described
            here might be planned in our roadmap but not yet released. You can
            open a live chat from within your account and our Support team can
            offer more details or help you with workarounds.
          </p>
        </div>
        {/* hero image */}
        <div className='w-[300px] md:w-[400px] h-auto lg:w-[400px] xl:w-[530px] mt-8 lg:mt-0 '>
          <img src={banner} alt='coding' className='w-[1000px] h-full -z-50' />
        </div>
        {/*  floating icons */}
        {/* <FloatingIcons/> */}
      </section>

      {/* bottom marquee */}
      <section className='w-[100%] mb-6 xl:mb-0 xl:mt-16  bg-faded-pearl'>
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
