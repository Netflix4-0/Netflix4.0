import { useContext } from 'react';
import { BookmarkContext, Movie } from '../context/bookmarkContext';
import moviesData from '../data/movies.json';

export const Bookmarks = () => {
  const { bookmarks, addBookmark, removeBookmark } =
    useContext(BookmarkContext);

  const movies: Movie[] = moviesData as Movie[];

  return (
    <>
      <h1>My bookmarks</h1>
      <h2>All available movies</h2>
      <ul>
        {movies.map(movie => (
          <>
            <li key={movie.poster}>{movie.title}</li>
            <li>
              <button
                onClick={() => addBookmark(movie)}
                disabled={bookmarks.includes(movie)}
              >
                {' '}
                Add bookmark
              </button>
            </li>
          </>
        ))}
      </ul>
      <ul>
        <h2>My bookmarked movies</h2>
        {bookmarks.map(bookmark => (
          <>
            <li key={bookmark.poster}>{bookmark.title}</li>
            <li>
              <button onClick={() => removeBookmark(bookmark)}>
                Remove bookmark
              </button>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};
