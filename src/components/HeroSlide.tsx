import SwiperCore from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { movies } from '../data';

export const Heroslide = () => {
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
            style={{
              backgroundImage: `url(${slide.poster})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '80dvh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h2>{slide.title}</h2>
            <p>{slide.synopsis}</p>
            <div>
              <button>Read More</button>
              <button>Bookmark</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
