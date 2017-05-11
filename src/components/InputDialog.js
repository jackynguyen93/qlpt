import React, { Component,PropTypes } from 'react'
import {StyleSheet, View,Text,Button, TextInput, TouchableHighlight} from 'react-native'
import Modal from 'react-native-modal';

export default class InputDialog extends Component {


    constructor(props) {
      super(props)
      this.state = {}
    }

  render () {
    return (
         <Modal   style = {styles.modal}
                  isVisible={this.props.show}
                  animationIn={'slideInLeft'}
                  animationOut={'slideOutRight'}
                  >
              <View style={styles.modalContent}>
                <Text style={styles.text}>{this.props.text}</Text>
                {this.props.input ? <TextInput style= {styles.input} onChangeText = {(text) => this.setState({input: text})}/> : null}
                <View style = {styles.buttons}>
                    <TouchableHighlight activeOpacity= {0.5} underlayColor={"#ffffff"} onPress={() => {
                      this.props.onCancel()
                    }} >
                        <Text style={styles.button}> Cancel </Text>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity= {0.5} underlayColor={"#ffffff"} onPress={() => {
                      this.props.onOk(this.state.input)
                    }} title = "OK">
                        <Text style={[styles.button, {marginLeft: 30}]}> OK </Text>
                    </TouchableHighlight>
                </View>
              </View>
         </Modal>

    );

  }
}


const styles = StyleSheet.create({

   modalContent: {
     backgroundColor: 'white',
     padding: 22,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 4,
     borderColor: 'rgba(0, 0, 0, 0.1)',
   },
  text: {
    fontFamily: 'Arial',
    textAlign: "center",
    marginTop: 20,
    fontSize: 18
  },
  input: {
    marginTop: 10,
    marginLeft: 20,
    borderWidth : 1,
    width: 250
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "center",

  },
  button: {
    fontWeight: 'bold',
    color: 'blue'
  }
});
















