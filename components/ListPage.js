import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  ListView,
  Modal,
  StyleSheet,
  Text
} from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const allReservationsQuery = gql`
  query {
    reservations(orderBy: createdAt_DESC) {
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

  renderList(dataArray) {
    return(
      <View style={styles.container}>
        {dataArray.map(row => (
          <Text key={row.id} style={styles.instructions}>
            {row.name} {row.hotelName}
          </Text>
        ))}
      </View>
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