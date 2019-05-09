/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import {View, Text, StyleSheet} from 'react-native' 
import {createStackNavigator, createAppContainer} from 'react-navigation'

class HomeScreen extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  Home: {screen: HomeScreen}
})

export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

 /*
import React, {Component} from 'react';
import {Platform, FlatList, StyleSheet, Text, View} from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


import ListPage from './components/ListPage';

const client = new ApolloClient({
  uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
})
//const client = new ApolloClient({ networkInterface })

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ListPage />
      </ApolloProvider>
    );  
  }
}
*/