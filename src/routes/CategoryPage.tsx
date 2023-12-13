import { useState } from 'react';
import { Thumbnail } from '../components';
import { movies } from '../data';
import './CategoryPage.css';

export const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    setIsDropdownOpen(false);
  };

  // Filter movies based on the selected category or display all movies if no category is selected
  const filteredMovies =
    selectedCategory !== 'All'
      ? movies.filter(movie => movie.genre.includes(selectedCategory))
      : movies;

  return (
    <div className='category-container'>
      <div className='categoryChoiceWrapper'>
        <div
          className='categorySelector'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedCategory}
          <div>
            {!isDropdownOpen ? (
              <i
                data-testid='dropdownIconDown'
                className='fa-sharp fa-solid fa-angle-down fa-xs'
              ></i>
            ) : (
              <i
                data-testid='dropdownIconUp'
                className='fa-sharp fa-solid fa-angle-up fa-xs'
              ></i>
            )}
          </div>
        </div>
        {isDropdownOpen && (
          <div className='categoryDropdown'>
            <div
              role='dropdownChoice'
              className='dropdownChoice'
              onClick={() => handleChangeSelectedCategory('All')}
              style={{
                background: selectedCategory === 'All' ? '#c1c1c1' : '#000',
                color: selectedCategory === 'All' ? '#000' : '#FFF',
              }}
            >
              All
            </div>
            {allGenres.map((genre, index) => (
              <div
                role='dropdownChoice'
                className='dropdownChoice'
                key={index}
                onClick={() => handleChangeSelectedCategory(genre)}
                style={{
                  background: selectedCategory === genre ? '#c1c1c1' : '#000',
                  color: selectedCategory === genre ? '#000' : '#FFF',
                }}
              >
                {genre}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='filtered-movies-container'>
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
    </div>
  );
};
