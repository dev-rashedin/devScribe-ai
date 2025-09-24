import { Link } from "react-router";


const Logo = () => {
  return (
    <Link
      to='/'
      className='flex gap-2 items-center cursor-pointer font-logo text-brand w-60'
    >
      <img src='/logo.png' alt='logo' className='w-10 h-10 -mt-1' />
      <h1 className='text-2xl font-bold mt-1'>DevScribe AI</h1>
    </Link>
  );
}
export default Logo