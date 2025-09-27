import { useState } from 'react';
import { Link } from 'react-router';
import { NavLinks, MobileMenu, ThemeSwitcher, Blob, Logo, Button } from './ui';
import { useAuth, useServiceLocation } from '../hooks';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOutUser } = useAuth();
  const isService = useServiceLocation();


  return (
    <main
      className={`bg-navbar sticky top-0 w-full h-16 lg:h-20 flex-center z-50 ${isService ? 'shadow' : ''}`}
    >
      <nav className={`flex items-center boundary ${isService ? 'justify-end' : 'justify-between'}`}>
        {!isService && <Blob />}

        {isService ? <div></div> : <Logo />}

        {/* links */}
        <NavLinks />

        {/* user profile or login */}
        <div className='flex items-center justify-end gap-2 w-48'>
          {user ? (
            <div className='flex gap-2 items-center'>
              <div className='flex-center gap-2 mt-[5px]'>
                {open && (
                  <div>
                    <Button
                      type='logout'
                      label='Sign Out'
                      onClick={logOutUser}
                    ></Button>{' '}
                  </div>
                )}
                <div
                  onClick={() => setOpen(!open)}
                  className='size-8 lg:size-8.5  border primary-border rounded-full cursor-pointer'
                >
                  <img
                    referrerPolicy='no-referrer'
                    className='rounded-full'
                    src={
                      user.photoURL ? (user.photoURL as string) : '/avatar.png'
                    }
                    alt='User Pic'
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className=' mt-[5px]'>
              <Link to='/signin'>
                <Button type='login' label='Sign In'></Button>
              </Link>
            </div>
          )}

          {/* theme switcher */}
          <div className='hidden lg:block '>
            <span className='mt-[6px] lg:border rounded-full h-8 w-8 flex-center hover:bg-hover transition'>
              <ThemeSwitcher />
            </span>
          </div>
        </div>

        {/* mobile menu */}
        <MobileMenu />
      </nav>
    </main>
  );
};

export default Navbar;
