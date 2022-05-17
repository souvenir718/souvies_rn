import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {YTSMovieList} from '../types';
import {omitTitle} from '../utils';

type Props = {
  movie: YTSMovieList;
  goDetail: (id: number) => void;
  idx: number;
};

const MovieItem = React.memo(({movie, goDetail, idx}: Props) => {
  const onPress = () => {
    goDetail(movie.id);
  };
  return (
    <TouchableOpacity onPress={onPress} key={movie.id}>
      <View style={styles.movie_container}>
        <Text style={styles.movie_rank}>{idx + 1}</Text>
        <Image
          style={styles.thumnail}
          source={{
            uri: `${movie.large_cover_image}`,
          }}
        />
        <Text style={styles.movie_title}>{omitTitle(movie.title)}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  movie_container: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  movie_rank: {
    position: 'absolute',
    top: 5,
    left: 5,
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    zIndex: 3,
    elevation: 3,
    paddingHorizontal: 2,
    backgroundColor: 'grey',
  },
  movie_title: {
    color: 'black',
  },
  thumnail: {
    height: 225,
    width: 150,
  },
});

export default MovieItem;
