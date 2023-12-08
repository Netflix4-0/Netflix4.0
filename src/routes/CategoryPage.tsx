import { useState } from 'react';
import { Thumbnail } from '../components';
import { movies } from '../data';

export const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Collect all unique genres from movies
  const allGenres = movies.reduce((genres, movie) => {
    const movieGenres = movie.genre.split(',').map(genre => genre.trim());
    movieGenres.forEach(genre => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
    return genres;
  }, [] as string[]);

  const handleChangeSelectedCategory = (genre: string) => {
    setSelectedCategory(genre);
  };

  // Filter movies based on the selected category or display all movies if no category is selected
  const filteredMovies = selectedCategory
    ? movies.filter(movie => movie.genre.includes(selectedCategory))
    : movies;

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          padding: '10px 25px',
          marginTop: '4rem',
        }}
      >
        <button
          style={{
            padding: '5px 10px',
            borderRadius: '5px',
            border: '1px solid #fff',
            background: !selectedCategory ? '#fff' : 'transparent',
            color: !selectedCategory ? '#000' : '#fff',
          }}
          onClick={() => setSelectedCategory('')}
        >
          All
        </button>
        {allGenres.map((genre, index) => (
          <button
            key={index}
            onClick={() => handleChangeSelectedCategory(genre)}
            style={{
              padding: '5px 10px',
              borderRadius: '5px',
              border: '1px solid #fff',
              background: selectedCategory === genre ? '#fff' : 'transparent',
              color: selectedCategory === genre ? '#000' : '#fff',
            }}
          >
            {genre}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px' }}>
        {filteredMovies.map((movie, index) => (
          <Thumbnail
            key={index}
            thumbnail={movie.thumbnail}
            title={movie.title}
            releaseYear={movie.year}
            rating={movie.rating}
            movieData={movie}
          />
        ))}
      </div>
    </>
  );
};
