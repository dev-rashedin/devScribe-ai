import { useState } from 'react';
import { FcGoogle, FaGithub, FaEye, FaEyeSlash } from '../../data/icons';
import useAuth from '../..//hooks';
import { useLocation, useNavigate } from 'react-router';

 

export const AuthInput = ({ type }: { type: string }) => {
  const [showPassword, setShowPassword] = useState(false);
 

  return (
    <div className='relative w-full'>
      <input
        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2.5'
        type={type === 'password' && showPassword ? 'text' : type}
        placeholder={
          type === 'password'
            ? 'Password'
            : type === 'email'
            ? 'Email'
            : 'Username'
        }
      />

      {type === 'password' && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          className='absolute top-7.5 right-8 cursor-pointer'
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </span>
      )}
    </div>
  );
};

export const AuthButton = ({ type, provider }: AuthButtonProps) => {

  const location = useLocation();
    const navigate = useNavigate();

  const from = location?.state || '/';
  
  const { googleLogin, githubLogin } = useAuth();

  const handleSocialLogin = async (provider: string) => {
   try {
     if (provider === 'Google') {
      await googleLogin();
     } else if (provider === 'Github') {
      await githubLogin();
     }
     navigate(from);
   } catch (error) {
    console.error(error);
   }
  };

  return (
    <button
      onClick={() => handleSocialLogin(provider)}
      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline cursor-pointer my-2.5'
    >
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


