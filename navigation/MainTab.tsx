import React from 'react';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {RootStackNavigationProp} from './RootStack';
import {Text, View} from 'react-native';
import Bookmark from '../screens/Bookmark';

type MainTabParamList = {
  Home: undefined;
  Bookmark: undefined;
};
export type MainTabNavigtaionProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;
export type MainTabNavigationScreenParams =
  NavigatorScreenParams<MainTabParamList>;

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Bookmark" component={Bookmark} />
    </Tab.Navigator>
  );
}

export default MainTab;
