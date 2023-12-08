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

test('renders isTrending in MovieView when a movie is trending', () => {
  const movieTitleToRender = 'Fight Club';

  setupMovieView(movieTitleToRender);

  expect(
    screen.getByText('Trending Now', { selector: 'div' })
  ).toBeInTheDocument();
});

test('renders Rating in MovieView for a specific movie', () => {
  const movieTitleToRender = 'The Godfather';

  const { movie } = setupMovieView(movieTitleToRender);

  expect(
    screen.getByText(`Rating: ${movie.rating}`, { selector: 'p' })
  ).toBeInTheDocument();
});

test('renders "Released in: year" for a specific movie', () => {
  const movieTitleToRender = 'Fight Club';

  const { movie } = setupMovieView(movieTitleToRender);

  expect(screen.getByText(`Released in: ${movie.year}`)).toBeInTheDocument();
});

test('renders thumbnail for a specific movie', () => {
  const movieTitleToRender = 'Casablanca';

  const { movie } = setupMovieView(movieTitleToRender);

  expect(screen.getByAltText(movie.title)).toBeInTheDocument();
});

test('renders genres in MovieView for a specific movie', () => {
  const movieTitleToRender = 'Pulp Fiction';

  const { movie } = setupMovieView(movieTitleToRender);

  const genres = movie.genre.split(', ');

  genres.forEach(genre => {
    expect(
      screen.getByText(genre, { selector: '.genre-item' })
    ).toBeInTheDocument();
  });
});

test('renders actors in MovieView', () => {
  const movieTitleToRender = 'The Matrix';

  const { movie } = setupMovieView(movieTitleToRender);

  console.log('Actors: ', movie.actors);

  const actorsList = screen.getByText('Actors:', { selector: 'h3' });
  expect(actorsList).toBeInTheDocument();

  movie.actors.forEach(actor => {
    expect(screen.getByText(actor, { selector: 'li' })).toBeInTheDocument();
  });
});
