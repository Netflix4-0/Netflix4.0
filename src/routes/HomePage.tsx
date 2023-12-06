import { Movies } from '../Movies';
import { Heroslide } from '../components/heroSlide/HeroSlide';

export const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <Heroslide />
      <Movies />
    </>
  );
};
