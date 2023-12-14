import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, test } from 'vitest';
import { Header } from '../components';
import { BookmarkProvider } from '../context/bookmarkContext';
import movieData from '../data/movies.json';
import { Bookmarks } from '../routes/Bookmarks';
import { CategoryPage } from '../routes/CategoryPage';
import { HomePage } from '../routes/HomePage';

afterEach(() => {
  sessionStorage.clear();
});

// Since the users can not add bookmarks on the bookmarks page this test is done on the category page
describe('Bookmark related tests:', () => {
  test('User can add a bookmark', async () => {
    render(
      <MemoryRouter>
        <BookmarkProvider>
          <CategoryPage />
        </BookmarkProvider>
      </MemoryRouter>
    );

    const user = userEvent.setup();

    // Finds the Element which cointains the text 'Inception'
    // and the parent element it's in
    const inceptionElement = await screen.findByText('Inception');
    const parentElement = inceptionElement.closest('div');

    if (!parentElement) {
      throw new Error('Parent element not found');
    }

    // Find the "Add bookmark" button within the parentElement
    const addBookmarkButton = within(parentElement).getByRole('button');

    await user.click(addBookmarkButton);

    // Gets the icon representing the bookmark
    const bookmarkIcon = addBookmarkButton.querySelector('i');

    // Checks that the bookmark icon is solid which means added to bookmarks
    await expect(bookmarkIcon).toHaveClass('fa-solid');

    // Also double checks by checking that the bookmark icon is not in the "not added" state
    await expect(bookmarkIcon).not.toHaveClass('fa-regular');
  });

  test('The user can view added bookmarks on the bookmarks page', async () => {
    render(
      <MemoryRouter>
        <BookmarkProvider>
          <Header />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path='bookmarks' element={<Bookmarks />} />
          </Routes>
        </BookmarkProvider>
      </MemoryRouter>
    );
    const user = userEvent.setup();

    let heading = screen.queryByRole('heading', {
      name: /bookmarks/i,
      level: 1,
    });

    // Checks that the bookmarks page is not rendered yet
    expect(heading).not.toBeInTheDocument();

    const rec = await screen.findByText('The Godfather: Part II');
    expect(rec).toBeInTheDocument();

    const movieParent = rec.closest('div');

    if (!movieParent) {
      throw new Error('Movie parent element not found');
    }

    const bookmarkButton = within(movieParent).getByRole('button', {
      name: /Bookmark/i,
    });

    await user.click(bookmarkButton);

    await expect(bookmarkButton).toHaveTextContent('Bookmarked');

    // Find the link and navigate to the bookmarks page
    const bookmarksMenuLink = screen.getByRole('link', { name: /Bookmarks/i });
    await user.click(bookmarksMenuLink);

    heading = screen.getByRole('heading', {
      name: /Bookmarks/i,
      level: 1,
    });

    // Checks that we're on the bookmarks page
    expect(heading).toBeInTheDocument();
    const bookmarksDiv = heading.closest('div');

    if (!bookmarksDiv) {
      throw new Error('Bookmarks div not found');
    }

    // Find the bookmarked movie title
    const bookmarkTitle = within(bookmarksDiv).getByText(
      'The Godfather: Part II'
    );

    expect(bookmarkTitle).toContainHTML('The Godfather: Part II');
  });

  test('The user can remove a bookmark', async () => {
    render(
      <MemoryRouter>
        <BookmarkProvider>
          <Header />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path='bookmarks' element={<Bookmarks />} />
          </Routes>
        </BookmarkProvider>
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const rec = await screen.findByText('The Godfather: Part II');
    expect(rec).toBeInTheDocument();

    const movieParent = rec.closest('div');

    if (!movieParent) {
      throw new Error('Movie parent element not found');
    }

    const bookmarkButton = within(movieParent).getByRole('button', {
      name: /Bookmark/i,
    });

    await user.click(bookmarkButton);

    // Navigate to the bookmarks page
    const bookmarksMenuLink = screen.getByRole('link', { name: /Bookmarks/i });
    await user.click(bookmarksMenuLink);

    const heading = screen.getByRole('heading', {
      name: /Bookmarks/i,
      level: 1,
    });
    const bookmarksDiv = heading.closest('div');

    if (!bookmarksDiv) {
      throw new Error('Bookmarks div not found');
    }

    const bookmarkedButton = within(bookmarksDiv).getByRole('button');

    // Checks that the bookmarked movie is in the bookmarks page
    expect(bookmarksDiv).toContainHTML('The Godfather: Part II');

    // Clicks the button to remove the bookmark
    await user.click(bookmarkedButton);

    // Checks to it's gone from the bookmarks page
    expect(bookmarksDiv).not.toContainHTML('The Godfather: Part II');
  });

  // Since the users can not add bookmarks on the bookmarks page this test is done on the category page
  test.only('Bookmarks persist in session storage', async () => {
    render(
      <MemoryRouter>
        <BookmarkProvider>
          <CategoryPage />
        </BookmarkProvider>
      </MemoryRouter>
    );

    const user = userEvent.setup();

    // Checks that the session storage is empty
    let sessionBookmarks = JSON.parse(
      sessionStorage.getItem('bookmarkedMovies') || '[]'
    );
    expect(sessionBookmarks).toEqual([]);

    // Finds the Element which cointains the text 'Inception'
    // and the parent element it's in
    const inceptionElement = await screen.findByText(
      'The Shawshank Redemption'
    );
    const parentElement = inceptionElement.closest('div');

    if (!parentElement) {
      throw new Error('Parent element not found');
    }

    // Find the "Add bookmark" button within the parentElement
    const addBookmarkButton = within(parentElement).getByRole('button');

    await user.click(addBookmarkButton);

    // Gets the first movie from our dataset, which should be The Shawshank Redemption
    const movie = movieData[0];

    // Check that the bookmark is in session storage
    sessionBookmarks = JSON.parse(
      sessionStorage.getItem('bookmarkedMovies') || '[]'
    );
    expect(sessionBookmarks).toContainEqual(movie);

    const removeBookmarkButton =
      await within(parentElement).getByRole('button');
    await user.click(removeBookmarkButton);

    // Check that the bookmark is not in session storage anymore
    sessionBookmarks = JSON.parse(
      sessionStorage.getItem('bookmarkedMovies') || '[]'
    );
    expect(sessionBookmarks).toEqual([]);
  });
});
