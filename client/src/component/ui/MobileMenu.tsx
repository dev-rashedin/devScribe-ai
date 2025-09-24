import { useState } from 'react';
import { NavLink } from 'react-router';
import { links } from '../../data';
import {
  IoCloseCircleOutline,
  IoIosArrowDown,
  IoIosArrowUp,
  RiMenu3Fill,
} from '../../data/icons';
import {ContactDropdown, AnimatedBorder, ThemeSwitcher} from './index';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className='relative md:hidden'>
      {/* Hamburger button */}
      <button
        className='flex items-center justify-center p-2'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <IoCloseCircleOutline size={30} />
        ) : (
          <RiMenu3Fill size={27} />
        )}
      </button>

      {/* Mobile menu panel */}
      <div
        className={`bg-card w-60 rounded-md px-4 py-6 space-y-4 flex flex-col absolute top-12 right-0
        transform transition-transform duration-300 ease-in-out z-50
        ${
          isOpen
            ? 'opacity-100 translate-x-0'
            : 'translate-x-20 opacity-0 pointer-events-none'
        }`}
      >
        <ul className='flex flex-col gap-2'>
          {links.map((link) =>
            link.dropdown ? (
              <li key={link.title} className='flex flex-col'>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.title ? null : link.title
                    )
                  }
                  className='flex items-center px-4 py-2 rounded hover:bg-yellow-100 transition'
                >
                  {link.title}
                  <span className='ml-2'>
                    {openDropdown === link.title ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </span>
                </button>

                {openDropdown === link.title && (
                  <div className='flex flex-col pl-4 mt-1 gap-1'>
                    {link.dropdown.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        className={({ isActive }) =>
                          `block text-sm px-2 py-1 rounded transition ${
                            isActive
                              ? 'text-brand font-semibold'
                              : 'text-primary'
                          } relative group`
                        }
                      >
                        {sub.title}
                        <AnimatedBorder />
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
                    `block px-4 py-2 rounded transition ${
                      isActive ? 'text-brand font-bold' : 'text-primary'
                    } relative group`
                  }
                >
                  {link.title}
                  <AnimatedBorder />
                </NavLink>
              </li>
            )
          )}

          <ContactDropdown screen='small' />
        </ul>

        {/* Theme switcher */}
        <div className='w-[86%] mx-auto border rounded-lg flex-between py-2 px-4  justify-end'>
          <span className='text-xs text-muted-foreground opacity-75'>
            Theme
          </span>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
