import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {MovieDetail} from '../types';

type Props = {
  bookmark: MovieDetail;
  setComment: (movie: MovieDetail, text: string) => void;
  deleteBookmark: (movie: MovieDetail) => void;
  toggleComment: (movie: MovieDetail) => void;
};

function BookmarkItem({
  bookmark,
  setComment,
  deleteBookmark,
  toggleComment,
}: Props) {
  const [text, setText] = useState('');

  const writeComment = () => {
    if (text === '') {
      Alert.alert('내용을 입력해주세요!');
      return;
    }
    setComment(bookmark, text);
    setText('');
  };

  const modifyComment = () => {
    setText(bookmark.comment);
    toggleComment(bookmark);
  };

  const deleteItem = () => {
    deleteBookmark(bookmark);
  };

  return (
    <View style={styles.bookmark_container} key={bookmark.id}>
      <TouchableOpacity style={styles.cancel} onPress={deleteItem}>
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
              onPress={writeComment}>
              <Text style={styles.input_btn}>입력</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.comment_container}>
            <Text style={styles.comment}>{bookmark.comment}</Text>
            <TouchableOpacity
              style={styles.comment_modify}
              onPress={modifyComment}>
              <Text style={styles.comment_modify_btn}>수정</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default BookmarkItem;
