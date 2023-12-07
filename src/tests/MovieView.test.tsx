import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, test } from 'vitest';
import { movies } from '../data';
import { MovieView } from '../routes/MovieView';
import { MovieData } from '../types/types';

const findMovieByTitle = (title: string): MovieData | undefined =>
  movies.find(movie => movie.title === title);

const setupMovieView = (movieTitle: string) => {
  const movieToRender = findMovieByTitle(movieTitle);

  if (!movieToRender) {
    throw new Error(`Movie with title "${movieTitle}" not found.`);
  }

  render(
    <MemoryRouter initialEntries={[`/movies/${movieToRender.title}`]}>
      <Routes>
        <Route path='/movies/:id' element={<MovieView />} />
      </Routes>
    </MemoryRouter>
  );

  return { movie: movieToRender };
};

test('renders title in MovieView with a specific movie', () => {
  const movieTitleToRender = 'The Godfather';

  const { movie } = setupMovieView(movieTitleToRender);

  console.log('Movie Title:', movie.title);

  expect(screen.getByText(movie.title, { selector: 'h2' })).toBeInTheDocument();
});

test('renders synopsis in MovieView with a specific movie', () => {
  const movieTitleToRender = 'Inception';

  const { movie } = setupMovieView(movieTitleToRender);

  console.log('Movie synopsis:', movie.synopsis);

  expect(
    screen.getByText(movie.synopsis, { selector: 'p' })
  ).toBeInTheDocument();
});
