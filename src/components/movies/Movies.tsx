import { useState } from 'react';
import { Thumbnail } from '..';
import data from '../../data/movies.json';
import { MovieData } from '../../types/types';
import './movies.css';

export const Movies = () => {
  const [search, setSearch] = useState('');
  const moviesByGenre = [
    ...new Set(data.flatMap(movie => movie.genre.split(', '))),
  ];

  const filteredMovies =
    search === ''
      ? data
      : data.filter(
          m =>
            m.title.toLowerCase().includes(search.toLowerCase()) ||
            m.actors.some(actor =>
              actor.toLowerCase().includes(search.toLowerCase())
            )
        );

  return (
    <div className='moviesSectionContainer'>
      <div className='searchBox'>
        <h4>Search for your favorites</h4>
        <input
          className='searchInput'
          type='text'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search for a movie or actor...'
        />
      </div>

      <div className='movieSection'>
        {search === '' ? (
          moviesByGenre.map((genre, index) => (
            <div key={index}>
              <h2 className='genreTitle'>{genre}</h2>
              <div className='allMoviesInGenre'>
                {filteredMovies
                  .filter(movie => movie.genre.includes(genre))
                  .map((m: MovieData, index: number) => (
                    <Thumbnail
                      key={index}
                      title={m.title}
                      releaseYear={m.year}
                      rating={m.rating}
                      movieData={m}
                      thumbnail={m.thumbnail}
                    />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className='searchResult'>
            {filteredMovies.map((m: MovieData, index: number) => (
              <Thumbnail
                key={index}
                title={m.title}
                releaseYear={m.year}
                rating={m.rating}
                movieData={m}
                thumbnail={m.thumbnail}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
