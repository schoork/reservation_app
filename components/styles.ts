import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    addReservationContainer: {
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
      listPageImage: {
        width: 200,
        height: 200,
      },
})