import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Thumbnail } from '../components';
import data from '../data/movies.json';
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
    const thumbnail = screen.getByTestId('movie');
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
});
