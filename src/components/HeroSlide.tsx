import SwiperCore from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const slidesData = [
  {
    imageUrl: 'https://picsum.photos/200/300',
    title: 'Slide 1',
    description: 'Description for Slide 1',
    button1Text: 'Button 1',
    button2Text: 'Button 2',
  },
  {
    imageUrl: 'https://picsum.photos/200/300',
    title: 'Slide 2',
    description: 'Description for Slide 2',
    button1Text: 'Button 1',
    button2Text: 'Button 2',
  },
  {
    imageUrl: 'https://picsum.photos/200/300',
    title: 'Slide 3',
    description: 'Description for Slide 3',
    button1Text: 'Button 1',
    button2Text: 'Button 2',
  },
  {
    imageUrl: 'https://picsum.photos/200/300',
    title: 'Slide 4',
    description: 'Description for Slide 4',
    button1Text: 'Button 1',
    button2Text: 'Button 2',
  },
];

export const Heroslide = () => {
  SwiperCore.use([Autoplay]);
  return (
    <Swiper
      modules={[Autoplay]}
      grabCursor={true}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3500 }}
    >
      {slidesData.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
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
            <p>{slide.description}</p>
            <div>
              <button>{slide.button1Text}</button>
              <button>{slide.button2Text}</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
