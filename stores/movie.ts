import {makeAutoObservable} from 'mobx';
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
    AsyncStorage.setItem('bookmark', JSON.stringify(this.bookmarkList));
  };

  loadStorage = () => {
    AsyncStorage.getItem('bookmark', async (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (typeof result === 'string') {
          console.log(JSON.parse(result).length);
        }
      }
    });
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

  toggleComment = (id: number) => {
    const updateList = this.bookmarkList.map(item =>
      item.id === id ? {...item, isComment: !item.isComment} : item,
    );
    this.bookmarkList = updateList;
  };
}

const movieStore = new Movie();
export default movieStore;
