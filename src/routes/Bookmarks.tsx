import { useContext } from 'react';
import { Thumbnail } from '../components/index.ts';
import { BookmarkContext } from '../context/bookmarkContext';
import './Bookmarks.css';

export const Bookmarks = () => {
  const { bookmarks } = useContext(BookmarkContext);

  if (bookmarks.length === 0) {
    return (
      <div className='no-bookmarks-container'>
        <img
          src='https://github.com/Netflix4-0/Netflix4.0/assets/116897452/d1c3e812-51fb-428c-b8fd-0591054bb00a'
          alt='Illustration of a sad bookmark'
        />
        <h2>No Bookmarks Added</h2>
      </div>
    );
  }

  return (
    <div className='bookmarks-container'>
      <h2>Bookmarks</h2>
      <div className='bookmarked-movies'>
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
    </div>
  );
};
