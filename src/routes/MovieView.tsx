import './MovieView.css';

export const MovieView = () => {
  const movie = {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
    rating: 'PG-13',
    actors: ['Elijah Wood', 'Viggo Mortensen', 'Ian McKellen'],
    genre: 'Action, Adventure, Drama',
    synopsis:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    thumbnail:
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
    isTrending: true,
    poster: 'https://wallpapercave.com/wp/wp4119586.jpg',
  };

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
          <img src={movie.thumbnail} alt={movie.title} />
        </div>
      </div>
    </>
  );
};
