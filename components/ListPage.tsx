import React, { Component } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import gql from 'graphql-tag';
import { graphql, Query, ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { any } from 'prop-types';

const RESERVATIONS_QUERY = gql`
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

const client = new ApolloClient({
  uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
})

// class ListPage extends React.Component<ChildProps<InputProps, Response>, {}> {
class ListPage extends Component {

  render() {
    return(
      <ApolloProvider client={client}>
        <Query query={RESERVATIONS_QUERY}>
          {({ loading, error, data }: any) => {
            if (loading) return(
              <View style={styles.loadingContainer}>
                <Image
                  style={styles.image}
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
                  style={styles.image}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
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
  image: {
    width: 200,
    height: 200,
  },
})

export default ListPage;