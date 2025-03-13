import { useState } from 'react';
import { Plus, Star, Edit2, Trash2, Check, X } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6">Movie Night Planner</h1>
      
      {/* Add Movie Form */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            placeholder="Movie title"
            className="flex-1 p-2 border rounded"
          />
          <input
            type="text"
            value={newMovie.genre}
            onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
            placeholder="Genre"
            className="w-32 p-2 border rounded"
          />
          <select
            value={newMovie.rating}
            onChange={(e) => setNewMovie({ ...newMovie, rating: Number(e.target.value) })}
            className="w-24 p-2 border rounded"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} Stars</option>
            ))}
          </select>
          <button
            onClick={editingId ? saveEdit : addMovie}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
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
      <div className="space-y-4">
        {movies.map(movie => (
          <div key={movie.id} 
               className={`p-4 rounded-lg border ${movie.watched ? 'bg-green-50' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{movie.genre}</span>
                  <div className="flex items-center">
                    {[...Array(movie.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWatched(movie.id)}
                  className={`p-2 rounded ${movie.watched ? 'bg-green-100' : 'bg-gray-100'}`}
                >
                  {movie.watched ? 'Watched' : 'Mark Watched'}
                </button>
                <button
                  onClick={() => startEditing(movie)}
                  className="p-2 rounded hover:bg-gray-100"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => deleteMovie(movie.id)}
                  className="p-2 rounded hover:bg-gray-100 text-red-500"
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