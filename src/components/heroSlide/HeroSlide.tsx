import { NavLink } from 'react-router-dom';
import SwiperCore from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { movies } from '../../data';
import './HeroSlide.css';

export const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const trendingMovies = movies.filter(movie => movie.isTrending);

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

                <button className='hero-slide-bookmark'>
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
