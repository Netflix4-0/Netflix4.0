import { Fragment, useContext } from 'react';
import { BookmarkContext } from '../context/bookmarkContext';
import { movies } from '../data/index.ts';
import { MovieData } from '../types/types';

export const Bookmarks = () => {
  const { bookmarks, addBookmark, removeBookmark } =
    useContext(BookmarkContext);

  movies as MovieData[];

  return (
    <div>
      <h1>Bookmarks</h1>
      <h2>All available movies</h2>
      {movies.map((movie, index) => (
        <Fragment key={index}>
          <p>
            {movie.title}
            <button
              onClick={() => addBookmark(movie)}
              disabled={bookmarks.includes(movie)}
            >
              {' '}
              Add bookmark
            </button>
          </p>
        </Fragment>
      ))}
      <h2>My bookmarks</h2>
      {bookmarks.map((bookmark, index) => (
        <Fragment key={index}>
          <p>
            {bookmark.title}
            <button onClick={() => removeBookmark(bookmark)}>
              Remove bookmark
            </button>
          </p>
        </Fragment>
      ))}
    </div>
  );
};
