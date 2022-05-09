import {makeAutoObservable, runInAction} from 'mobx';
import {MovieDetail} from '../types';
import AsyncStorage from '@react-native-community/async-storage';

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
    this.setStorage(this.bookmarkList);
  };

  loadStorage = async () => {
    await AsyncStorage.getItem('bookmark', (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (typeof result === 'string') {
          const loadList: MovieDetail[] = <MovieDetail[]>JSON.parse(result);
          runInAction(() => {
            this.bookmarkList = loadList;
          });
        }
      }
    });
  };

  deleteBookmark = (id: number) => {
    const updateList = this.bookmarkList.filter(item => item.id !== id);
    this.bookmarkList = updateList;
    this.setStorage(this.bookmarkList);
  };

  setComment = (id: number, comment: string) => {
    const updateList = this.bookmarkList.map(item =>
      item.id === id ? {...item, comment, isComment: true} : item,
    );
    this.bookmarkList = updateList;
    this.setStorage(this.bookmarkList);
  };

  toggleComment = (id: number) => {
    const updateList = this.bookmarkList.map(item =>
      item.id === id ? {...item, isComment: !item.isComment} : item,
    );
    this.bookmarkList = updateList;
    this.setStorage(this.bookmarkList);
  };

  setStorage = (newList: MovieDetail[]) => {
    AsyncStorage.setItem('bookmark', JSON.stringify(newList));
  };
}

const movieStore = new Movie();
export default movieStore;
