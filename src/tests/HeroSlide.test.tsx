import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { HeroSlide } from '../components';
import { BookmarkProvider } from '../context';
import { HomePage } from '../routes/HomePage';
import { MovieView } from '../routes/MovieView';

const setupHeroSlide = () => {
  render(
    <MemoryRouter>
      <BookmarkProvider>
        <HeroSlide />
      </BookmarkProvider>
    </MemoryRouter>
  );
};

const user = userEvent.setup();

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

test('Redirects to MovieView when clicking "Read More" buttton', async () => {
  render(
    <MemoryRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/movie/:id' element={<MovieView />} />
      </Routes>
    </MemoryRouter>
  );

  // Get all slides
  const slides = screen.getAllByRole('slide');

  // Pick the first slide
  expect(slides[0]).toBeInTheDocument();

  // Get the slide heading
  const slideHeading = within(slides[0]).getByRole('heading', { level: 2 });

  // Get the slide title
  const slideTitle = slideHeading.innerHTML;

  // Get the "Read More" button
  const readMoreButton = within(slides[0]).getByText('Read More', {
    selector: 'button',
  });

  expect(readMoreButton).toBeInTheDocument();

  user.click(readMoreButton);

  // Wait for the MovieView to render
  await waitFor(() => {
    // Get the movie title and make sure it's the same as the slide title
    const movieTitle = screen.getByText(slideTitle, { selector: 'h2' });

    // Get the actors heading to make sure we're on the MovieView page
    const actorsHeading = screen.getByText('Actors:', { selector: 'h3' });

    expect(movieTitle).toBeInTheDocument();
    expect(actorsHeading).toBeInTheDocument();
  });
});

describe('Bookmarking in heroslide', () => {
  test('Bookmarks a movie when clicking "Bookmark" button', async () => {
    setupHeroSlide();

    const slides = screen.getAllByRole('slide');

    expect(slides[1]).toBeInTheDocument();

    const bookmarkButton = within(slides[1]).getByText('Bookmark', {
      selector: 'button',
    });

    expect(bookmarkButton).toBeInTheDocument();

    user.click(bookmarkButton);

    const bookmarkedButton = await within(slides[1]).findByText('Bookmarked', {
      selector: 'button',
    });

    expect(bookmarkedButton).toBeInTheDocument();
  });

  test('Removes Bookmark from a movie when clicking "Bookmarked" button', async () => {
    setupHeroSlide();

    const slides = screen.getAllByRole('slide');

    expect(slides[1]).toBeInTheDocument();

    const bookmarkButton = within(slides[1]).getByText('Bookmark', {
      selector: 'button',
    });

    expect(bookmarkButton).toBeInTheDocument();

    user.click(bookmarkButton);

    const bookmarkedButton = await within(slides[1]).findByText('Bookmarked', {
      selector: 'button',
    });

    expect(bookmarkedButton).toBeInTheDocument();

    user.click(bookmarkedButton);

    expect(bookmarkButton).toBeInTheDocument();
  });
});
