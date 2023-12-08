import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../App';
import { Header } from '../components';
import { CategoryPage } from '../routes/CategoryPage';

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

  it('make sure that the links in the header work', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/categories' element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const header = await waitFor(() => screen.getByRole('header'));
    const categoriesLink = within(header).getByRole('link', {
      name: 'Categories',
    });
    expect(categoriesLink).toBeInTheDocument();
    user.click(categoriesLink);
    await waitFor(() => expect(window.location.pathname).toBe('/categories'));

    const genreButtons = screen.getAllByRole('button');
    expect(genreButtons).toHaveLength(genreButtons.length);
  });
});
