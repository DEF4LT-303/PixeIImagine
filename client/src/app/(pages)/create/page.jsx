'use client';

import { createPrompt } from '@/app/api/redux/apiCalls';
import { imageDB } from '@/app/config/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';

async function query(data, model) {
  let apiURL = '';
  let inputs = data.inputs;
  if (model === 'Inkpunk-Diffusion') {
    apiURL =
      'https://api-inference.huggingface.co/models/Envvi/Inkpunk-Diffusion';
    inputs = `${data.inputs}, nvinkpunk`;
  } else if (model === 'animagine') {
    apiURL =
      'https://api-inference.huggingface.co/models/Linaqruf/animagine-xl-2.0';
    inputs = `${data.inputs}, best quality, masterpiece`;
  } else if (model === 'sdxl') {
    apiURL =
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0';
    inputs = `${data.inputs}, high quality`;
  }

  const response = await fetch(apiURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}`
    },
    method: 'POST',
    body: JSON.stringify(inputs)
  });
  const resultBlob = await response.blob();
  const resultURL = URL.createObjectURL(resultBlob);
  return { blob: resultBlob, imageUrl: resultURL };
}

const Create = () => {
  const [title, setTitle] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generatedBlob, setGeneratedBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Inkpunk-Diffusion');

  const user = useSelector((state) => state.user.currentUser?.user);

  const router = useRouter();

  if (!user) {
    router.push('/');
  }

  const handleCreate = async () => {
    if (!title) {
      alert('Please enter a prompt');
      return;
    }

    if (!selectedModel) {
      alert('Please select a model');
      return;
    }

    try {
      setLoading(true);
      const { blob, imageUrl } = await query({ inputs: title }, selectedModel);
      setGeneratedImage(imageUrl);
      setGeneratedBlob(blob);
      setLoading(false);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleClear = () => {
    setGeneratedImage(null);
    setTitle('');
  };

  const handleSave = async () => {
    if (!generatedImage) {
      alert('No image to save');
      return;
    }

    const imageRef = ref(imageDB, `images/${v4()}`);
    await uploadBytes(imageRef, generatedBlob);

    // Get the download URL of the uploaded image
    const imageUrl = await getDownloadURL(imageRef);

    // Call the API to save the prompt with the base64 image
    const promptData = {
      prompt: title,
      image: imageUrl
    };

    // console.log('Prompt data:', promptData);

    createPrompt(promptData)
      .then((res) => {
        console.log('Prompt saved successfully:', res);
        handleClear();
      })
      .catch((error) => {
        console.error('Error saving prompt:', error);
      });
  };

  return (
    <>
      <div className='heading text-center font-bold text-2xl m-5'>
        <h1 className='text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white'>
          Create
        </h1>
      </div>

      <div className='editor mx-auto w-full flex flex-col text-gray-800 dark:text-gray-200 border border-gray-300 p-4 shadow-lg max-w-2xl'>
        <select
          className='bg-gray-100 dark:bg-base-300 border border-gray-300 p-2 mb-4 outline-none  appearance-none cursor-pointer'
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value='Inkpunk-Diffusion'>Inkpunk Diffusion</option>
          <option value='animagine'>ANIMAGINE</option>
          <option value='sdxl'>Stable Diffusion XL</option>
        </select>

        <input
          className='bg-gray-100 dark:bg-base-300 border border-gray-300 p-2 mb-4 outline-none'
          spellCheck='false'
          placeholder='Prompt'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className='buttons mt-5 flex gap-2 justify-center'>
          {/* Add the cancel button if needed */}
          {/* <div
            className='btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto'
            onClick={() => {
              // Handle cancel logic
            }}
          >
            Cancel
          </div> */}

          {generatedImage && (
            <>
              <div
                className='btn btn-outline btn-accent w-1/4'
                onClick={handleSave}
              >
                Save
              </div>
              <div className='btn btn-outline w-1/4' onClick={handleClear}>
                Clear
              </div>
            </>
          )}

          {!loading && (
            <div className='btn btn-primary w-1/4' onClick={handleCreate}>
              {generatedImage ? 'Regenerate' : 'Generate'}
            </div>
          )}
          {loading && (
            <span className='loading loading-infinity loading-lg'></span>
          )}
        </div>

        {generatedImage && (
          <div className='mt-5 border border-gray-300 rounded-sm overflow-hidden'>
            <img
              src={generatedImage}
              alt='Generated Image'
              className='w-full'
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Create;
