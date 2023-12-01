import Link from 'next/link';

const Gallery = ({ prompts }) => {
  if (!prompts) {
    return <h2 className='text-center my-5'>Nothing to display</h2>;
  }

  return (
    <section className='py-6 dark:bg-base-100 dark:text-gray-50'>
      {/* {prompts.length} */}

      <div className='container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4'>
        {prompts.map((prompt, index) => (
          <Link href={`#`} key={index}>
            <img
              key={index}
              alt=''
              className={`w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square transition-opacity duration-500 ease-in-out hover:opacity-75`}
              src={prompt.image}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
