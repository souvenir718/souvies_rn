import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
});
