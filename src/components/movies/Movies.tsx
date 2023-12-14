import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbnail } from '..';
import { movies } from '../../data';
import data from '../../data/movies.json';
import { MovieData } from '../../types/types';
import './Movies.css';

export const Movies = () => {
  const [search, setSearch] = useState('');

  const nonTrendingMovies = movies.filter(movie => !movie.isTrending);

  const shuffledMovies = nonTrendingMovies.sort(() => Math.random() - 0.5);

  const selectedMovies = shuffledMovies.slice(0, 10);

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
        <div className='searchInputGroup'>
          <input
            className='searchInput'
            type='search'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search for a movie or actor...'
          />
          <i className='fa fa-search search-icon'></i>{' '}
        </div>
      </div>

      <div className='movieSection'>
        {search === '' ? (
          <div>
            <h2 className='recommended-for-you-heading'>Recommended for you</h2>
            <Swiper
              spaceBetween={10}
              slidesPerView={'auto'}
              navigation
              loop={true}
            >
              {selectedMovies.map((m, index) => (
                <SwiperSlide key={m.thumbnail || index}>
                  <Thumbnail
                    title={m.title}
                    releaseYear={m.year}
                    rating={m.rating}
                    movieData={m}
                    thumbnail={m.thumbnail}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
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
