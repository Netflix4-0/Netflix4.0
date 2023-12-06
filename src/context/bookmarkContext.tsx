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
    if (bookmarks.includes(bookmark)) return;
    setBookmarks([...bookmarks, bookmark]);
  };

  const removeBookmark = (bookmark: MovieData) => {
    setBookmarks(bookmarks.filter(b => b !== bookmark));
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
