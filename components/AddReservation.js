import React, { Component } from 'react'
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Text, 
  DatePickerIOS, 
  Keyboard, 
  Modal, 
  TouchableHighlight,
  Image
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class AddReservationPage extends Component {
  constructor(props) {
    super(props)
    today = new Date()
    tomorrow = new Date()
    tomorrow.setDate(today.getDate()+1)
    nameInput = ''
    hotelNameInput = ''
    this.state = {
      arrivalDate: today,
      departureDate: tomorrow,
      showArrivalDatePicker: false,
      showDepartureDatePicker: false,
      modalVisible: false,
      firstMessage: firstMessages.stark,
      secondMessage: secondMessages.stark,
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
    index = 0
    if (hotelNameInput.toUpperCase().includes('hilton'.toUpperCase()) === true) {
      index = 1
    } else if (hotelNameInput.toUpperCase().includes('marriot'.toUpperCase()) === true) {
      index = 2
    } else if (hotelNameInput.toUpperCase().includes('double'.toUpperCase()) === true) {
      index = 3
    }
    this.setState({
      firstMessage: firstMessages[index],
      secondMessage: secondMessages[index],
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
          onChangeText={(text) => {
            nameInput = text
            this.setState({text})
          }}
          autoCapitalize={'words'}
          returnKeyType={'next'}
          onSubmitEditing={() => { this.secondTextInput.focus() }}
          onFocus={this._hideDatePickers}
        />
        <TextInput
          style={styles.singleLineTextInput}
          editable={true}
          placeholder={'Hotel'}
          onChangeText={(text) => {
            hotelNameInput = text
            this.setState({text})
          }}
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
          <View style={styles.container}>
            <View style={{margin: 22}}>
              <View style={styles.modalFlex}>
                <Image
                  style={styles.image}
                  source={require('../img/tyrion.png')}
                />
                <Text style={styles.modalHeader}>
                  Tyrion says:
                </Text>
              </View>

              <Text style={styles.message}>
                {this.state.firstMessage}
              </Text>

              <Text style={styles.message}>
                [pauses for a sip of wine]
              </Text>
                
              <Text style={styles.message}>
                {this.state.secondMessage}
              </Text>

              <View style={styles.modalButtonFlex}>
                <TouchableHighlight
                  style={styles.modalButton}
                  onPress={() => {
                    this._setModalVisible(!this.state.modalVisible)
                  }}>
                  <Text>
                    Yes
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.modalButton}
                  onPress={() => {
                    this._setModalVisible(!this.state.modalVisible)
                  }}>
                  <Text>
                    No
                  </Text>
                </TouchableHighlight>
              </View>
              

            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const firstMessages = [
  "The Starks are noble and just lords. They will give you a fair shake. But if you're the kind who would desert from the Wall, they will chop off your head.",
  "My sister? You trust my sister. I did [SPOILER ALERT]. How can you trust her? She's the only one of us whose hair hasn't changed color.",
  "I'm pretty sure we don't have air conditioning in Westeros yet, so be prepared to sweat in Dorne. It's so far away from my sister and all of the fighting that you'll probably be safe.",
  "Double tree? Really?!? They are seriously going to cut that thing down to make some more ships in about two episodes.",
]

const secondMessages = [
  "The Starks also tend to die a lot, and the Boltons are downright cruel. Are you sure you want to stay so far north? Winter is coming.",
  "Who knows if she will die? Eh. Try somewhere else. Wait a week or two on the Lannister lands; we always pay our debts. Unless we're dead.",
  "Don't kiss anyone though. For a house whose words are 'Unbowed, Unbent, Unbroken', they sure do lose a lot.",
  "The Greyjoys are the weirdest of the houses in Westeros. But apparently drowning isn't fatal. So, there's that.",
]

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
    paddingLeft: 20,
    paddingRight: 20,
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
  },
  modalFlex: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalHeader: {
    color: '#F5FCFF',
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
  },
  message: {
    color: '#F5FCFF',
    marginTop: 20,
  },
  modalButtonFlex: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: '#F5FCFF',
    margin: 10,
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default AddReservationPage;