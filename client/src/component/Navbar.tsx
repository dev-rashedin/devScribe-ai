import { NavLinks, MobileMenu, ThemeSwitcher, Blob, Logo } from './ui';

const Navbar = () => {
  return (
    <main className='bg-navbar sticky top-0 w-full h-16 lg:h-20 flex-center bg-navbar/10 z-50'>
      <nav className='flex-between boundary'>
        <Blob />

        <Logo />
        {/* links */}
        <NavLinks />

        {/* theme switcher */}
        <div className='hidden lg:block '>
          <span className='mt-[6px] lg:border rounded-full h-8 w-8 flex-center hover:bg-hover transition'>
            <ThemeSwitcher />
          </span>
        </div>

        {/* mobile menu */}
        <MobileMenu />
      </nav>
    </main>
  );
};

export default Navbar;
