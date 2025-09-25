import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FcGoogle, FaGithub, FaEye, FaEyeSlash, ImSpinner9 } from '../../data/icons';
import useAuth from '../..//hooks';
import { useLocation, useNavigate } from 'react-router';


interface AuthInputProps {
  type: string;
  name: string; 
  isSignUp?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
}


export const AuthInput = ({ type, name, isSignUp, register, errors }: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative w-full'>
      <input
        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2.5'
        {...register(name)}
        type={type === 'password' && showPassword ? 'text' : type}
        placeholder={
          type === 'password'
            ? 'Password'
            : type === 'email'
            ? 'Email'
            : 'Username'
        }
        autoComplete={
          type === 'password'
            ? isSignUp
              ? 'new-password'
              : 'current-password'
            : name
        }
      />
      {errors[name] && (
        <p className='text-red-500 mt-2'>{errors[name]?.message as string}</p>
      )}
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
  const [loading, setLoading] = useState(false);

  const from = location?.state || '/';
  
  const { googleLogin, githubLogin } = useAuth();

  const handleSocialLogin = async (provider: string) => {
    try {
     setLoading(true);
     if (provider === 'Google') {
       await googleLogin();     
     } else if (provider === 'Github') {
      await githubLogin();
      }
      setLoading(false);
     navigate(from);
   } catch (error) {
    console.error(error);
   } finally {
    setLoading(false);
   }
  };

  return (
    <button
      onClick={() => handleSocialLogin(provider)}
      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline cursor-pointer my-2.5'
    >
      {loading ? (
        <ImSpinner9 />
      ) : (
        <>
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
        </>
      )}
    </button>
  );
};


