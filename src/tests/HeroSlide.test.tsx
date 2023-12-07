import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HeroSlide } from '../components';

const setupHeroSlide = () => {
  render(<HeroSlide />);
};

test('Renders trending movie titles', () => {
  setupHeroSlide();
  const movieTitle = screen.getByText('Fight Club', { selector: 'h2' });
  expect(movieTitle).toBeInTheDocument();
});

test('Renders trending movie synopsis', () => {
  setupHeroSlide();
  const movieSynopsis = screen.getByText(
    'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
    { selector: 'p' }
  );
  expect(movieSynopsis).toBeInTheDocument();
});

test('Renders "Read More" buttons for all 7 trending movies', () => {
  setupHeroSlide();
  const readMoreButtons = screen.getAllByText('Read More', {
    selector: 'button',
  });
  expect(readMoreButtons.length).toBe(7);
});

test('Renders "Bookmark" button for all 7 trending movies', () => {
  setupHeroSlide();
  const bookmarkButtons = screen.getAllByText('Bookmark', {
    selector: 'button',
  });
  expect(bookmarkButtons.length).toBe(7);
});

test('Renders isTrending label', () => {
  setupHeroSlide();
  const isTrendingLabel = screen.getAllByText('Trending Now');
  expect(isTrendingLabel.length).toBe(7);
});
