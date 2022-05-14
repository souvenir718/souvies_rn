import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BookmarkItem from '../components/BookmarkItem';
import movieStore from '../stores/movie';

type Props = {};

function Bookmark({}: Props) {
  const {bookmarkList, deleteBookmark, setComment, toggleComment, loadStorage} =
    movieStore;

  useEffect(() => {
    loadStorage();
  }, [bookmarkList, loadStorage]);

  if (bookmarkList.length === 0) {
    return (
      <View>
        <Text>현재 찜한 목록이 없습니다.</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.bookmarks_container}>
        {bookmarkList.map(bookmark => (
          <BookmarkItem
            key={bookmark.id}
            bookmark={bookmark}
            setComment={setComment}
            deleteBookmark={deleteBookmark}
            toggleComment={toggleComment}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  bookmarks_container: {
    paddingHorizontal: 10,
  },
});

export default observer(Bookmark);
