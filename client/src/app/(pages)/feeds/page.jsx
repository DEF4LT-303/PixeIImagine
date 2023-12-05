'use client';

import { getPosts } from '@/app/api/redux/apiCalls';
import Card from '@/app/components/Card';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Feeds = () => {
  const loading = useSelector((state) => state.posts?.isFetching);

  const posts = useSelector((state) => state.posts?.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    getPosts(dispatch);
  }, [dispatch]);

  if (loading) {
    return (
      <section className='bg-white dark:bg-base-100'>
        <div className='container px-6 py-10 mx-auto animate-pulse'>
          <h1 className='w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700'></h1>

          <p className='w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
          <p className='w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700'></p>

          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3'>
            <div className='w-full '>
              <div className='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 className='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div className='w-full '>
              <div className='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 className='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div className='w-full '>
              <div className='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 className='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div className='w-full '>
              <div className='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 className='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div className='w-full '>
              <div className='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 className='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div className='w-full '>
              <div className='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 className='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div className='w-full '>
              <div className='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 className='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div className='w-full '>
              <div className='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 className='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className='bg-base-100 min-h-full'>
      <div className='container px-6 py-6 mx-auto'></div>
      <div className='text-center'>
        <h1 className='text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white'>
          Feeds
        </h1>

        <p className='max-w-lg mx-auto mt-4 text-gray-500'>
          Browse through the latest posts on the platform. Discover promts and
          images generated by users all around the app.
        </p>
      </div>
      {posts ? (
        <div className='flex flex-col lg:flex-row flex-wrap items-center justify-center py-10 gap-10 mx-5'>
          {posts.map((feed, index) => (
            <Card key={index} feed={feed} />
          ))}
        </div>
      ) : (
        <div className='text-center mt-5'>
          <h1 className='text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white'>
            No posts yet!
          </h1>
        </div>
      )}
    </div>
  );
};

export default Feeds;
