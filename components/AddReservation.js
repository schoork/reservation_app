import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Text, DatePickerIOS, Keyboard } from 'react-native'
import { Button } from 'react-native-elements';

class AddReservationPage extends Component {
  constructor(props) {
    super(props)
    today = new Date()
    tomorrow = new Date()
    tomorrow.setDate(today.getDate()+1)
    this.state = {
      arrivalDate: today,
      departureDate: tomorrow,
      showArrivalDatePicker: false,
      showDepartureDatePicker: false,
    }
    this._hideDatePickers = this._hideDatePickers.bind(this)
    // functions for Arrival Date Picker
    this._setArrivalDate = this._setArrivalDate.bind(this)
    this._toggleArrivalDatePicker = this._toggleArrivalDatePicker.bind(this)
    this._showArrivalDatePicker = this._showArrivalDatePicker.bind(this)
    // functions for Departure Date Picker
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
    Keyboard.dismiss()
    this.setState({
      showDepartureDatePicker: false,
      showArrivalDatePicker: !this.state.showArrivalDatePicker
    })
  }

  _toggleDepartureDatePicker() {
    Keyboard.dismiss()
    this.setState({
      showArrivalDatePicker: false,
      showDepartureDatePicker: !this.state.showDepartureDatePicker
    })
  }

  _hideDatePickers() {
    this.setState({
      showArrivalDatePicker: false,
      showDepartureDatePicker: false,
    })
  }

  submitReservation() {
    alert('submitting')
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
          returnKeyType={'next'}
          onSubmitEditing={() => { this.secondTextInput.focus() }}
          onFocus={this._hideDatePickers}
        />
        <TextInput
          style={styles.singleLineTextInput}
          editable={true}
          placeholder={'Hotel'}
          onChangeText={(text) => this.setState({text})}
          autoCapitalize={'words'}
          returnKeyType={'done'}
          ref={(input) => {this.secondTextInput = input}}
          onFocus={this._hideDatePickers}
        />
        <Text style={styles.singleLineTextInput} onPress={this._toggleArrivalDatePicker}>
          {this.state.arrivalDate.toDateString()}
        </Text>
        {this._showArrivalDatePicker()}
        <Text style={styles.singleLineTextInput} onPress={this._toggleDepartureDatePicker}>
          {this.state.departureDate.toDateString()}
        </Text>
        {this._showDepartureDatePicker()}
        <Button
          onPress={this.submitReservation}
          title="Complete Reservation"
          color="2F4F4F"
          style={styles.button}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#F5FCFF',
  },
  singleLineTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '84%',
    padding: 10,
    marginLeft: '8%',
  },
  button: {
    width: '84%',
    marginLeft: '8%'
  }
})

export default AddReservationPage;