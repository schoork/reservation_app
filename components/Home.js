import React, {Component} from 'react';
import {Platform, FlatList, StyleSheet, Text, View} from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


import ListPage from './ListPage';

const client = new ApolloClient({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
})
//const client = new ApolloClient({ networkInterface })

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Reservations'
    }
    render() {
        const {navigate} = this.props.navigation
        return (
            <ApolloProvider client={client}>
            <ListPage />
            </ApolloProvider>
        );  
    }
}