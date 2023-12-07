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
    const categoriesLink = within(header).getByRole('link', {
      name: 'Categories',
    });
    expect(categoriesLink).toBeInTheDocument();

    const bookmarksLink = within(header).getByRole('link', {
      name: 'Bookmarks',
    });
    expect(bookmarksLink).toBeInTheDocument();
  });

  it('should exist a logo in the header', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const header = await waitFor(() => screen.getByRole('header'));
    const logo = within(header).getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });
});
