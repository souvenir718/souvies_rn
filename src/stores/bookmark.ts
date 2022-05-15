import {makeAutoObservable, runInAction} from 'mobx';
import {MovieDetail} from '../types';
import {
  getStorage,
  loadKeysInStorage,
  removeItemInStorage,
  setStorage,
} from '../utils/asyncStorageFunc';

class Bookmark {
  bookmarkList: MovieDetail[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setBookmarkList = (movie: MovieDetail, check: boolean) => {
    if (check) {
      this.bookmarkList.push({...movie, comment: '', isComment: false});
      setStorage(movie);
    } else {
      const updateList = this.bookmarkList.filter(item => item.id !== movie.id);
      this.bookmarkList = updateList;
      removeItemInStorage(movie);
    }
  };
  loadBookmarkList = async () => {
    const keys = await loadKeysInStorage();

    keys.map(async key => {
      const bookmarkItem = await getStorage(key);
      runInAction(() => {
        this.bookmarkList.push(bookmarkItem);
      });
    });
  };

  deleteBookmark = (movie: MovieDetail) => {
    const updateList = this.bookmarkList.filter(item => item.id !== movie.id);
    this.bookmarkList = updateList;
    removeItemInStorage(movie);
  };

  setComment = (movie: MovieDetail, comment: string) => {
    const updateItem: MovieDetail = {
      ...movie,
      comment,
      isComment: true,
    };
    const updateList = this.bookmarkList.map(item =>
      item.id === movie.id ? updateItem : item,
    );
    this.bookmarkList = updateList;
    setStorage(updateItem);
  };

  toggleComment = (movie: MovieDetail) => {
    const updateItem: MovieDetail = {
      ...movie,
      isComment: !movie.isComment,
    };
    const updateList = this.bookmarkList.map(item =>
      item.id === movie.id ? updateItem : item,
    );
    this.bookmarkList = updateList;
    setStorage(updateItem);
  };
}

const bookmarkStore = new Bookmark();
export default bookmarkStore;
