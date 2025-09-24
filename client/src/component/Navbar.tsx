import NavLinks from './ui/navLink';
import MobileMenu from './ui/MobileMenu';
import ThemeSwitcher from './ui/ThemeSwitcher';
import Blob from './ui/Blob';
import Logo from './ui/Logo';

const Navbar = () => {
  return (
    <main className='bg-navbar sticky top-0 w-full h-20 flex-center bg-navbar/10 z-50'>
      <nav className='flex-between boundary'>
        <Blob />

        <Logo />
        {/* links */}
        <NavLinks />

        {/* theme switcher */}
        <div className='hidden lg:block mt-[6px] border rounded-full h-8 w-8 flex-center hover:bg-hover transition'>
          <ThemeSwitcher />
        </div>

        {/* mobile menu */}
        <MobileMenu />
      </nav>
    </main>
  );
};

export default Navbar;
