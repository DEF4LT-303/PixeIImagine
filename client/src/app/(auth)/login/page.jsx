'use client';

import { login } from '@/app/api/redux/apiCalls';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isFetching, error } = useSelector((state) => state.user);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClicked = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      return;
    }

    try {
      await login(dispatch, { email, password });
      router.push('/');
    } catch (error) {
      if (error.message === 'Invalid email or password') {
        setErrorMessage('Invalid email or password');
      } else {
        setErrorMessage('An error occurred during login');
      }
      setOpenSnackbar(true);
    }
  };

  const isFieldEmpty = (value) => {
    return value.trim() === '' && submitted;
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const user = useSelector((state) => state.user.currentUser);

  if (user) {
    router.push('/');
  }

  return (
    <div className=''>
      <div className='flex justify-center h-screen'>
        <div
          className='hidden bg-cover lg:block lg:w-2/3'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)'
          }}
        >
          <div className='flex items-center h-full px-20 bg-gray-900 bg-opacity-40'>
            <div>
              <Link href='/'>
                <h2 className='text-2xl font-bold text-white sm:text-3xl'>
                  PixeIImagine
                </h2>
              </Link>

              <p className='max-w-xl mt-3 text-gray-300'>
                Dive into the community of creative minds and unlock the power
                of AI image generation with our innovative SaaS platform.
              </p>
            </div>
          </div>
        </div>

        <div className='flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6'>
          <div className='flex-1'>
            <div className='text-center'>
              <div className='flex justify-center mx-auto '>
                <Image src='/logo.png' width={80} height={80} />
              </div>

              <p className='mt-3 text-gray-500 dark:text-gray-300'>
                Login to create your account
              </p>
            </div>

            <div className='mt-8'>
              <form>
                <div className='mt-6'>
                  <div>
                    <label
                      for='email'
                      className='block mb-2 text-sm text-gray-600 dark:text-gray-200'
                    >
                      Email Address
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='johndoe@example.com'
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400  border border-gray-200 rounded-lg dark:placeholder-gray-600 bg-inherit dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                    />
                  </div>
                </div>

                <div className='mt-6'>
                  <div className='flex justify-between mb-2'>
                    <label
                      for='password'
                      className='text-sm text-gray-600 dark:text-gray-200'
                    >
                      Password
                    </label>
                    <a
                      href='#'
                      className='text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline'
                    >
                      Forgot password?
                    </a>
                  </div>

                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Your Password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400  border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-inherit dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>

                <div className='mt-6'>
                  <button
                    onClick={handleClicked}
                    disabled={false}
                    className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                  >
                    Sign in
                  </button>
                </div>
                <div className='divider'>OR</div>
                <button className='btn w-full bg-inherit border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200  hover:text-slate-900 dark:hover:text-slate-300 dark:hover:bg-slate-700'>
                  {/* <span className='loading loading-spinner'></span> */}
                  <img
                    className='w-6 h-6'
                    src='https://www.svgrepo.com/show/475656/google-color.svg'
                    loading='lazy'
                    alt='google logo'
                  ></img>
                  Login with Google
                </button>
              </form>

              <p className='mt-6 text-sm text-center text-gray-400'>
                Don't have an account yet?{' '}
                <Link
                  href='/register'
                  className='text-blue-500 focus:outline-none focus:underline hover:underline'
                >
                  Sign Up
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
