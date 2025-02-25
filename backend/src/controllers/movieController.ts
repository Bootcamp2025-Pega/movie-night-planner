import { Request, Response } from 'express';
import knex from '../db/knex';


export const getMovie = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const movie = await knex.raw(`SELECT * FROM movies WHERE title = '${title}'`);
    res.json(movie.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await knex('movies').select('*');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, category, rating, watched } = req.body;
    const [newMovie] = await knex('movies')
      .insert({ title, category, rating, watched })
      .returning('*');
    res.json(newMovie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create movie' });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, category, rating, watched } = req.body;
    const [updatedMovie] = await knex('movies')
      .where({ id })
      .update({ title, category, rating, watched, updated_at: knex.fn.now() })
      .returning('*');
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update movie' });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await knex('movies').where({ id }).del();
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete movie' });
  }
};
