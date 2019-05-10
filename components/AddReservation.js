import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Text, DatePickerIOS } from 'react-native'

class AddReservationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrivalDate: new Date(),
      departureDate: new Date(),
      showArrivalDatePicker: false,
      showDepartureDatePicker: false,
    }
    this._setArrivalDate = this._setArrivalDate.bind(this)
    this._toggleArrivalDatePicker = this._toggleArrivalDatePicker.bind(this)
    this._showArrivalDatePicker = this._showArrivalDatePicker.bind(this)
    this._setDepartureDate = this._setDepartureDate.bind(this)
    this._toggleDepartureDatePicker = this._toggleDepartureDatePicker.bind(this)
    this._showDepartureDatePicker = this._showDepartureDatePicker.bind(this)
  }

  _setArrivalDate(newDate) {
    this.setState({arrivalDate: newDate})
  }

  _showArrivalDatePicker() {
    if (this.state.showArrivalDatePicker) {
      return(
        <DatePickerIOS
          date={this.state.arrivalDate}
          onDateChange={this._setArrivalDate}
          mode={'date'}
        />
      )
    }
  }

  _setDepartureDate(newDate) {
    this.setState({departureDate: newDate})
  }
  
  _showDepartureDatePicker() {
    if (this.state.showDepartureDatePicker) {
      return(
        <DatePickerIOS
          date={this.state.departureDate}
          onDateChange={this._setDepartureDate}
          mode={'date'}
        />
      )
    }
  }

  _toggleArrivalDatePicker() {
    this.setState({
      showDepartureDatePicker: false,
      showArrivalDatePicker: !this.state.showArrivalDatePicker
    })
  }

  _toggleDepartureDatePicker() {
    this.setState({
      showArrivalDatePicker: false,
      showDepartureDatePicker: !this.state.showDepartureDatePicker
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
        <Text style={styles.singleLineTextInput} onPress={this._toggleArrivalDatePicker}>
          {this.state.arrivalDate.toDateString()}
        </Text>
        {this._showArrivalDatePicker()}
        <Text style={styles.singleLineTextInput} onPress={this._toggleDepartureDatePicker}>
          {this.state.departureDate.toDateString()}
        </Text>
        {this._showDepartureDatePicker()}
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