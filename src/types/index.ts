export type YTSMovieList = {
  id: number;
  title: string;
  year: number;
  large_cover_image: string;
  rating: number;
};

export type YTSMovieDetail = YTSMovieList & {
  genres: string[];
  background_image: string;
  runtime: number;
  url: string;
};
export type MovieDetail = YTSMovieDetail & {
  comment: string;
  isComment: boolean;
};
