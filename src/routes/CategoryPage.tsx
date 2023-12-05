import React, { useState } from 'react';
import { movies } from '../data';

export const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const genres = [
    'Drama',
    'Crime',
    'Action',
    'Biography',
    'History',
    'Adventure',
    'Western',
    'Romance',
    'Sci-Fi',
    'Fantasy',
    'Thriller',
    'War',
    'Mystery',
    'Music',
    'Horror',
  ];
  const sortedGenres = genres.sort();

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
        {sortedGenres.map((genre, index) => (
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
