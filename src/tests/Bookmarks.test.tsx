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

    const category = await screen.findByText('Drama');
    expect(category).toBeInTheDocument();
    const movieSection = category.closest('div');
    if (!movieSection) {
      throw new Error('Movie section element not found');
    }

    const movieTitle = within(movieSection).getByText(
      'The Shawshank Redemption'
    );
    const movieParent = movieTitle.closest('div');

    if (!movieParent) {
      throw new Error('Movie parent element not found');
    }

    const bookmarkButton = within(movieParent).getByRole('button');
    const bookmarkIcon = bookmarkButton.querySelector('i');

    // Checks that the bookmark icon is not regular which means not added to bookmarks
    await expect(bookmarkIcon).toHaveClass('fa-regular');

    await user.click(bookmarkButton);

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
      'The Shawshank Redemption'
    );

    expect(bookmarkTitle).toContainHTML('The Shawshank Redemption');
  });

  test('User can remove a bookmark', async () => {
    render(
      <BookmarkProvider>
        <Bookmarks />
      </BookmarkProvider>
    );

    const user = userEvent.setup();

    // Finds the Element which cointains the text 'Inception'
    // and the parent element it's in
    const inceptionElement = await screen.findByText('Inception');
    const parentElement = inceptionElement.closest('p');

    if (!parentElement) {
      throw new Error('Parent element not found');
    }

    // Find the "Add bookmark" button within the parentElement
    const addBookmarkButton = within(parentElement).getByText('Add bookmark');

    await user.click(addBookmarkButton);

    // Checks theres now two elements with the text 'Inception'
    let inceptionElements = await screen.findAllByText('Inception');
    expect(inceptionElements.length).toBe(2);

    // Find the "Remove bookmark"
    const removeBookmarkButton = await screen.findByRole('button', {
      name: 'Remove bookmark',
    });
    expect(removeBookmarkButton).toBeInTheDocument();

    // Clicks the remove bookmark button
    await user.click(removeBookmarkButton);

    // Now the button does not exist in the element
    expect(removeBookmarkButton).not.toBeInTheDocument();

    // Now there's only one element with the text 'Inception'
    inceptionElements = await screen.findAllByText('Inception');
    expect(inceptionElements.length).toBe(1);
  });

  test.only('The user can remove a bookmark', async () => {
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

    // Finds category and  locates the movie for the test
    const category = await screen.findByText('Drama');
    const movieSection = category.closest('div');
    if (!movieSection) {
      throw new Error('Movie section element not found');
    }

    const movieTitle = within(movieSection).getByText(
      'The Shawshank Redemption'
    );
    const movieParent = movieTitle.closest('div');

    if (!movieParent) {
      throw new Error('Movie parent element not found');
    }

    const bookmarkButton = within(movieParent).getByRole('button');
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
    expect(bookmarksDiv).toContainHTML('The Shawshank Redemption');

    // Clicks the button to remove the bookmark
    await user.click(bookmarkedButton);

    // Checks to it's gone from the bookmarks page
    expect(bookmarksDiv).not.toContainHTML('The Shawshank Redemption');
  });

  test('Bookmarks persist in session storage', async () => {
    // Mock sessionStorage
    const sessionStorageMock = (function () {
      let store: { [key: string]: string } = {};
      return {
        getItem(key: string) {
          const storedValue = store[key];
          return storedValue ? JSON.parse(storedValue) : null;
        },
        setItem(key: string, value: any) {
          store[key] = JSON.stringify(value);
        },
        clear() {
          store = {};
        },
      };
    })();
    Object.defineProperty(window, 'sessionStorage', {
      value: sessionStorageMock,
    });

    render(
      <BookmarkProvider>
        <Bookmarks />
      </BookmarkProvider>
    );

    const user = userEvent.setup();

    // Checks that the session storage is an empty array at the start
    let sessionBookmarks = JSON.parse(
      sessionStorage.getItem('bookmarkedMovies') || '[]'
    );
    expect(sessionBookmarks).toEqual([]);

    const firstMovieElement = await screen.findByText(
      'The Shawshank Redemption'
    );
    const parentElement = firstMovieElement.closest('p');

    if (!parentElement) {
      throw new Error('Parent element not found');
    }

    const addBookmarkButton = within(parentElement).getByText('Add bookmark');
    await user.click(addBookmarkButton);

    // Gets the first movie from our dataset, which should be The Shawshank Redemption
    const movie = movieData[0];

    // Check that the bookmark is in session storage
    sessionBookmarks = JSON.parse(
      sessionStorage.getItem('bookmarkedMovies') || '[]'
    );
    expect(sessionBookmarks).toContainEqual(movie);

    const removeBookmarkButton = await screen.findByRole('button', {
      name: 'Remove bookmark',
    });
    await user.click(removeBookmarkButton);

    // Check that the bookmark is not in session storage anymore
    sessionBookmarks = JSON.parse(
      sessionStorage.getItem('bookmarkedMovies') || '[]'
    );
    expect(sessionBookmarks).toEqual([]);
  });
});
