import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Text, DatePickerIOS } from 'react-native'

class AddReservationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrivalDate: new Date(),
      departureDate: new Date(),
      showDatePicker: false,
    }
    this.setArrivalDate = this.setArrivalDate.bind(this)
    this.showHideDatePicker = this.showHideDatePicker.bind(this)
    this._showDatePicker = this._showDatePicker.bind(this)
  }

  setArrivalDate(newDate) {
    this.setState({arrivalDate: newDate})
  }

  setDepartureDate(newDate) {
    this.setState({departureDate: newDate})
  }

  _showDatePicker() {
    if (this.state.showDatePicker) {
      return(
        <DatePickerIOS
          date={this.state.arrivalDate}
          onDateChange={this.setArrivalDate}
          mode={'date'}
          isVisible={false}
        />
      )
    }
  }

  showHideDatePicker() {
    this.setState({
      showDatePicker: !this.state.showDatePicker
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.singleLineTextInput}
          editable={true}
          placeholder={'Name'}
          onChangeText={(text) => this.setState({text})}
          autoCapitalize={'words'}
        />
        <TextInput
          style={styles.singleLineTextInput}
          editable={true}
          placeholder={'Hotel'}
          onChangeText={(text) => this.setState({text})}
          autoCapitalize={'words'}
        />
        <Text style={styles.singleLineTextInput} onPress={this.showHideDatePicker}>
          {this.state.arrivalDate.toDateString()}
        </Text>
        {this._showDatePicker()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  singleLineTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '84%',
    padding: 10,
    marginLeft: '8%',
  }
})

export default AddReservationPage;