import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {getMovies} from '../api';
import {RootStackNavigationProp} from '../navigation/RootStack';
import {YTSMovieList} from '../types';
import Loading from './Loading';
import MovieItem from './MovieItem';

type Props = {
  genre: string;
};

export default function Movies({genre}: Props) {
  const [movies, setMovies] = useState<YTSMovieList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const goDetail = useCallback(
    (id: number) => {
      navigation.navigate('Detail', {id: id});
    },
    [navigation],
  );

  useEffect(() => {
    async function fetchData() {
      const movieList = await getMovies(genre);
      setMovies(movieList);
      setLoading(true);
    }
    fetchData();

    return () => {
      setMovies([]);
      setLoading(false);
    };
  }, [genre]);

  if (!loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{genre.toUpperCase()} Movie List</Text>
      <View style={styles.movies_container}>
        <ScrollView horizontal={true}>
          {movies.map((movie, idx) => (
            <MovieItem
              movie={movie}
              goDetail={goDetail}
              idx={idx}
              key={movie.id}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: 300,
  },
  title: {
    color: 'black',
    fontWeight: '700',
    marginBottom: 5,
    fontSize: 18,
  },
  movies_container: {
    height: 250,
  },
});
