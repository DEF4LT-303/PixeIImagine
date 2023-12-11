import { createPost, getPosts, updatePost } from '@/app/api/redux/apiCalls';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const CreatePostModal = ({ isOpen, onClose, data, action }) => {
  const [title, setTitle] = useState(data?.title || '');
  const [description, setDescription] = useState(data?.description || '');
  const [prompt, setPrompt] = useState(data?.prompt || '');
  const [image, setImage] = useState(data?.image || '');

  const dispatch = useDispatch();

  const handleClick = async () => {
    if (action === 'Create') {
      const post = {
        title,
        description,
        prompt,
        image
      };
      await createPost(post, dispatch);
      await getPosts(dispatch);
      onClose();
    } else {
      const post = {
        title,
        description
      };
      await updatePost(data._id, post, dispatch);
      await getPosts(dispatch);
      onClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement='center'
        isDismissable={false}
        classNames={{
          backdrop: 'backdrop-filter backdrop-blur-sm'
        }}
      >
        <ModalContent>
          <div className='bg-base-200 rounded-lg'>
            <ModalHeader className='flex flex-col gap-1 text-center text-2xl'>
              {action} Post
            </ModalHeader>
            <ModalBody>
              <form className=''>
                <div className='flex flex-col gap-2'>
                  <div>
                    <label className='block mt-5 mb-2 text-sm text-gray-600 dark:text-gray-200'>
                      Title
                    </label>
                    <input
                      type='text'
                      name='title'
                      id='title'
                      placeholder='Title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className='input input-bordered w-full'
                    />
                  </div>

                  <div>
                    <label className='block mt-5 mb-2 text-sm text-gray-600 dark:text-gray-200'>
                      Description
                    </label>
                  </div>
                  <textarea
                    className='textarea textarea-bordered'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>

                  <div>
                    <label className='block mt-5 mb-2 text-sm text-gray-600 dark:text-gray-200'>
                      Prompt
                    </label>
                    <input
                      type='text'
                      name='prompt'
                      id='prompt'
                      placeholder='Prompt'
                      value={prompt}
                      className='input input-bordered w-full cursor-not-allowed'
                    />
                  </div>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-error btn-outline' onClick={onClose}>
                Close
              </button>
              <button className='btn btn-primary' onClick={handleClick}>
                Post
              </button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
