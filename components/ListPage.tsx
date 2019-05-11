import React, { Component } from 'react'
import {
  View,
  FlatList,
  Text,
  Image,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Query, ApolloProvider } from 'react-apollo';

import { client, RESERVATIONS_QUERY } from './queries'
import { styles } from './styles'

class ListPage extends Component {

  render() {

    return(
      <ApolloProvider client={client}>
        <Query query={RESERVATIONS_QUERY}>
          {({ loading, error, data }: any) => {
            if (loading) return(
              <View style={styles.loadingContainer}>
                <Image
                  style={styles.listPageImage}
                  source={require('../img/swords.png')}
                />
                <Text style={styles.welcome}>
                  We are currently off fighting a war, so we can't load your data.
                </Text>
              </View>
            )
            if (error) return(
              <View style={styles.loadingContainer}>
                <Image
                  style={styles.listPageImage}
                  source={require('../img/nightking.png')}
                />
                <Text style={styles.welcome}>
                  I killed all your friends. And the people who were supposed to get you this data.
                </Text>
              </View>
            )
            return (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={data.reservations}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
              />
            )
          }}
        </Query>
      </ApolloProvider>
    )
    
  }

  keyExtractor = (item: any, index: { toString: () => string; }) => index.toString()

  renderItem = ({item}: any) => (
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
}

var imageSources = [
  require('../img/stark.jpeg'),
  require('../img/lannister.jpg'),
  require('../img/dorne.png'),
  require('../img/greyjoy.png')
];

export default ListPage;