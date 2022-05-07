import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Loading() {
  return (
    <View>
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
});
