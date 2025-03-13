import { useState } from 'react';
import { Plus, Star, Edit2, Trash2, Check } from 'lucide-react';
import styles from './MoviePlanner.module.css';

const MovieNightPlanner = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', genre: '', rating: 5, watched: false });
  const [editingId, setEditingId] = useState(null);

  const addMovie = () => {
    if (newMovie.title.trim()) {
      setMovies([...movies, { ...newMovie, id: Date.now() }]);
      setNewMovie({ title: '', genre: '', rating: 5, watched: false });
    }
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const toggleWatched = (id) => {
    setMovies(movies.map(movie => 
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    ));
  };

  const startEditing = (movie) => {
    setEditingId(movie.id);
    setNewMovie(movie);
  };

  const saveEdit = () => {
    setMovies(movies.map(movie => 
      movie.id === editingId ? { ...newMovie, id: editingId } : movie
    ));
    setEditingId(null);
    setNewMovie({ title: '', genre: '', rating: 5, watched: false });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Movie Night Planner</h1>
      
      {/* Add Movie Form */}
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <input
            type="text"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            placeholder="Movie title"
            className={styles.titleInput}
          />
          <input
            type="text"
            value={newMovie.genre}
            onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
            placeholder="Genre"
            className={styles.genreInput}
          />
          <select
            value={newMovie.rating}
            onChange={(e) => setNewMovie({ ...newMovie, rating: Number(e.target.value) })}
            className={styles.ratingSelect}
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} Stars</option>
            ))}
          </select>
          <button
            onClick={editingId ? saveEdit : addMovie}
            className={styles.actionButton}
          >
            {editingId ? (
              <>
                <Check size={18} />
                Save
              </>
            ) : (
              <>
                <Plus size={18} />
                Add Movie
              </>
            )}
          </button>
        </div>
      </div>

      {/* Movie List */}
      <div className={styles.moviesList}>
        {movies.map(movie => (
          <div key={movie.id} 
               className={`${styles.movieCard} ${movie.watched ? styles.movieCardWatched : styles.movieCardUnwatched}`}>
            <div className={styles.movieContent}>
              <div className={styles.movieInfo}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <div className={styles.movieDetails}>
                  <span>{movie.genre}</span>
                  <div className={styles.movieRating}>
                    {[...Array(movie.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => toggleWatched(movie.id)}
                  className={`${styles.watchedButton} ${movie.watched ? styles.watchedButtonActive : styles.watchedButtonInactive}`}
                >
                  {movie.watched ? 'Watched' : 'Mark Watched'}
                </button>
                <button
                  onClick={() => startEditing(movie)}
                  className={styles.editButton}
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => deleteMovie(movie.id)}
                  className={styles.deleteButton}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieNightPlanner;