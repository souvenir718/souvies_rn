import {makeAutoObservable} from 'mobx';
import {MovieDetail} from '../types';

class Movie {
  bookmarkList: MovieDetail[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setBookmarkList = (movie: MovieDetail, check: boolean) => {
    if (check) {
      this.bookmarkList.push({...movie, comment: '', isComment: false});
    } else {
      const updateList = this.bookmarkList.filter(item => item.id !== movie.id);
      this.bookmarkList = updateList;
    }
  };

  deleteBookmark = (id: number) => {
    const updateList = this.bookmarkList.filter(item => item.id !== id);
    this.bookmarkList = updateList;
  };

  setComment = (id: number, comment: string) => {
    const updateList = this.bookmarkList.map(item =>
      item.id === id ? {...item, comment, isComment: true} : item,
    );
    this.bookmarkList = updateList;
  };
}

const movieStore = new Movie();
export default movieStore;
