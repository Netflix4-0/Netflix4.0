import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import SwiperCore from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BookmarkContext } from '../../context';
import { movies } from '../../data';
import { MovieData } from '../../types/types';
import './HeroSlide.css';

export const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const trendingMovies = movies.filter(movie => movie.isTrending);

  const { bookmarks, addBookmark, removeBookmark } =
    useContext(BookmarkContext);

  const handleBookmark = (e: React.MouseEvent, movie: MovieData) => {
    e.preventDefault();

    if (bookmarks.includes(movie)) {
      removeBookmark(movie);
    } else {
      addBookmark(movie);
    }
  };

  return (
    <Swiper
      modules={[Autoplay]}
      grabCursor={true}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3500 }}
    >
      {trendingMovies.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className='hero-slide-container'
            style={{
              backgroundImage: `url(${slide.poster})`,
            }}
          >
            <div className='hero-slide-content'>
              <div aria-label='trending' className='is-trending-label'>
                Trending Now
              </div>
              <h2>{slide.title}</h2>
              <p>{slide.synopsis}</p>
              <div>
                <NavLink to={`/movie/${slide.title}`}>
                  <button className='hero-slide-read-more'>
                    <i className='fa-solid fa-play hero-slide-icon'></i>Read
                    More
                  </button>
                </NavLink>

                <button
                  className={`hero-slide-bookmark ${
                    bookmarks.includes(slide) ? 'bookmarked' : ''
                  }`}
                  onClick={e => handleBookmark(e, slide)}
                >
                  <i className='fa-solid fa-bookmark hero-slide-icon'></i>
                  Bookmark
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
