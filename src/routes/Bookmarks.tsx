import { useContext } from 'react';
import { Thumbnail } from '../components/index.ts';
import { BookmarkContext } from '../context/bookmarkContext';

export const Bookmarks = () => {
  const { bookmarks } = useContext(BookmarkContext);
  return (
    <>
      <h1
        style={{
          marginTop: '4rem',
        }}
      >
        Bookmarks
      </h1>
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
