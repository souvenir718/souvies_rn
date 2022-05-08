import {Observer} from 'mobx-react';
import React from 'react';
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

export default function Bookmark({}: Props) {
  const {bookmarkList} = movieStore;
  return (
    <ScrollView style={styles.container}>
      <Observer
        render={() => (
          <View style={styles.bookmarks_container}>
            {bookmarkList.map(bookmark => (
              <View style={styles.bookmark_container} key={bookmark.id}>
                <Image
                  style={styles.thumnail}
                  source={{uri: `${bookmark.large_cover_image}`}}
                />
                <View style={styles.info_container}>
                  <Text style={styles.info}>{bookmark.title}</Text>
                  <Text style={styles.info}>
                    ⭐ {bookmark.rating}・{bookmark.runtime}
                  </Text>
                  {!bookmark.isComment ? (
                    <View style={styles.input_container}>
                      <TextInput
                        style={styles.input}
                        placeholder="comment!"
                        placeholderTextColor="rgba(0,0,0,0.5)"
                      />
                      <TouchableOpacity style={styles.input_btn_container}>
                        <Text style={styles.input_btn}>입력</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text>{bookmark.comment}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      />
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
    marginBottom: 10,
    flexDirection: 'row',
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
    fontSize: 20,
    marginBottom: 8,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: 'black',
    fontSize: 16,
    paddingVertical: 4,
    width: 160,
    paddingLeft: 10,
    borderRadius: 6,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
  },
  input_btn_container: {
    width: 50,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_btn: {
    color: 'white',
  },
});
