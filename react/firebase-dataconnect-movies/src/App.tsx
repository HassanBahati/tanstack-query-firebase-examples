import {
  useConnectQuery,
  useConnectMutation,
} from "@tanstack-query-firebase/react";
import "./App.css";
import { listMoviesRef, createMovieRef } from "@firebasegen/default-connector";
import { useState } from "react";

function App() {
  const { data, isLoading, isSuccess, isError } = useConnectQuery(
    listMoviesRef()
  );

  const [movie, setMovie] = useState({
    title: "",
    imageUrl: "",
    genre: "",
  });

  const [error, setError] = useState("");

  // Mutation to add a new movie
  const createMovieMutation = useConnectMutation(createMovieRef, {
    invalidate: [listMoviesRef()],
    onSuccess: () => {
      setMovie({ title: "", imageUrl: "", genre: "" });
    },
    onError: (error) => {
      setError("Failed to add movie. Please try again.");
      console.error(error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!movie.title || !movie.imageUrl || !movie.genre) {
      setError("All fields are required.");
      return;
    }

    setError("");
    createMovieMutation.mutate(movie);
  };

  return (
    <div>
      <h1>TanStack Query Firebase + Data Connect</h1>

      <div className="main-container">
        <div className="movie-form">
          <h2>Add a New Movie</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={movie.title}
                onChange={handleInputChange}
                placeholder="Movie Title"
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                name="imageUrl"
                value={movie.imageUrl}
                onChange={handleInputChange}
                placeholder="Movie Image URL"
              />
            </div>
            <div>
              <label>Genre:</label>
              <input
                type="text"
                name="genre"
                value={movie.genre}
                onChange={handleInputChange}
                placeholder="Movie Genre"
              />
            </div>
            <button type="submit" disabled={createMovieMutation.isPending}>
              {createMovieMutation.isPending ? "Adding..." : "Add Movie"}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Sorry, an error occurred.</p>}
          {isSuccess && data.movies.length > 0 ? (
            <div className="movies-grid">
              {data.movies.map((movie, index) => (
                <div className="movie-card" key={index}>
                  <img src={movie.imageUrl} alt={movie.title} />
                  <h3>{movie.title}</h3>
                  <p>Genre: {movie.genre}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No movies found!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
