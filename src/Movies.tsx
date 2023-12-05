import { useEffect, useState } from "react";
import data from "./data/movies.json";


const Movies = () => {
  const [movies, setMovies] = useState(data)
  const [search, setSearch] = useState<string>("")



  useEffect(() => {
      setMovies(data)
      console.log("state:",movies)
  },[])

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
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.actors.some(actor => actor.toLowerCase().includes(search.toLowerCase()))
        ).map((m, index) => (
          <div key={index}>{m.title}</div>
        ))}
          
        </div>
    )
}


export default Movies;