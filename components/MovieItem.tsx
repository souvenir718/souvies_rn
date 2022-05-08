import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {cutStr} from '../utils';
import {Movie} from './Movies';

type Props = {
  movie: Movie;
  goDetail: (id: number) => void;
  idx: number;
};

export default function MovieItem({movie, goDetail, idx}: Props) {
  return (
    <TouchableOpacity onPress={() => goDetail(movie.id)} key={movie.id}>
      <View style={styles.movie_container}>
        <Text style={styles.movie_rank}>{idx + 1}</Text>
        <Image
          style={styles.thumnail}
          source={{
            uri: `${movie.large_cover_image}`,
          }}
        />
        <Text style={styles.movie_title}>{cutStr(movie.title)}</Text>
      </View>
    </TouchableOpacity>
  );
}

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
