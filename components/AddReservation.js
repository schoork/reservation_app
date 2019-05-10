import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'

class AddReservationPage extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>Add Reservation</Text>
      </View>
    )
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

export default AddReservationPage;