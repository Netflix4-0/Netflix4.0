import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { BookmarkProvider } from '../context';
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
      <BookmarkProvider>
        <Routes>
          <Route path='/movies/:id' element={<MovieView />} />
        </Routes>
      </BookmarkProvider>
    </MemoryRouter>
  );

  return { movie: movieToRender };
};

const user = userEvent.setup();

describe('Rendering MovieView', () => {
  test('renders title in MovieView with a specific movie', () => {
    const movieTitleToRender = 'The Godfather';

    const { movie } = setupMovieView(movieTitleToRender);

    expect(
      screen.getByText(movie.title, { selector: 'h2' })
    ).toBeInTheDocument();
  });

  test('renders synopsis in MovieView with a specific movie', () => {
    const movieTitleToRender = 'Inception';

    const { movie } = setupMovieView(movieTitleToRender);

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

  test('renders actors in MovieView', () => {
    const movieTitleToRender = 'The Matrix';

    const { movie } = setupMovieView(movieTitleToRender);

    const actorsList = screen.getByText('Actors:', { selector: 'h3' });
    expect(actorsList).toBeInTheDocument();

    movie.actors.forEach(actor => {
      expect(screen.getByText(actor, { selector: 'li' })).toBeInTheDocument();
    });
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

  test('renders placeholder thumbnail when a movie has no thumbnail', async () => {
    const movieTitleToRender = 'Fight Club';

    const { movie } = setupMovieView(movieTitleToRender);

    const thumbnail = screen.getByAltText(movie.title);

    const placeholder = `${movie.title} coming soon!`;

    fireEvent.error(thumbnail);

    expect(thumbnail).toHaveAttribute('alt', placeholder);
  });
});

describe('Bookmarking in movieview', () => {
  test('Bookmarks a movie when the "Bookmark" button is clicked', async () => {
    setupMovieView('The Godfather');

    const bookmarkButton = screen.getByText('Bookmark', {
      selector: 'button',
    });

    expect(bookmarkButton).toBeInTheDocument();

    user.click(bookmarkButton);

    const bookmarkedButton = await screen.findByText('Bookmarked', {
      selector: 'button',
    });

    expect(bookmarkedButton).toBeInTheDocument();
  });

  test('Removes Bookmarks from a movie when the "Bookmark" button is clicked', async () => {
    setupMovieView('Casablanca');

    const bookmarkButton = screen.getByText('Bookmark', {
      selector: 'button',
    });

    expect(bookmarkButton).toBeInTheDocument();

    user.click(bookmarkButton);

    const bookmarkedButton = await screen.findByText('Bookmarked', {
      selector: 'button',
    });

    expect(bookmarkedButton).toBeInTheDocument();

    user.click(bookmarkedButton);

    expect(bookmarkButton).toBeInTheDocument();
  });
});
