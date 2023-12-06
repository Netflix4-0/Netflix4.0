import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HeroSlide } from '../components/HeroSlide';

const setupHeroSlide = () => {
  render(<HeroSlide />);
};

test('Renders trending movie titles', () => {
  setupHeroSlide();
  const movieTitle = screen.getByText('Fight Club', { selector: 'h2' });
  expect(movieTitle).toBeInTheDocument();
});
