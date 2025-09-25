import { Link } from 'react-router';
import { NavLinks, MobileMenu, ThemeSwitcher, Blob, Logo, Button } from './ui';
import useAuth from '../hooks';
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOutUser } = useAuth();

  console.log('user', user);
  

  return (
    <main className='bg-navbar sticky top-0 w-full h-16 lg:h-20 flex-center bg-navbar/10 z-50'>
      <nav className='flex-between boundary'>
        <Blob />

        <Logo />
        {/* links */}
        <NavLinks />

        {/* user profile or login */}
        <div className='flex-center gap-2'>
          {user ? (
            <div className='flex gap-2 items-center'>
              <div className='relative'>
                {!open && (
                  <div
                    onClick={() => setOpen(!open)}
                    className='size-8 lg:size-9 mt-1.5 border primary-border rounded-full cursor-pointer'
                  >
                    <img
                      referrerPolicy='no-referrer'
                      className='rounded-full'
                      src={user.photoURL as string}
                      alt='User Pic'
                    />
                  </div>
                )}

                {open && (
                  <div>
                    <Button type='nav-login' label='Sign Out' onClick={logOutUser}></Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className=' mt-1.5'>
              <Link to='/signin'>
                <Button type='nav-login' label='Sign In'></Button>
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
