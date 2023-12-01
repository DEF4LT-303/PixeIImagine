'use client';

import { getPosts } from '@/app/api/redux/apiCalls';
import Card from '@/app/components/Card';
import { useEffect, useState } from 'react';

const feeds = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis tincidunt ultricies, nunc nisl ultricies nunc, vitae aliqua',
    createdAt: 'Mar 20, 2023',
    img: 'https://source.unsplash.com/random/300x300/?1',
    tags: ['Design', 'Accessibility'],
    author: {
      name: 'John Doe',
      avatar:
        'https://i.pinimg.com/originals/12/25/7c/12257c071a178a1bbe6ffab5863356cf.jpg'
    }
  },
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis tincidunt ultricies, nunc nisl ultricies nunc, vitae aliqua',
    img: 'https://source.unsplash.com/640x480/?2',
    createdAt: 'Mar 20, 2023',
    tags: ['Design', 'Accessibility'],
    author: {
      name: 'John Doe',
      avatar:
        'https://i.pinimg.com/originals/12/25/7c/12257c071a178a1bbe6ffab5863356cf.jpg'
    }
  },
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis tincidunt ultricies, nunc nisl ultricies nunc, vitae aliqua',
    img: 'https://source.unsplash.com/640x480/?3',
    createdAt: 'Mar 20, 2023',
    tags: ['Design', 'Accessibility'],
    author: {
      name: 'John Doe',
      avatar:
        'https://i.pinimg.com/originals/12/25/7c/12257c071a178a1bbe6ffab5863356cf.jpg'
    }
  },
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis tincidunt ultricies, nunc nisl ultricies nunc, vitae aliqua',
    img: 'https://source.unsplash.com/640x480/?4',
    createdAt: 'Mar 20, 2023',
    tags: ['Design', 'Accessibility'],
    author: {
      name: 'John Doe',
      avatar:
        'https://i.pinimg.com/originals/12/25/7c/12257c071a178a1bbe6ffab5863356cf.jpg'
    }
  },
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis tincidunt ultricies, nunc nisl ultricies nunc, vitae aliqua',
    img: 'https://source.unsplash.com/640x480/?5',
    createdAt: 'Mar 20, 2023',
    tags: ['Design', 'Accessibility'],
    author: {
      name: 'John Doe',
      avatar:
        'https://i.pinimg.com/originals/12/25/7c/12257c071a178a1bbe6ffab5863356cf.jpg'
    }
  },
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis tincidunt ultricies, nunc nisl ultricies nunc, vitae aliqua',
    img: 'https://source.unsplash.com/640x480/?6',
    createdAt: 'Mar 20, 2023',
    tags: ['Design', 'Accessibility'],
    author: {
      name: 'John Doe',
      avatar:
        'https://i.pinimg.com/originals/12/25/7c/12257c071a178a1bbe6ffab5863356cf.jpg'
    }
  }
];

const Feeds = () => {
  const loading = false;

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPosts();
      setPosts(res);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section class='bg-white dark:bg-base-100'>
        <div class='container px-6 py-10 mx-auto animate-pulse'>
          <h1 class='w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700'></h1>

          <p class='w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
          <p class='w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700'></p>

          <div class='grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3'>
            <div class='w-full '>
              <div class='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 class='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p class='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div class='w-full '>
              <div class='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 class='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p class='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div class='w-full '>
              <div class='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 class='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p class='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div class='w-full '>
              <div class='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 class='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p class='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div class='w-full '>
              <div class='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 class='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p class='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div class='w-full '>
              <div class='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 class='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p class='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div class='w-full '>
              <div class='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 class='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p class='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
            </div>

            <div class='w-full '>
              <div class='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

              <h1 class='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
              <p class='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
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
      <div className='flex flex-col lg:flex-row flex-wrap items-center justify-center py-10 gap-10 mx-5'>
        {posts.map((feed, index) => (
          <Card key={index} feed={feed} />
        ))}
      </div>
    </div>
  );
};

export default Feeds;
