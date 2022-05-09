import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import movieStore from '../stores/movie';

type Props = {};

function Bookmark({}: Props) {
  const {bookmarkList, deleteBookmark, setComment, toggleComment} = movieStore;
  const [text, setText] = useState<string>('');

  const writeComment = (id: number) => {
    setComment(id, text);
    setText('');
  };
  const deleteItem = (id: number) => {
    deleteBookmark(id);
  };
  const modifyComment = (id: number, comment: string) => {
    setText(comment);
    toggleComment(id);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bookmarks_container}>
        {bookmarkList.map(bookmark => (
          <View style={styles.bookmark_container} key={bookmark.id}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => deleteItem(bookmark.id)}>
              <Text style={styles.cancel_btn}>❌</Text>
            </TouchableOpacity>

            <Image
              style={styles.thumnail}
              source={{uri: `${bookmark.large_cover_image}`}}
            />
            <View style={styles.info_container}>
              <Text style={[styles.info, styles.title]}>{bookmark.title}</Text>
              <Text style={styles.info}>
                ⭐ {bookmark.rating}・{bookmark.runtime}분
              </Text>
              {!bookmark.isComment ? (
                <View style={styles.input_container}>
                  <TextInput
                    style={styles.input}
                    placeholder="comment here!"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    value={text}
                    onChangeText={setText}
                  />
                  <TouchableOpacity
                    style={styles.input_btn_container}
                    onPress={() => writeComment(bookmark.id)}>
                    <Text style={styles.input_btn}>입력</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.comment_container}>
                  <Text style={styles.comment}>{bookmark.comment}</Text>
                  <TouchableOpacity
                    style={styles.comment_modify}
                    onPress={() =>
                      modifyComment(bookmark.id, bookmark.comment)
                    }>
                    <Text style={styles.comment_modify_btn}>수정</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
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
  bookmark_container: {
    position: 'relative',
    borderRadius: 3,
    padding: 5,
    backgroundColor: '#66bdf7e6',
    marginBottom: 10,
    flexDirection: 'row',
  },
  cancel: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  cancel_btn: {
    fontSize: 18,
  },
  thumnail: {
    width: '35%',
    height: 220,
  },
  info_container: {
    width: '60%',
    paddingLeft: 20,
    paddingTop: 50,
  },
  info: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
  },
  title: {
    fontWeight: '700',
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: 'black',
    fontSize: 14,
    paddingVertical: 4,
    flex: 3,
    paddingLeft: 10,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
  },
  input_btn_container: {
    flex: 1,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_btn: {
    color: 'white',
  },
  comment_container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  comment: {
    color: 'black',
    fontSize: 18,
    fontStyle: 'italic',
    flex: 6,
  },
  comment_modify: {
    backgroundColor: 'black',
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    flex: 1,
    textAlign: 'center',
  },
  comment_modify_btn: {
    color: 'white',
  },
});

export default observer(Bookmark);
