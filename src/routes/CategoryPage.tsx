import { useState } from 'react';
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
      <div>
        {allGenres.map((genre, index) => (
          <button
            key={index}
            onClick={() => handleChangeSelectedCategory(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      {filteredMovies.map((movie, index) => (
        <div key={index}>
          <div data-testid="movie">{movie.title}</div>
        </div>
      ))}
    </>
  );
};
