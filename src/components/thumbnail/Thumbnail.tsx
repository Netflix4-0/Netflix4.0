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

    if (bookmarks.includes(movie)) {
      removeBookmark(movie);
    } else {
      addBookmark(movie);
    }
  };

  const bookmarkedMovie = bookmarks.find(movie => movie.title === title);

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
          {bookmarkedMovie ? (
            <button
              className='bookmarkButton'
              onClick={e => handleBookmark(e, movieData)}
            >
              <i className='fa-sharp fa-solid fa-bookmark fa-2xl bookmarkIcon'></i>
            </button>
          ) : (
            <button
              className='bookmarkButton'
              onClick={e => handleBookmark(e, movieData)}
            >
              <i className='fa-sharp fa-regular fa-bookmark fa-2xl bookmarkIcon'></i>
            </button>
          )}
          <img
            src={thumbnail}
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
