import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import { CategoryPage } from '../routes/CategoryPage';

describe('Categories', () => {
  it('should display buttons for each category', () => {
    render(
      <MemoryRouter>
        <CategoryPage />
      </MemoryRouter>
    );

    const genreButtons = screen.getAllByRole('button');
    expect(genreButtons).toHaveLength(genreButtons.length);
  });

  it('should display right amout of movies with selected genre', async () => {
    render(
      <MemoryRouter>
        <CategoryPage />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const actionGenreButton = screen.getByRole('button', { name: 'Action' });
    expect(actionGenreButton).toBeInTheDocument();
    await user.click(actionGenreButton);

    const actionMovies = await screen.findAllByTestId('movie');
    expect(actionMovies).toHaveLength(actionMovies.length);
  });
});
