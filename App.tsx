/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Icon } from 'react-native-elements'
import {createStackNavigator, createAppContainer} from 'react-navigation'

import ListPage from './components/ListPage';
import AddReservationPage from './components/AddReservation';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}: any) => {
    return {
      headerTitle: 'Reservations',
      headerRight: (
        <Icon
          onPress={() => {
            navigation.navigate('Add', {
              navigation: navigation,
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
      <ListPage />
    )
  }
}

class AddScreen extends React.Component {
  static navigationOptions =  ({navigation}: any) => {
    return {
      headerTitle: 'Add Reservation',
    }
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