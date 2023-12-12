import { createContext } from 'react';
import { useSessionStorageState } from '../hooks/useSessionStorage';
import { MovieData } from '../types/types';

interface Props {
  children: React.ReactNode;
}

interface BookmarksContextValue {
  bookmarks: MovieData[];
  addBookmark: (bookmark: MovieData) => void;
  removeBookmark: (bookmark: MovieData) => void;
}

export const BookmarkContext = createContext<BookmarksContextValue>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
});

export const BookmarkProvider = ({ children }: Props) => {
  const [bookmarks, setBookmarks] = useSessionStorageState<MovieData[]>(
    [],
    'bookmarkedMovies'
  );

  const addBookmark = (bookmark: MovieData) => {
    if (bookmarks.some(b => b.title === bookmark.title)) {
      return;
    }
    setBookmarks([...bookmarks, bookmark]);
  };

  const removeBookmark = (bookmark: MovieData) => {
    // Filter out the bookmark to be removed based on custom equality check
    setBookmarks(bookmarks.filter(b => !areMoviesEqual(b, bookmark)));
  };

  /**
   * Checks if two movie objects are equal based on their titles.
   * This function is used to determine equality when removing a movie from bookmarks.
   *
   * @param {MovieData} movie1 - The first movie object.
   * @param {MovieData} movie2 - The second movie object.
   * @returns {boolean} True if the titles of the movies are the same, indicating equality.
   */
  const areMoviesEqual = (movie1: MovieData, movie2: MovieData) => {
    return movie1.title === movie2.title;
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
