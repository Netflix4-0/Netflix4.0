import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Thumbnail', () => {
  it('should render thumbnail component and its content', () => {
    render(
      <MemoryRouter>
        <App />
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
    // Bookmark icon
    expect(screen.getByTestId('bookmarkIcon')).toBeInTheDocument();
  });
});
