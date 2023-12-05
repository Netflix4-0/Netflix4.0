import React, { useState } from 'react';
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

  const handleChangeSelectedCategory = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(e.target.value);
  };

  // Filter movies based on the selected category or display all movies if no category is selected
  const filteredMovies = selectedCategory
    ? movies.filter(movie => movie.genre.includes(selectedCategory))
    : movies;

  return (
    <>
      <select value={selectedCategory} onChange={handleChangeSelectedCategory}>
        <option value=''>Categories</option>
        {allGenres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      {filteredMovies.map((movie, index) => (
        <div key={index}>
          <div>{movie.title}</div>
        </div>
      ))}
    </>
  );
};
