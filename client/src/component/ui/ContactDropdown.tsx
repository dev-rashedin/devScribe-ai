import { useState } from 'react';
import { socialLinks } from '../../data';
import { IoIosArrowDown, IoIosArrowUp } from '../../data/icons';
import {AnimatedBorder} from './index';


const ContactDropdown = ({ screen = 'large' }: { screen?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <li
      className='relative'
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setTimeout(() => setOpen(false), 200)}
    >
      <button
        className={`cursor-pointer transition py-1 flex-center ${
          screen === 'large' ? '' : 'pl-4'
        }`}
        onClick={() => setOpen(!open)}
      >
        Contact
        <span className='ml-2'>
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </button>

      {open && (
        <div
          className={`
      flex flex-col gap-2 p-4 rounded-xl bg-card lg:shadow-lg z-50 relative  lg:absolute lg:top-full lg:left-0 lg:w-40
    `}
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.href}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 px-2 py-1 rounded hover:text-brand transition relative group text-primary text-sm'
              >
                <Icon className='w-4 h-4 lg:w-5 lg:h-5' />
                <span className='relative group'>
                  {social.title}
                  <AnimatedBorder />
                </span>
              </a>
            );
          })}
        </div>
      )}
    </li>
  );
};

export default ContactDropdown;
