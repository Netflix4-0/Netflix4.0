import { useState } from 'react';
import data from '../data/movies.json';
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
    <div>
      <div className='searchBox'>
        <h4>Search for your favorites</h4>
        <input
          className='searchInput'
          type='text'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search for a movie'
        />
      </div>

      <div className='movieSection'>
        {search === ''
          ? moviesByGenre.map((genre, index) => (
              <div key={index}>
                <h2>{genre}</h2>
                <div className='allMoviesInGenre'>
                  {filteredMovies
                    .filter(movie => movie.genre.includes(genre))
                    .map((m, index) => (
                      <div className='movie' key={index}>
                        <p className='movieTitle'>{m.title}</p>
                        <img
                          className='moviePicture'
                          src={m.thumbnail || 'vite.svg'}
                          onError={event => {
                            const target = event.target as HTMLImageElement;
                            target.src =
                              'https://github.com/Netflix4-0/Netflix4.0/assets/117076586/0628211e-81a5-482f-84c9-b4cf936ef61b';
                          }}
                          alt='movie'
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))
          : filteredMovies.map((m, index) => (
              <div key={index} className='movie'>
                <div className='movieTitle'>{m.title}</div>
                <img
                  className='moviePicture'
                  src={m.thumbnail || 'vite.svg'}
                  onError={event => {
                    const target = event.target as HTMLImageElement;
                    target.src =
                      'https://github.com/Netflix4-0/Netflix4.0/assets/117076586/0628211e-81a5-482f-84c9-b4cf936ef61b';
                  }}
                  alt='movie'
                />
              </div>
            ))}
      </div>
    </div>
  );
};