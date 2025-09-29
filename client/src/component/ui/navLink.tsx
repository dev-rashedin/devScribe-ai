import { useState } from 'react';
import { NavLink } from 'react-router'; // your links array
import { links } from '../../data';
import { IoIosArrowDown, IoIosArrowUp } from '../../data/icons';
import {AnimatedBorder, ContactDropdown} from './index';

const NavLinks = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='hidden  lg:flex items-center gap-8 font-medium'>
      <ul className='flex items-center gap-8'>
        {links.map((link) =>
          link.dropdown ? (
            <li
              key={link.title}
              className='relative'
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => {
                setTimeout(() => setOpen(false), 300);
              }}
            >
              <button className='transition -mr-1 flex-center'>
                {link.title}
                <span className='ml-2'>
                  {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </button>

              {open && (
                <div className='absolute -left-8 top-full bg-card shadow-lg rounded-xl w-48 z-50 p-4'>
                  {link.dropdown.map((sub) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded transition text-sm ${
                          isActive ? 'text-brand font-semibold' : 'text-primary'
                        }`
                      }
                    >
                      <span className='relative group'>
                        {sub.title}
                        <AnimatedBorder />
                      </span>
                    </NavLink>
                  ))}
                </div>
              )}
            </li>
          ) : (
            <li key={link.path}>
              <NavLink
                to={link.path}
                target={link.title === 'Blogs' ? '_blank' : '_self'}
                className={({ isActive }) =>
                  `transition ${
                    isActive ? 'text-brand font-bold' : 'text-primary'
                  } group relative px-[2px]`
                }
              >
                {link.title}
                <AnimatedBorder />
              </NavLink>
            </li>
          )
        )}
        <ContactDropdown />
      </ul>
    </div>
  );
};

export default NavLinks;
