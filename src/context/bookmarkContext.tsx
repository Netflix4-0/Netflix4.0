import { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface BookmarksContextValue {
  bookmarks: Movie[];
  addBookmark: (bookmark: Movie) => void;
  removeBookmark: (bookmark: Movie) => void;
}

export interface Movie {
  title: string;
  year: number;
  rating: Rating;
  actors: string[];
  genre: string;
  synopsis: string;
  thumbnail: string;
  poster?: string;
  isTrending?: boolean;
}

export enum Rating {
  NotRated = 'Not Rated',
  PG = 'PG',
  PG13 = 'PG-13',
  R = 'R',
}

export const BookmarkContext = createContext<BookmarksContextValue>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
});

export const BookmarkProvider = ({ children }: Props) => {
  const [bookmarks, setBookmarks] = useState<Movie[]>([]);

  const addBookmark = (bookmark: Movie) => {
    if (bookmarks.includes(bookmark)) return;
    setBookmarks([...bookmarks, bookmark]);
  };

  const removeBookmark = (bookmark: Movie) => {
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
