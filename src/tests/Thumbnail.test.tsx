import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Thumbnail } from '../components';
import { BookmarkProvider } from '../context';
import data from '../data/movies.json';
import { CategoryPage } from '../routes/CategoryPage';
import { MovieView } from '../routes/MovieView';
import { MovieData } from '../types/types';

describe('Thumbnail', () => {
  it('should render thumbnail component and its content', () => {
    const movieData: MovieData = data[0];
    render(
      <MemoryRouter>
        <Thumbnail
          thumbnail={movieData.thumbnail}
          title={movieData.title}
          releaseYear={movieData.year}
          rating={movieData.rating}
          movieData={movieData}
        />
      </MemoryRouter>
    );

    // Find the thumbnail of the movie
    const thumbnail = screen.getByRole('movie');
    expect(thumbnail).toBeInTheDocument();

    // Title
    expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument();
    // Release year
    expect(screen.getByRole('heading', { name: '1994' })).toBeInTheDocument();
    // Rating
    expect(screen.getByRole('heading', { name: 'R' })).toBeInTheDocument();
    // Thumbnail img
    expect(screen.getByRole('img')).toBeInTheDocument();
    // Bookmark button
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should redirect to movie view page on click', async () => {
    render(
      <MemoryRouter>
        <BookmarkProvider>
          <Routes>
            <Route index element={<CategoryPage />} />
            <Route path='movie/:id' element={<MovieView />} />
          </Routes>
        </BookmarkProvider>
      </MemoryRouter>
    );
    const user = userEvent.setup();

    // Find the thumbnail of the movie
    const thumbnails = screen.getAllByRole('movie');
    expect(thumbnails[0]).toBeInTheDocument();

    // Making sure it found the expected movie
    expect(thumbnails[0]).toHaveTextContent('The Shawshank Redemption');
    await user.click(thumbnails[0]);

    const titleHeading = await screen.findByText('The Shawshank Redemption');
    expect(titleHeading).toBeInTheDocument();
  });
});
