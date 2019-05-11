/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import {View, Text, StyleSheet} from 'react-native' 
import { Icon } from 'react-native-elements'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import ListPage from './components/ListPage';
import AddReservationPage from './components/AddReservation';

const client = new ApolloClient({
  uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
})

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Reservations',
      headerRight: (
        <Icon
          onPress={() => {
            navigation.navigate('Add', {
              client: client,
            })
          }}
          name='add'
          type='material'
          color='white'
        />
      ),
    }
  }
  render() {
    return(
      <ApolloProvider client={client}>
        <ListPage />
      </ApolloProvider>
    )
  }
}

class AddScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Add Reservation',
  }
  render() {
    return (
      <AddReservationPage />
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Add: AddScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#2F4F4F',
        marginRight: 10,
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