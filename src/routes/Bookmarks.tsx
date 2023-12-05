import { useContext } from 'react';
import { BookmarkContext } from '../context/bookmarkContext';
import moviesData from '../data/movies.json';

export const Bookmarks = () => {
  const { bookmarks, addBookmark } = useContext(BookmarkContext);

  const movies = moviesData;

  return (
    <>
      <h1>My bookmarks</h1>
      <h2>All available movies</h2>
      <ul>
        {movies.map(movie => (
          <>
            <li key={movie.poster}>{movie.title}</li>
            <li>
              <button onClick={() => addBookmark(movie.title)}>
                Add bookmark
              </button>
            </li>
          </>
        ))}
      </ul>
      <ul>
        {bookmarks.map(bookmark => (
          <li key={bookmark}>{bookmark}</li>
        ))}
      </ul>
    </>
  );
};
