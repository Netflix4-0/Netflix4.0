import { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface BookmarksContextValue {
  bookmarks: string[];
  addBookmark: (bookmark: string) => void;
}

export const BookmarkContext = createContext<BookmarksContextValue>({
  bookmarks: [],
  addBookmark: () => {},
});

export const BookmarkProvider = ({ children }: Props) => {
  const [bookmarks, setBookmarks] = useState<string[]>([
    'my first bookmark',
    'my second bookmark',
  ]);

  const addBookmark = (bookmark: string) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
