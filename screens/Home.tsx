import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Movies from '../components/Movies';

type Props = {};

export default function Home({}: Props) {
  return (
    <ScrollView style={styles.container}>
      <Movies genre={'romance'} />
      {/* <Movies genre={'comedy'} />
      <Movies genre={'fantasy'} /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  thumnail: {
    height: 150,
    width: 100,
  },
});
