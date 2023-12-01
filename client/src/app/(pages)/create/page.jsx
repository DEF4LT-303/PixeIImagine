'use client';

import { createPrompt } from '@/app/api/redux/apiCalls';
import { useState } from 'react';

async function query(data, model) {
  if (model === 'Inkpunk-Diffusion') {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/Envvi/Inkpunk-Diffusion',
      {
        headers: {
          Authorization: 'Bearer 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'
        },
        method: 'POST',
        body: JSON.stringify(data)
      }
    );
    const result = await response.blob();
    return URL.createObjectURL(result);
  }
}

const Create = () => {
  const [title, setTitle] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [selectedModel, setSelectedModel] = useState('Inkpunk-Diffusion');

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
      const imageUrl = await query(
        { inputs: `${title}, nvinkpunk` },
        selectedModel
      );
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleClear = () => {
    setGeneratedImage(null);
    setTitle('');
  };

  const handleSave = () => {
    if (!generatedImage) {
      alert('No image to save');
      return;
    }

    // Convert the generated image to base64
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = generatedImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Convert canvas to base64
      const base64Image = canvas.toDataURL('image/png');

      // Call the API to save the prompt with the base64 image
      const promptData = {
        prompt: title,
        image: base64Image
      };

      createPrompt(promptData)
        .then((res) => {
          console.log('Prompt saved successfully:', res);
          handleClear();
        })
        .catch((error) => {
          console.error('Error saving prompt:', error);
        });
    };
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
          <option value='Inkpunk-CLIP'>Inkpunk CLIP</option>
          <option value='openjourney'>OpenJourney</option>
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

          <div className='btn btn-primary w-1/4' onClick={handleCreate}>
            {generatedImage ? 'Regenerate' : 'Generate'}
          </div>
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
