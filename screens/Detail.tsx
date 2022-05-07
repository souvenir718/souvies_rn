import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../navigation/RootStack';
import axios from 'axios';
import {MovieDetail} from '../types';
import Loading from '../components/Loading';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export default function Detail() {
  const {
    params: {id},
  } = useRoute<DetailScreenRouteProp>();

  const [movie, setMovie] = useState<MovieDetail>();
  const [loading, setLoading] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  const getMovie = useCallback(() => {
    axios
      .get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then(({data}) => {
        setMovie(data.data.movie);
        setLoading(true);
      });
  }, [id]);

  const onPress = () => {
    setCheck(prevCheck => !prevCheck);
  };

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  if (!loading) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header_container}>
        <Image
          style={styles.poster}
          source={{uri: `${movie?.large_cover_image}`}}
        />
        <View style={styles.movie_info}>
          <Text style={styles.info_title}>{movie?.title}</Text>
          <View style={styles.sub_container}>
            <Text style={styles.info_rating}>⭐ {movie?.rating}</Text>
            <Text style={styles.info_rating}>・</Text>
            <Text style={styles.info_year}>{movie?.year}</Text>
          </View>
          <Text style={styles.info_genre}>{movie?.genres.join('・')}</Text>
          <TouchableOpacity style={styles.bookmark} onPress={onPress}>
            <Text style={styles.bookmark_btn}>{check ? '💖' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_container: {
    height: 250,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'relative',
  },
  poster: {
    height: 225,
    width: 150,
  },
  movie_info: {
    width: 220,
    justifyContent: 'center',
  },
  info_title: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 20,
    fontWeight: '700',
  },
  sub_container: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info_year: {
    color: 'black',
    fontSize: 14,
  },
  info_rating: {
    color: 'black',
    fontSize: 14,
  },
  info_genre: {color: 'black', fontSize: 14},
  bookmark: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  bookmark_btn: {
    fontSize: 20,
  },
});
