import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Text, DatePickerIOS, Keyboard, Modal, TouchableHighlight } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
      modalVisible: false,
    }
    this._hideDatePickers = this._hideDatePickers.bind(this)
    this._submitReservation = this._submitReservation.bind(this)
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
          style={styles.datePicker}
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
          style={styles.datePicker}
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

  _submitReservation() {
    this.setState({
      modalVisible: true
    })
  }

  _setModalVisible(visible) {
    this.setState({
      modalVisible: visible
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

        <TouchableWithoutFeedback style={styles.datePickerView} onPress={this._toggleArrivalDatePicker}>
          <Text>
            Arrival
          </Text>
          <Text style={styles.datePickerText} >
            {this.state.arrivalDate.toDateString()}
          </Text>
        </TouchableWithoutFeedback>
        {this._showArrivalDatePicker()}

        <TouchableWithoutFeedback style={styles.datePickerView} onPress={this._toggleDepartureDatePicker}>
          <Text>
            Departure
          </Text>
          <Text style={styles.datePickerText}>
            {this.state.departureDate.toDateString()}
          </Text>
        </TouchableWithoutFeedback>
        {this._showDepartureDatePicker()}

        <TouchableHighlight
          onPress={this._submitReservation}
          style={styles.highlightStyles}>
          <Text style={styles.button}>
            Complete Reservation
          </Text>
        </TouchableHighlight>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() =>{
            alert('modal closed')
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>
                Tyrion says:
              </Text>

              <TouchableHighlight
                onPress={() => {
                  this._setModalVisible(!this.state.modalVisible)
                }}>
                <Text>
                  Hide
                </Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#2F4F4F',
  },
  singleLineTextInput: {
    height: 40,
    backgroundColor: '#F5FCFF',
    width: '84%',
    padding: 10,
    marginLeft: '8%',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 25,
  },
  datePickerView: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    width: '84%',
    marginLeft: '8%',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 25,
  },
  datePickerText: {
    
  },
  datePicker: {
    width: '84%',
    marginLeft: '8%',
    backgroundColor: '#F5FCFF',
  },
  button: {
    borderRadius: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    padding: 10,
  },
  highlightStyles: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: "#F5FCFF",
    width: '84%',
    marginLeft: '8%',
    justifyContent: 'center',
    borderRadius: 25,
  }
})

export default AddReservationPage;