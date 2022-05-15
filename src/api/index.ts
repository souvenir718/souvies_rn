import axios from 'axios';
import {YTSMovieList} from '../types';

export const getMovies = async (genre: string) => {
  return await axios
    .get(
      `https://yts.mx/api/v2/list_movies.json?limit=10&genre=${genre}&sort_by=rating&order_by=desc`,
    )
    .then(({data}) => {
      const movieList = data.data.movies;
      if (movieList[0].rating === 0) {
        movieList.sort(function (a: YTSMovieList, b: YTSMovieList) {
          return b.year - a.year;
        });
        return movieList;
      } else {
        return movieList;
      }
    })
    .catch(err => console.log(err));
};

export const getMovie = async (id: number) => {
  return axios
    .get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    .then(({data}) => {
      return data.data.movie;
    });
};
