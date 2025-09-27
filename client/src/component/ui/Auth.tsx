import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { UserCredential } from 'firebase/auth';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import {
  FcGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash,
  ImSpinner9,
} from '../../data/icons';
import { useAuth } from '../..//hooks';
import { getUserInfo } from '../../utils';

import { createUserInDatabase } from '../../api';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-toolkit';

interface AuthInputProps {
  type: string;
  id: string;
  isSignUp?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
}

export const AuthInput = ({
  type,
  id,
  isSignUp,
  handleChange = () => {},
  register,
  errors,
}: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  

  return (
    <div className='relative w-full'>
      <input
        className='w-full px-8 py-3.5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2.5'
        {...register(id)}
        onChange={handleChange}
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
            : id
        }
      />
      {errors[id] && (
        <p className='text-red-500 mt-2'>{errors[id]?.message as string}</p>
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
      let data;
      if (provider === 'Google') {
         data = (await googleLogin()) as UserCredential;
        console.log('res inside auth button', data);
        
      } else if (provider === 'Github') {
        data = (await githubLogin()) as UserCredential;
      }
      const userInfo = getUserInfo(data!, '', '');

      const res = await createUserInDatabase(userInfo);
      
       if (res.status === StatusCodes.CREATED) {
         toast.success('User created successfully!');
       }
      if (res.status === StatusCodes.OK ) {
        setLoading(false);
        navigate(from);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={() => handleSocialLogin(provider)}
      disabled={loading}
      className='w-full max-w-xs font-bold shadow-sm rounded-lg bg-blue-100 hover:bg-blue-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline cursor-pointer my-2.5 h-12 disabled:cursor-not-allowed disabled:bg-gray-400'
    >
      {loading ? (
        <ImSpinner9 size={20} className='animate-spin ' />
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
