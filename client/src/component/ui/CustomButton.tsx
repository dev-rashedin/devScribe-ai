import { Link } from 'react-router';

const Button = ({
  label,
  type,
  href,
  onClick,
  isSubmit = false,
  className = '',
}: ButtonProps) => {
  let buttonClass = `group relative flex-center py-2 w-36 h-11 font-semibold rounded-lg hover:shadow-lg cursor-pointer transition duration-300 ease-in-out ${className}`;

  if (type === 'primary') {
    buttonClass += ' text-white bg-primary';
  } else if (type === 'secondary') {
    buttonClass += ' text-brand bg-transparent border-2 border-primary';
  }

  const content = (
    <>
      <span className='relative z-10'>{label}</span>
      <span
        className={`absolute inset-0 w-0 rounded-lg ${
          type === 'primary' ? 'bg-blue-800' : 'bg-secondary'
        } transition-[width] duration-500 ease-in-out group-hover:w-full origin-left z-0`}
      />
    </>
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
