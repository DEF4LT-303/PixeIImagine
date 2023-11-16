import Link from 'next/link';

const Header = () => {
  return (
    <div className='h-full'>
      <div className='container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center'>
        <div className='w-full lg:w-1/2'>
          <div className='lg:max-w-lg'>
            <h1 className='text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl'>
              Transforming Creativity with AI Image Generation
            </h1>
            <p className='mt-4 text-gray-600 dark:text-gray-300'>
              Unleash your imagination and transform them into images
            </p>
            <div className='grid gap-6 mt-8 sm:grid-cols-2'>
              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>Unlimited Possibilities</span>
              </div>

              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>Seamless Integration</span>
              </div>

              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>Create Your Gallery</span>
              </div>

              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>Browse Prompts</span>
              </div>

              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>Share Your Art</span>
              </div>

              <div className='flex items-center text-gray-800 -px-3 dark:text-gray-200'>
                <svg
                  className='w-5 h-5 mx-3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>

                <span className='mx-3'>Get Started Now!</span>
              </div>
              <Link href='/login'>
                <button className='btn btn-primary w-full'>Sign In</button>
              </Link>
            </div>
          </div>
        </div>

        <div className='items-center justify-center w-full h-full lg:w-1/2 hidden lg:block md:block'>
          <img
            className='object-contain w-full h-full max-w-2xl'
            src='hero_icon.svg'
            alt='hero icon'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
