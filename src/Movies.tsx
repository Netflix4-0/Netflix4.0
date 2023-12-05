import { useEffect, useState } from "react";
import data from "./data/movies.json";


export const Movies = () => {
  const [movies, setMovies] = useState(data)
  const [search, setSearch] = useState<string>("")



  useEffect(() => {
      setMovies(data)
  },[data])

    return (
        <div>
          <input type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a movie"
          />

{search === '' ? 
        movies.map((m, index) => (
          <div key={index}>{m.title}</div>
        )) 
        : 
        movies.filter(m => 
          // this searches for the title of the movies
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          // this searches for the actors of the movies, if the search is found "some" will return true & the movie will be rendered
          m.actors.some(actor => actor.toLowerCase().includes(search.toLowerCase()))
        ).map((m, index) => (
          <div key={index}>{m.title}</div>
        ))}
        </div>
    )
}

