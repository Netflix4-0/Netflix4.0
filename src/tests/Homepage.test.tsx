import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { HomePage } from '../routes/HomePage';

const user = userEvent.setup();

function setupHomepage() {
  render(
    <MemoryRouter>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Search functionality', () => {
  test('renders search input', () => {
    setupHomepage();

    const searchInput = screen.getByRole('searchbox');

    expect(searchInput).toBeInTheDocument();
  });

  test('user can search for a Movie', async () => {
    setupHomepage();

    const searchInput = screen.getByRole('searchbox');

    const searchWord = 'Forrest Gump';

    user.type(searchInput, searchWord);

    const movieTitle = await screen.findByText(searchWord, {
      selector: 'h3',
    });

    expect(movieTitle).toBeInTheDocument();
  });
});
