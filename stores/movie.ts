// import {observable} from 'mobx';
// import {MovieDetail} from '../types';

// interface Movie {
//   bookMarkList: MovieDetail[];
//   setBookMarkList: (movie: MovieDetail, check: boolean) => void;
// }

// export const movieStore = observable<Movie>({
//   bookMarkList: [],

//   setBookMarkList(movie, check) {
//     if (check) {
//       this.bookMarkList = [...this.bookMarkList, movie];
//     } else {
//       this.bookMarkList = this.bookMarkList.filter(
//         item => item.id !== movie.id,
//       );
//     }
//   },
// });

import {makeAutoObservable} from 'mobx';
import {MovieDetail} from '../types';

class Movie {
  bookmarkList: MovieDetail[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setBookmarkList = (movie: MovieDetail, check: boolean) => {
    if (check) {
      this.bookmarkList.push(movie);
    } else {
      this.bookmarkList = this.bookmarkList.filter(
        item => item.id !== movie.id,
      );
    }
  };

  setComment = (id: number, comment: string) => {
    const newItem = this.bookmarkList.find(item => item.id === id);
    console.log(newItem, comment);
  };
}

const movieStore = new Movie();
export default movieStore;
