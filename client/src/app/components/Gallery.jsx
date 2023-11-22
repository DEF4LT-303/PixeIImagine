const Gallery = () => {
  const imageUrls = [
    'https://source.unsplash.com/random/301x301/',
    'https://source.unsplash.com/random/200x200/?0',
    'https://source.unsplash.com/random/200x200/?1',
    'https://source.unsplash.com/random/200x200/?2',
    'https://source.unsplash.com/random/200x200/?3',
    'https://source.unsplash.com/random/200x200/?4',
    'https://source.unsplash.com/random/200x200/?5',
    'https://source.unsplash.com/random/200x200/?6',
    'https://source.unsplash.com/random/200x200/?7',
    'https://source.unsplash.com/random/302x302/',
    'https://source.unsplash.com/random/200x200/?7',
    'https://source.unsplash.com/random/200x200/?7',
    'https://source.unsplash.com/random/200x200/?7',
    'https://source.unsplash.com/random/200x200/?7'
  ];

  return (
    <section className='py-6 dark:bg-gray-800 dark:text-gray-50'>
      <div className='container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4'>
        {imageUrls.map((url, index) => (
          <img
            key={index}
            alt=''
            className={`w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square ${
              index % 5 === 0 && index !== imageUrls.length - 1
                ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2'
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
