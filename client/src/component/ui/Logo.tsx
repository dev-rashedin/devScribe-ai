import { Link } from "react-router";


const Logo = ({ size = 'md', isService = false } : LogoProps) => {
  return (
    <Link
      to='/'
      className={`flex gap-2 items-center cursor-pointer font-logo text-brand ${
        isService ? '' : 'w-60'
      }`}
    >
      <img
        src='/logo.png'
        alt='logo'
        className={`${size === 'lg' ? 'size-12' : 'size-10'} -mt-1`}
      />
      <h1
        className={`font-bold mt-1 ${size === 'lg' ? 'text-3xl' : 'text-2xl'} ${isService ? 'hidden' : 'block'}`}
      >
        DevScribe AI
      </h1>
    </Link>
  );
}
export default Logo