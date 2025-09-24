import { Link, NavLink } from 'react-router';
import { links, socialLinks } from '../data';

const Footer = () => {
  return (
    <footer className='bg-footer h-60 lg:h-48 text-muted py-6 lg:mt-20 '>
      <div className='w-full max-w-4xl xl:max-w-5xl mx-auto flex flex-col lg:flex-row items-start md:items-center justify-between pt-4 gap-6'>        {/*  links */}
        <section className='flex px-8 md:gap-20 xl:gap-28 text-primary'>
          <div className='flex flex-col  gap-2'>
            {links.map((link) =>
              !link.title.includes('Services') ? (
                <Link
                  key={link.path}
                  to={link.path as string}
                  className='text-sm hover:text-primary transition text-muted underline'
                >
                  {link.title}
                </Link>
              ) : null
            )}
          </div>

          <div>
            {links.map(
              (link) =>
                link.dropdown && (
                  <div
                    key={link.title}
                    className='grid grid-cols-2 gap-2 md:gap-x-20 xl:gap-x-28 p-2'
                  >
                    {link.dropdown.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        className='block px-2 py-1 rounded transition hover:text-primary text-sm text-muted underline'
                      >
                        {sub.title}
                      </NavLink>
                    ))}
                  </div>
                )
            )}
          </div>
        </section>

        {/* social links & copyright */}
        <section className='flex items-center px-4 gap-12 md:gap-16 md:flex-row lg:flex-col-reverse lg:gap-4'>
          <p className='text-xs xl:text-sm'>
            &copy; {new Date().getFullYear()} AI Analyzer. All rights reserved.
          </p>
          {/* social links */}
          <div className='flex-center gap-2 md:gap-6 text-secondary'>
            {socialLinks.map(({ href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:text-brand transition'
              >
                <Icon className='w-5 h-5' />
              </a>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
