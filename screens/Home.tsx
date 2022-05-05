import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackNavigationProp} from '../navigation/RootStack';

type Props = {};

export default function Home({}: Props) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onPress = () => {
    navigation.navigate('Detail', {id: 1});
  };
  return (
    <View>
      <Text>Home</Text>
      <Button title="open Detail" onPress={onPress} />
    </View>
  );
}
