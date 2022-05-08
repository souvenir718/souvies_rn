import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackNavigationProp} from '../navigation/RootStack';
import Loading from './Loading';
import MovieItem from './MovieItem';

type Props = {
  genre: string;
};

export type Movie = {
  id: number;
  title: string;
  year: number;
  large_cover_image: string;
  rating: number;
};

export default function Movies({genre}: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<RootStackNavigationProp>();
  const goDetail = (id: number) => {
    navigation.navigate('Detail', {id: id});
  };

  const getMovies = useCallback(() => {
    axios
      .get(
        `https://yts.mx/api/v2/list_movies.json?limit=10&genre=${genre}&sort_by=rating&order_by=desc`,
      )
      .then(({data}) => {
        setMovies(data.data.movies);
        setLoading(true);
      })
      .catch(err => console.log(err));
  }, [genre]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

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
