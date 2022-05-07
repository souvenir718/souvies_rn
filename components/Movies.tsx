import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackNavigationProp} from '../navigation/RootStack';
import {cutStr} from '../utils';
import Loading from './Loading';

type Props = {
  genre: string;
};

type Movie = {
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
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  loading: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
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
