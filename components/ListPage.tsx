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

var imageSources = [
  require('../img/stark.jpeg'),
  require('../img/lannister.jpg'),
  require('../img/dorne.png'),
  require('../img/greyjoy.png')
];

class ListPage extends Component {
  renderLoading() {
    return(
      <View style={styles.container}>
        <Image
          source={require('../img/swords.png')}
        />
        <Text>
          We are currently off fighting a war, so we can't load your data.
        </Text>
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
      title={`${item.name} staying at ${item.hotelName}`}
      subtitle={`${item.arrivalDate} - ${item.departureDate}`}
      leftAvatar={{ 
        size: 50,
        source: item.hotelName.toUpperCase().includes('hilton'.toUpperCase()) === true
          ? imageSources[1]
          : item.hotelName.toUpperCase().includes('marriot'.toUpperCase()) === true
            ? imageSources[2]
            : item.hotelName.toUpperCase().includes('double'.toUpperCase()) === true
              ? imageSources[3]
              : imageSources[0]
      }}
    />
  )

  renderSeparator() {
    return(
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '7%',
        }}
      />
    )
  }

  renderList(dataArray) {
    return(
      <FlatList
        keyExtractor={this.keyExtractor}
        data={dataArray}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }

  render() {
    if (this.props.allReservationsQuery && this.props.allReservationsQuery.loading) {
      return this.renderLoading;
    } else if (this.props.allReservationsQuery && this.props.allReservationsQuery.error) {
      return this.renderError;
    } else if (this.props.allReservationsQuery.networkError) {
      return this.renderLoading
    } else {
      const reservationsList = this.props.allReservationsQuery.reservations
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