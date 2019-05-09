import React, { Component } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import { 
  List, 
  ListItem,
  Avatar,
} from 'react-native-elements';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const allReservationsQuery = gql`
  query {
    reservations(
      where: {name_not: ""},
      orderBy: createdAt_DESC) {
        id
        name
        hotelName
        departureDate
        arrivalDate
    }
  }
`

class ListPage extends Component {
  renderLoading() {
    return(
      <View style={styles.container}>
        <ActivityIndicator styleAttr='Large' />
      </View>
    )
  }

  renderError() {
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>
          An error occurred
        </Text>
      </View>
    )
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item}) => (
    <ListItem 
      key={item.id}
      title={item.name}
      subtitle={item.hotelName}
      leftAvatar={{ 
        source: { uri: 'https://firebasestorage.googleapis.com/v0/b/better-by-friends.appspot.com/o/FRODO.jpg?alt=media&token=ed29066d-e4e5-4291-acf8-dc97440e7a09' }
      }}
    />
  )

  renderList(dataArray) {
    return(
      <FlatList
        keyExtractor={this.keyExtractor}
        data={dataArray}
        renderItem={this.renderItem}
      />
    )
  }

  render() {
    if (this.props.allReservationsQuery && this.props.allReservationsQuery.loading) {
      return this.renderLoading;
    } else if (this.props.allReservationsQuery && this.props.allReservationsQuery.error) {
      return this.renderError;
    } else {
      const reservationsList = this.props.allReservationsQuery.reservations
      console.log(reservationsList)
      return this.renderList(reservationsList)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

export default graphql (allReservationsQuery, {name: 'allReservationsQuery'} )(ListPage);