import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import NumberFlow from '@number-flow/react';
import {
  Card,
  CardContent,
  CardHeader,
  HighlightedText,
} from '../component/ui';
import { LuCheckCheck } from '../data/icons';
import { PlansData } from '../data';

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState('0');

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className='flex justify-center'>
      {/* plan switch buttons */}
      <div className='relative z-50 mx-auto flex w-fit rounded-full bg-neutral-50 border border-gray-200 p-1'>
        {/* monthly plan */}
        <button
          onClick={() => handleSwitch('0')}
          className={`relative z-10 w-fit sm:h-12 h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer ${
            selected === '0'
              ? 'text-white'
              : 'text-muted-foreground hover:text-black'
          }`}
        >
          {selected === '0' && (
            <motion.span
              layoutId={'switch'}
              className='absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-4 shadow-sm border-blue-500 primary-gradient'
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className='relative'>Monthly</span>
        </button>
        {/* yearly plan */}
        <button
          onClick={() => handleSwitch('1')}
          className={`relative z-10 w-fit sm:h-12 h-8 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer ${
            selected === '1'
              ? 'text-white'
              : 'text-muted-foreground hover:text-black'
          }`}
        >
          {selected === '1' && (
            <motion.span
              layoutId={'switch'}
              className='absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-4 shadow-sm border-blue-500 primary-gradient'
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className='relative flex items-center gap-2'>
            Yearly
            <span className='rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-black'>
              Save 20%
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default function Subscription() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);


  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div className='px-4 pt-20 min-h-screen mx-auto relative' ref={pricingRef}>
      <div className='absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0' />

      <div className='text-center mb-6 max-w-5xl mx-auto'>
        <div className='lg:flex lg:justify-center gap-2'>
          <h1>Plans that works</h1>
          <h1 className='md:hidden'> best for your</h1>
          <div className='hidden md:block'>
            <HighlightedText label='best for you' />
          </div>
        </div>

        <p className='mt-6 text-muted lg:text-lg'>
          Trusted by millions, We help teams all around the world, Explore which
          option is right for you.
        </p>
      </div>

      <div>
        <PricingSwitch onSwitch={togglePricingPeriod} />
      </div>

      <div className='grid md:grid-cols-3 max-w-7xl gap-4 py-6 mx-auto'>
        {PlansData.map((plan, index) => (
          <div key={index}>
            <Card
              className={`relative border-neutral-200 ${
                plan.popular ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white '
              }`}
            >
              <CardHeader className='text-left'>
                <div className='flex justify-between'>
                  <h3 className='text-3xl font-semibold text-gray-900 mb-2'>
                    {plan.name}
                  </h3>
                  {plan.popular && (
                    <div className=''>
                      <span className='bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
                        Popular
                      </span>
                    </div>
                  )}
                </div>
                <p className='text-sm text-gray-600 mb-4'>{plan.description}</p>
                <div className='flex items-baseline'>
                  <span className='text-4xl font-semibold text-gray-900'>
                    $
                    <NumberFlow
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className='text-4xl font-semibold'
                    />
                  </span>
                  <span className='text-gray-600 ml-1'>
                    /{isYearly ? 'year' : 'month'}
                  </span>
                </div>
              </CardHeader>

              <CardContent className='pt-0'>
                <button
                  className={`w-full mb-6 p-4 text-xl rounded-xl ${
                    plan.popular
                      ? 'bg-gradient-to-t from-blue-500 to-blue-600  shadow-lg shadow-blue-500 border border-blue-400 text-white'
                      : plan.buttonVariant === 'outline'
                      ? 'bg-gradient-to-t from-neutral-900 to-neutral-600  shadow-lg shadow-neutral-900 border border-neutral-700 text-white'
                      : ''
                  }`}
                >
                  {plan.buttonText}
                </button>
                <ul className='space-y-2 font-semibold py-5'>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className='flex items-center'>
                      <span className='text-neutral-800 grid place-content-center mt-0.5 mr-3'>
                        {feature.icon}
                      </span>
                      <span className='text-sm text-gray-600'>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className='space-y-3 pt-4 border-t border-neutral-200'>
                  <h4 className='font-medium text-base text-gray-900 mb-3'>
                    {plan.includes[0]}
                  </h4>
                  <ul className='space-y-2 font-semibold'>
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className='flex items-center'>
                        <span className='h-6 w-6 bg-green-50 border border-blue-500 rounded-full grid place-content-center mt-0.5 mr-3'>
                          <LuCheckCheck className='h-4 w-4 text-blue-500 ' />
                        </span>
                        <span className='text-sm text-gray-600'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}


