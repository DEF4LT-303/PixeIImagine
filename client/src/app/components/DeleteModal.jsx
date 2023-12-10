import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { deletePrompt, getPromptsByUser } from '../api/redux/apiCalls';

const CreatePostModal = ({ isOpen, onClose, item, data }) => {
  const handleClick = async () => {
    if (item === 'prompt') {
      await deletePrompt(data._id, getPromptsByUser(data.author._id));
      onClose();
    } else {
      return;
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
              Delete {item}?
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete this {item}? This action cannot
                be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default btn-outline' onClick={onClose}>
                Close
              </button>
              <button
                className='btn btn-error btn-outline'
                onClick={handleClick}
              >
                Delete
              </button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
