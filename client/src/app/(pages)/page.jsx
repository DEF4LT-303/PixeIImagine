'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../api/redux/apiCalls';
import Header from '../components/Header';

const page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getPosts(dispatch);
  }, [dispatch]);

  return (
    <div>
      <Header />

      <section className='bg-base-100 mt-20'>
        <div className='container flex flex-col-reverse mx-auto lg:flex-row'>
          <div className='flex flex-col gap-20 px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5 dark:bg-violet-400 dark:text-gray-900'>
            <div className='flex space-x-2 sm:space-x-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='flex-shrink-0 w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                ></path>
              </svg>
              <div className='space-y-2'>
                <p className='text-lg font-medium leadi'>Choose your Model</p>
                <p className='leadi'>
                  Different models generate different variations of images. Try
                  the one that suits your prompt!
                </p>
              </div>
            </div>
            <div className='flex space-x-2 sm:space-x-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='flex-shrink-0 w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                ></path>
              </svg>
              <div className='space-y-2'>
                <p className='text-lg font-medium leadi'>Know your prompt</p>
                <p className='leadi'>
                  Try out different parameters to get the desired output!
                </p>
              </div>
            </div>
            <div className='flex space-x-2 sm:space-x-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='flex-shrink-0 w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                ></path>
              </svg>
              <div className='space-y-2'>
                <p className='text-lg font-medium leadi'>Generation stuck?</p>
                <p className='leadi'>
                  Try changing the prompt. As this platform uses free tier APIs,
                  loads can cause the generation to crash.
                </p>
              </div>
            </div>
          </div>
          <div className='lg:w-1/2 xl:w-3/5 dark:bg-gray-800'>
            <div className='flex items-center justify-center p-4 md:p-8 lg:p-12'>
              <img
                src='https://firebasestorage.googleapis.com/v0/b/pixeiimagine.appspot.com/o/images%2F773328b3-4f9d-4c80-94d2-2023c3c6edd7?alt=media&token=a3e2cbe0-f187-4378-9811-23270744fba0'
                alt=''
                className='rounded-lg shadow-lg  bg-cover dark:bg-gray-500 sm:min-h-96'
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
