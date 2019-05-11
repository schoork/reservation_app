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
import { ApolloProvider, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import { withNavigation, NavigationScreenProp } from 'react-navigation'

const addReservation = gql`
  mutation addReservation($name: String!, $hotelName: String!, $arrivalDate: String!, $departureDate: String!) {
    createReservation(data: {name: $name, hotelName: $hotelName, arrivalDate: $arrivalDate, departureDate: $departureDate}) {
      id
    }
  }
`

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  arrivalDate: Date,
  departureDate: Date,
  showArrivalDatePicker: boolean,
  showDepartureDatePicker: boolean,
  modalVisible: boolean,
  errorModalVisible: boolean,
  firstMessage: String,
  secondMessage: String,
  nameInput: String,
  hotelNameInput: String,
  errorMessage: String,
}


class AddReservationPage extends Component<Props, State> {
  secondTextInput: any;
  today: Date = new Date()
  tomorrow: Date = new Date()
  
  constructor(props: Props) {
    super(props)
    this.tomorrow.setDate(this.today.getDate()+1)
    this.state = {
      arrivalDate: this.today,
      departureDate: this.tomorrow,
      showArrivalDatePicker: false,
      showDepartureDatePicker: false,
      modalVisible: false,
      errorModalVisible: false,
      firstMessage: firstMessages[0],
      secondMessage: secondMessages[0],
      nameInput: '',
      hotelNameInput: '',
      errorMessage: '',
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

  _setArrivalDate(newDate: Date) {
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

  _setDepartureDate(newDate: Date) {
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
    if (this.state.nameInput == '') {
      this.setState({
        errorMessage: errorMessages.name,
        errorModalVisible: true,
      })
    } else if (this.state.hotelNameInput == '' || this.state.hotelNameInput == null) {
      this.setState({
        errorMessage: errorMessages.hotel,
        errorModalVisible: true,
      })
    } else {
      let index: number = 0
      if (this.state.hotelNameInput.toUpperCase().includes('hilton'.toUpperCase()) === true) {
        index = 1
      } else if (this.state.hotelNameInput.toUpperCase().includes('marriot'.toUpperCase()) === true) {
        index = 2
      } else if (this.state.hotelNameInput.toUpperCase().includes('double'.toUpperCase()) === true) {
        index = 3
      }
      this.setState({
        firstMessage: firstMessages[index],
        secondMessage: secondMessages[index],
        modalVisible: true
      })
    }
  }
 
  _setModalVisible(visible: boolean) {
    this.setState({
      modalVisible: visible
    })
  }

  _setErrorModalVisible(visible: boolean) {
    this.setState({
      errorModalVisible: visible
    })
  }

  render() {
    const client = this.props.navigation.getParam('client')
    const reservationsQuery = this.props.navigation.getParam('reservationsQuery')

    return(
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Mutation mutation={addReservation} refetchQueries={[{ query: reservationsQuery }]} >
            {(addReservationMutation: any, {data}: any) => (
              <View>
                <TextInput
                  style={styles.singleLineTextInput}
                  editable={true}
                  placeholder={'Name'}
                  value={this.state.nameInput.toString()}
                  onChangeText={(text) => {
                    this.setState({
                      nameInput: text
                    })
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
                  value={this.state.hotelNameInput.toString()}
                  onChangeText={(text) => {
                    this.setState({
                      hotelNameInput: text
                    })
                  }}
                  autoCapitalize={'words'}
                  returnKeyType={'done'}
                  ref={(ref) => {
                    this.secondTextInput = ref
                  }}
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
                  visible={this.state.modalVisible}>
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
                            
                            
                            addReservationMutation({
                              variables: {
                                name: this.state.nameInput,
                                hotelName: this.state.hotelNameInput,
                                arrivalDate: this.state.arrivalDate.toDateString(),
                                departureDate: this.state.departureDate.toDateString()
                              }
                            }).then((res: any) => {
                              this.props.navigation.goBack()
                            }).catch((err: String) => {
                              <Text>err</Text>
                            })
                            
                            
                            this._setModalVisible(!this.state.modalVisible)
                            
                            this.props.navigation.goBack()
                            
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
      
                <Modal
                  animationType={'slide'}
                  transparent={false}
                  visible={this.state.errorModalVisible}>
                  <View style={styles.container}>
                    <View style={{margin: 22}}>
                      <View style={styles.modalFlex}>
                        <Image
                          style={styles.image}
                          source={require('../img/snow.png')}
                        />
                        <Text style={styles.modalHeader}>
                          Jon says:
                        </Text>
                      </View>
      
                      <Text style={styles.message}>
                        {this.state.errorMessage}
                      </Text>
      
                      <View style={styles.modalButtonFlex}>
                        <TouchableHighlight
                          style={styles.modalButton}
                          onPress={() => {
                            this._setErrorModalVisible(!this.state.errorModalVisible)
                          }}>
                          <Text>
                            Ok
                          </Text>
                        </TouchableHighlight>
                        </View>
      
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          </Mutation>
        </View>
      </ApolloProvider>
      
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

const errorMessages = {
  name: 'Go back beyond the wall, whitewalker. Otherwise, give us your name.',
  hotel: "Sleeping outside is fine. I've done it a few times myself. But you don't need an app for it."
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

export default withNavigation(AddReservationPage);