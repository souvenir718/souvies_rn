import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackParamList} from '../navigation/RootStack';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export default function Detail() {
  const {params} = useRoute<DetailScreenRouteProp>();

  return (
    <View>
      <Text>Detail {params.id}</Text>
      <Button title={`Test ${params.id}`} />
    </View>
  );
}
