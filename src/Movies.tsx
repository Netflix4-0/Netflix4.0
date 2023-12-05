import { useEffect, useState } from "react";
import data from "./data/movies.json";
import './movies.css';


export const Movies = () => {
  const [search, setSearch] = useState("");
  const moviesByGenre = [...new Set(data.flatMap(movie => movie.genre.split(', ')))];

  useEffect(() => {
      // If you need to perform any actions when the component mounts or data changes, do it here
  }, [data])

  const filteredMovies = search === ''
    ? data
    : data.filter(m => 
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.actors.some(actor => actor.toLowerCase().includes(search.toLowerCase()))
      );

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a movie"
      />

      <div className="movieSection">
        {search === ''
          ? moviesByGenre.map((genre, index) => (
              <div key={index}>
                <h2>{genre}</h2>
                <div className="allMoviesInGenre">
                  {filteredMovies.filter(movie => movie.genre.includes(genre)).map((m, index) => (
                    <div className="movie" key={index}>
                      <p>{m.title}</p>
                      <img className="moviePicture" src={m.poster} alt="movie" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          : filteredMovies.map((m, index) => (
              <div key={index} className="movie">
                <div>{m.title}</div>
                <img className="moviePicture" src={m.poster} alt="movie" />
              </div>
            ))
        }
      </div>
    </div>
  );
};

