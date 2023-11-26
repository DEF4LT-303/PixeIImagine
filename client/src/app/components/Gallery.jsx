import Link from 'next/link';

const Gallery = ({ images }) => {
  return (
    <section className='py-6 dark:bg-base-100 dark:text-gray-50'>
      {/* {images.length} */}
      <div className='container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4'>
        {images.map((url, index) => (
          <Link href={`#`} key={index}>
            <img
              key={index}
              alt=''
              className={`w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square transition-opacity duration-500 ease-in-out hover:opacity-75`}
              src={url}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
