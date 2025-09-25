import { Link } from 'react-router';
import {MdPersonAddAlt1} from '../../data/icons'

const Button = ({
  label,
  type,
  href,
  onClick,
  isSubmit = false,
  className = '',
}: ButtonProps) => {
  let buttonClass = `group relative flex-center  font-semibold rounded-lg hover:shadow-lg cursor-pointer transition duration-300 ease-in-out  ${
    type === 'login' ? 'w-full py-4' : type === 'nav-login' ? 'w-20 py-1' : 'w-40 py-2 h-11'
  } ${className}`;

  if (type === 'primary' || type === 'login' || type === 'nav-login') {
    buttonClass += ' text-white bg-primary';
  } else if (type === 'secondary') {
    buttonClass += ' text-brand bg-transparent border-2 border-primary';
  }

  const content = (
    <div className='flex-center gap-4'>
      {type === 'login' && (
       <MdPersonAddAlt1 size={26} className='z-10'/>
      )}
      <span className='relative z-10'>{label}</span>
      <span
        className={`absolute inset-0 w-0 rounded-lg ${
          type === 'primary' || type === 'login'
            ? 'bg-blue-800'
            : 'bg-secondary'
        } transition-[width] duration-500 ease-in-out group-hover:w-full origin-left z-0`}
      />
    </div>
  );

  if (href) {
    return (
      <a href={href} className={buttonClass}>
        {content}
      </a>
    );
  }

  if (isSubmit) {
    return (
      <button type='submit' className={buttonClass}>
        {content}
      </button>
    );
  }

  if (label === 'Get Started') {
    return (
      <Link to='/subscription' className={buttonClass} onClick={onClick}>
       {content}
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
