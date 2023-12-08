import { useContext, useEffect, useState } from 'react';
import { Thumbnail } from '../components/index.ts';
import { BookmarkContext } from '../context/bookmarkContext';
import { movies } from '../data/index.ts';
import { MovieData } from '../types/types';

export const Bookmarks = () => {
  const { bookmarks, addBookmark, removeBookmark } =
    useContext(BookmarkContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookmarks) {
      setLoading(false);
    }
  }, [bookmarks]);

  movies as MovieData[];

  return (
    <>
      <h1>Bookmarks</h1>
      <h2>My bookmarks</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          padding: '10px 25px',
        }}
      >
        {' '}
        {bookmarks.map((bookmark, index) => (
          <Thumbnail
            key={index}
            thumbnail={bookmark.thumbnail}
            title={bookmark.title}
            releaseYear={bookmark.year}
            rating={bookmark.rating}
            movieData={bookmark}
          />
        ))}
      </div>
    </>
  );
};
