/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import {Button, View, Text, StyleSheet} from 'react-native' 
import {createStackNavigator, createAppContainer} from 'react-navigation'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  render() {
    return(
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    )
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

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