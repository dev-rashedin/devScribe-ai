import { Link } from 'react-router';

const Button = ({
  label,
  type,
  href,
  onClick,
  isSubmit = false,
  className = '',
}: ButtonProps) => {
  let buttonClass = `group relative flex-center  font-semibold rounded-lg hover:shadow-lg cursor-pointer transition duration-300 ease-in-out  ${
    type === 'login' ? 'w-full py-4' : 'w-40 py-2 h-11'
  } ${className}`;

  if (type === 'primary' || type === 'login') {
    buttonClass += ' text-white bg-primary';
  } else if (type === 'secondary') {
    buttonClass += ' text-brand bg-transparent border-2 border-primary';
  }

  const content = (
    <div className='flex-center gap-4'>
      {type === 'login' && (
        <svg
          className='w-6 h-6 -ml-2'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
          <circle cx='8.5' cy='7' r='4' />
          <path d='M20 8v6M23 11h-6' />
        </svg>
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
