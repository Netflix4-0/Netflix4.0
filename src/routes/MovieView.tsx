import { useParams } from 'react-router-dom';
import { movies } from '../data';
import ErrorPage from './ErrorPage';
import './MovieView.css';

export const MovieView = () => {
  const params = useParams();

  const movie = movies.find(movie => movie.title === params.id);

  if (!movie) {
    return <ErrorPage />;
  }

  const genres = movie.genre.split(', ');

  return (
    <>
      <div className='movie-view-container'>
        <div
          className='movie-poster'
          style={{
            backgroundImage: `url(${movie.poster})`,
          }}
        />
        <div className='movie-details'>
          {movie.isTrending && (
            <div className='trending-text'>Trending Now</div>
          )}
          <h2>{movie.title}</h2>
          <div className='genres-list'>
            <div className='genre-container'>
              {genres.map((genre, index) => (
                <div key={index} className='genre-item'>
                  {genre}
                </div>
              ))}
            </div>
          </div>
          <div className='movie-info'>
            <p>Released in: {movie.year}</p>
            <p>Rating: {movie.rating}</p>
          </div>
          <p className='movie-synopsis'>{movie.synopsis}</p>
          <div className='actors-list'>
            <h3>Actors:</h3>
            <ul>
              {movie.actors.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='movie-thumbnail'>
          <img
            src={movie.thumbnail}
            alt={movie.title}
            onError={event => {
              const target = event.target as HTMLImageElement;
              target.src =
                'https://github.com/Netflix4-0/Netflix4.0/assets/117076586/0628211e-81a5-482f-84c9-b4cf936ef61b';
            }}
          />
        </div>
      </div>
    </>
  );
};
