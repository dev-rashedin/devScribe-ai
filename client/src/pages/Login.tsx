import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from "react-helmet-async";
import Button from "../component/ui/CustomButton";
import Logo from "../component/ui/Logo";
import { LoginSVG } from "../data/assets";
import { AuthInput } from "../component/ui";
import { AuthButton } from "../component/ui";
import { schema } from "../utils";
import {useAuth} from "../hooks";


type FormData = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const {createUser, logInUser} = useAuth();

  const isSignUp = location.pathname.includes('/signup');
  const authType = isSignUp ? 'Sign Up' : 'Sign In';
  const from = location?.state || '/';

  const resolver = isSignUp ? {
      resolver: zodResolver(schema),
    } : {};
  

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm<FormData>(resolver);
  
  const onSubmit = async (data: unknown) => {
    const { email, password } = data as FormData;
  try {
    setLoading(true);
    if (isSignUp) {
      console.log('Sign Up', data);

      const res = await createUser(email, password);

      // await createUser(uid: res.user.uid, email, password);
      console.log('res', res);
      navigate('/signin')
      
    } else {
      console.log('Sign In', data);
      await logInUser(email, password);
      navigate(from);
    }
    reset();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      <Helmet>
        <title>DevScribe-AI || {authType}</title>
      </Helmet>
      <div className='max-w-screen-xl m-0 md:m-3 lg:m-5 xl:m-7 bg-faded-pearl shadow sm:rounded-lg flex justify-center flex-1'>
        {/* left side form */}
        <div className='lg:w-1/2 p-6 sm:p-12'>
          <div className='flex-center'>
            <Logo size='lg' />
          </div>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>{authType}</h1>
            <div className='w-full flex-1 mt-8'>
              <div className='flex flex-col items-center'>
                <AuthButton type={authType} provider='Google' />
                <AuthButton type={authType} provider='Github' />
              </div>
              {/* sign in or up with email and password */}
              <div className='my-8 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Or {authType.toLowerCase()} with e-mail
                </div>
              </div>

              <div className='mx-auto max-w-xs'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {location.pathname.includes('/signup') && (
                    <AuthInput
                      type='text'
                      name='username'
                      register={register}
                      errors={errors}
                    />
                  )}
                  <AuthInput
                    type='email'
                    name='email'
                    register={register}
                    errors={errors}
                  />
                  <AuthInput
                    type='password'
                    name='password'
                    isSignUp={isSignUp}
                    register={register}
                    errors={errors}
                  />

                  <Button
                    loading={loading}
                    isChecked={isSignUp ? isChecked : true}
                    label={authType}
                    type='submit'
                    isSubmit={true}
                    className='mt-3'
                  />
                </form>
                {/* terms and conditions */}
                {location.pathname.includes('/signup') && (
                  <div className='my-6 flex items-start justify-center gap-[1px] text-xs text-gray-600 text-center'>
                    <input
                      type='checkbox'
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="accent-blue-500"
                    />
                    <p>
                      I agree to abide by DevScribe's
                      <a
                        href='#'
                        className='ml-2 border-b border-gray-500 border-dotted'
                      >
                        Terms of Service
                      </a>{' '}
                      and its{' '}
                      <a
                        href='#'
                        className='border-b border-gray-500 border-dotted'
                      >
                        Privacy Policy
                      </a>
                    </p>

                    <div></div>
                  </div>
                )}

                {/* signin / signup route */}
                {isSignUp ? (
                  <div className='mt-6 text-sm text-gray-600 text-center'>
                    Already have an account?
                    <Link
                      to='/signin'
                      className='ml-2 font-semibold hover:underline'
                    >
                      Sign In
                    </Link>
                  </div>
                ) : (
                  <div className='mt-6 text-sm text-gray-600 text-center'>
                    Don't have an account?
                    <Link
                      to='/signup'
                      className='ml-2 font-semibold hover:underline'
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* right side illustration */}
        <div className='flex-1 bg-blue-100 text-center hidden lg:flex rounded-lg'>
          <img
            src={LoginSVG}
            alt='login'
            className='w-full h-full object-cover rounded-r-lg'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
