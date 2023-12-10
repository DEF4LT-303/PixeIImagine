'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CreatePostModal from './CreatePostModal';
import DeleteModal from './DeleteModal';

const Gallery = ({ prompts }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const handleOpenModal = (prompt) => {
    setSelectedPrompt(prompt);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenDeleteModal(false);
  };

  const handleDelete = (prompt) => {
    setSelectedPrompt(prompt);
    setOpenDeleteModal(true);
  };

  if (!prompts) {
    return <h2 className='text-center my-5'>Nothing to display</h2>;
  }

  return (
    <section className='py-6 dark:bg-base-100 dark:text-gray-50'>
      {openModal && (
        <CreatePostModal
          isOpen={openModal}
          onClose={handleCloseModal}
          data={selectedPrompt}
          action={'create'}
        />
      )}
      {openDeleteModal && (
        <DeleteModal
          isOpen={openDeleteModal}
          onClose={handleCloseModal}
          item={'prompt'}
          data={selectedPrompt}
        />
      )}
      <div className='container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4'>
        {prompts.map((prompt, index) => (
          <div key={index} className='relative group'>
            <img
              alt=''
              className={`w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square transition-opacity duration-500 ease-in-out hover:opacity-30`}
              src={prompt.image}
            />

            <div className='flex space-x-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
              <svg
                className='w-6 h-6 text-gray-800 dark:text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 20'
                onClick={() => handleDelete(prompt)}
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z'
                />
              </svg>
              <svg
                className='w-6 h-6 text-gray-800 dark:text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 16 16'
                onClick={() => handleOpenModal(prompt)}
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M8 12V1m0 0L4 5m4-4 4 4m3 5v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3'
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
