import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {RootStackNavigationProp} from '../navigation/RootStack';
import styled from 'styled-components/native';
import axios from 'axios';

type Props = {};

type Movie = {
  id: number;
  url: string;
  title: string;
  year: number;
  runtime: number;
  genre: string[];
  summary: string;
  small_cover_image: string;
  date_uploaded: string;
};

type GetMoviesResponse = {
  data: Movie[];
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;
const MainText = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 10px;
  color: red;
`;

export default function Home({}: Props) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onPress = () => {
    navigation.navigate('Detail', {id: 1});
  };
  const [movies, setMovies] = useState<GetMoviesResponse>([]);

  useEffect(() => {
    axios
      .get('https://yts.mx/api/v2/list_movies.json?limit=10&genre=comedy')
      .then(({data}) => setMovies(data.data.movies));
  }, []);

  console.log(movies);

  return (
    <View>
      <Container>
        <MainText>Home</MainText>
      </Container>
      <Button title="open Detail" onPress={onPress} />
    </View>
  );
}
