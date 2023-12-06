import './MovieView.css';

export const MovieView = () => {
  const movie = {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
    rating: 'PG-13',
    actors: ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen'],
    genre: 'Action, Adventure, Drama',
    synopsis:
      "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
    thumbnail:
      'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX380_CR0,14,380,562_.jpg',
    poster: 'https://wallpapercave.com/wp/wp3871647.jpg',
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
          <p>Released in: {movie.year}</p>
          <p>Rating: {movie.rating}</p>
          <p>{movie.synopsis}</p>
          <div className='actors-list'>
            <h3>Actors:</h3>
            <ul>
              {movie.actors.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
          <div className='movie-thumbnail'>
            <img src={movie.thumbnail} alt={movie.title} />
          </div>
        </div>
      </div>
    </>
  );
};
