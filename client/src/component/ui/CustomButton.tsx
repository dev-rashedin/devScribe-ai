import { Link } from 'react-router';
import { ImSpinner9, MdPersonAddAlt1 } from '../../data/icons';

const Button = ({
  label,
  type,
  href,
  onClick,
  loading,
  isChecked,
  isSubmit = false,
  className = '',
}: ButtonProps) => {
  let buttonClass = `group relative flex-center  font-semibold rounded-lg hover:shadow-lg cursor-pointer transition duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50  ${
    type === 'submit'
      ? 'w-full h-12'
      : type === 'login' || type === 'logout'
      ? 'w-20 py-2 text-xs'
      : 'w-40 py-2 h-11'
  } ${className}`;

  if (type === 'primary' || type === 'submit' || type === 'login') {
    buttonClass += ' text-white bg-primary';
  } else if (type === 'secondary') {
    buttonClass += ' text-brand bg-transparent border-2 border-primary';
  } else if (type === 'logout') {
    buttonClass += ' text-white bg-amber-700';
  } 

  const content = (
    <div className='flex-center gap-4'>
      {type === 'submit' && <MdPersonAddAlt1 size={26} className='z-10' />}
      <span className='relative z-10'>{label}</span>
      {!isChecked ||
        (!loading && (
          <span
            className={`absolute inset-0 w-0 rounded-lg ${
              type === 'primary' || type === 'submit' || type === 'login'
                ? 'bg-blue-800'
                : type === 'logout'
                ? 'bg-amber-900'
                : 'bg-secondary'
            } transition-[width] duration-500 ease-in-out group-hover:w-full origin-left z-0`}
          />
        ))}
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
      <button disabled={loading || !isChecked} type='submit' className={buttonClass}>
        {loading ? <ImSpinner9 className='animate-spin' /> : content}
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
