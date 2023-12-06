import { render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Header } from '../components/Header';

describe('Header', () => {
  it('should exist a header', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const header = await waitFor(() => screen.getByRole('header'));
    expect(header).toBeInTheDocument();
  });

  it('should exist links in the header', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const header = await waitFor(() => screen.getByRole('header'));
    const categoriesLink = within(header).getByText('Categories');
    expect(categoriesLink).toBeInTheDocument();

    const bookmarksLink = within(header).getByText('Bookmarks');
    expect(bookmarksLink).toBeInTheDocument();
  });
});
