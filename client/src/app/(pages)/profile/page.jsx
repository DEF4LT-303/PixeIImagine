'use client';

import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const loading = false;

  const dispatch = useDispatch();

  if (loading) {
    return (
      <section class='bg-white dark:bg-base-100'>
        <div class='px-6 py-8 mx-auto animate-pulse'>
          <div class='flex justify-center sm:justify-start text-center'>
            <p class='w-32 h-32 bg-gray-200 rounded-full dark:bg-gray-700 ring-4 ring-gray-300 dark:ring-gray-600'></p>
          </div>

          <hr class='my-6 border-gray-200 md:my-10 dark:border-gray-700' />

          <div class='flex flex-col gap-3 sm:items-start sm:justify-start items-center justify-center '>
            <p class='w-24 h-2 bg-gray-200 rounded-lg dark:bg-gray-700'></p>

            <p class='w-64 h-2 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            <p class='w-64 h-2 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className='relative'>
        <img
          src='https://t3.ftcdn.net/jpg/05/78/94/94/360_F_578949486_IUFDkbOIhPmDkiKwCNvG7oOAtP9sNvO6.jpg'
          alt='background'
          className='px-5 py-5 h-[200px] w-full bg-center bg-cover contrast-75 filter'
        />

        <div className='container mx-auto mt-8 relative sm:absolute'>
          <div className='flex flex-col sm:flex-row gap-2 items-center mt-[-90px] px-5 ml-5'>
            <div className='w-20 h-20 rounded-full overflow-hidden border-4 border-white ring ring-offset-2 ring-offset-primary'>
              <img
                src={user?.photo || '/default.jpg'}
                alt='avatar'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='flex flex-col gap-1 ml-2 mt-2 sm:mt-10'>
              <div className='text-white font-bold text-xl'>
                {user?.firstName || 'User'}
              </div>
            </div>

            {/* Add the rest of your profile details here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
