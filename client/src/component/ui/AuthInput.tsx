import { FcGoogle, FaGithub } from '../../data/icons';

export const AuthInput = ({ type }: { type: string }) => {
  return (
    <input
      className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2.5'
      type={type}
      placeholder={
        type === 'password'
          ? 'Password'
          : type === 'email'
          ? 'Email'
          : 'Username'
      }
    />
  );
};

export const AuthButton = ({
  type,
  provider,
  onClick,
}: {
  type: string;
  provider: string;
  onClick?: () => void;
}) => {
  return (
    <button className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline cursor-pointer my-2.5'>
      <div className='bg-white p-1 rounded-full'>
        {provider === 'Google' ? (
          <FcGoogle size={20} />
        ) : (
          <FaGithub size={20} />
        )}
      </div>
      <span className='ml-4'>
        {type} with {provider}
      </span>
    </button>
  );
};
