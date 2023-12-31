import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BookmarkContext } from '../../context';
import { MovieData } from '../../types/types';
import '../thumbnail/Thumbnail.css';

interface IThumbnail {
  thumbnail: string;
  title: string;
  releaseYear: number;
  rating: string;
  movieData: MovieData;
}

export const Thumbnail = ({
  thumbnail,
  title,
  releaseYear,
  rating,
  movieData,
}: IThumbnail) => {
  const { bookmarks, addBookmark, removeBookmark } =
    useContext(BookmarkContext);

  const handleBookmark = (e: React.MouseEvent, movie: MovieData) => {
    e.preventDefault();

    if (bookmarks.some(b => b.title === movie.title)) {
      removeBookmark(movie);
    } else {
      addBookmark(movie);
    }
  };

  const bookmarkedMovie = (movie: MovieData) => {
    return bookmarks.some(b => b.title === movie.title);
  };

  return (
    <NavLink
      to={`/movie/${title}`}
      style={{ textDecoration: 'none', color: '#FFF' }}
    >
      <div role='movie' className='thumbnailContainer'>
        <div>
          <div className='subTitle'>
            <h4>{releaseYear}</h4>
            <h4>{rating}</h4>
          </div>
        </div>
        <div className='thumbnail'>
          {bookmarkedMovie(movieData) ? (
            <button
              title='Bookmark'
              className={`bookmarkButton ${
                bookmarkedMovie(movieData) ? 'bookmarked' : ''
              }`}
              onClick={e => handleBookmark(e, movieData)}
            >
              <i className='fa-sharp fa-solid fa-bookmark fa-2xl'></i>
            </button>
          ) : (
            <button
              title='Bookmark'
              className='bookmarkButton'
              onClick={e => handleBookmark(e, movieData)}
            >
              <i className='fa-sharp fa-solid fa-bookmark fa-2xl'></i>
            </button>
          )}
          <img
            src={thumbnail}
            alt={title}
            onError={event => {
              const target = event.target as HTMLImageElement;
              target.src =
                'https://github.com/Netflix4-0/Netflix4.0/assets/117076586/0628211e-81a5-482f-84c9-b4cf936ef61b';
            }}
          />
        </div>
        <h3 className='title'>{title}</h3>
      </div>
    </NavLink>
  );
};
