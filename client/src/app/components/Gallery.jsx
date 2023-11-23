const Gallery = () => {
  const imageUrls = [
    'https://source.unsplash.com/random/200x200/?0',
    'https://source.unsplash.com/random/200x200/?1',
    'https://source.unsplash.com/random/200x200/?2',
    'https://source.unsplash.com/random/200x200/?3',
    'https://source.unsplash.com/random/200x200/?4',
    'https://source.unsplash.com/random/200x200/?5',
    'https://source.unsplash.com/random/200x200/?6',
    'https://source.unsplash.com/random/200x200/?7',
    'https://source.unsplash.com/random/200x200/?8',
    'https://source.unsplash.com/random/200x200/?9',
    'https://source.unsplash.com/random/200x200/?10',
    'https://source.unsplash.com/random/200x200/?11'
  ];

  return (
    <section className='py-6 dark:bg-base-100 dark:text-gray-50'>
      {imageUrls.length}
      <div className='container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4'>
        {imageUrls.map((url, index) => (
          <img
            key={index}
            alt=''
            className={`w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square ${
              index % 4 == 0
                ? 'col-span-2 row-span-2 md:col-start-3 md:row-start-1'
                : index % 10 === 0
                ? 'col-span-2 row-span-2 md:col-start-1 md:row-start-3'
                : ''
            }`}
            src={url}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
