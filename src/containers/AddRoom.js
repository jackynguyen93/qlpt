import {addRoom} from '../actions'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  StyleSheet,
  Text,
  View,Button,
  ScrollView,TouchableHighlight,Image
} from 'react-native';

import {
  Card,
  CardTitle,
  CardImage,
  CardContent,
  CardAction
} from 'react-native-card-view';

export default class AddRoom extends Component {
  render() {
    let rooms = this.props.rooms
    return (
      <View style={styles.container}>
        <Text>
                         aaaaaaa
                         </Text>
      </View>
    );
  }
}


AddRoom.defaultProps = {
    rooms: []
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    marginBottom: 60
  },
      title: {
        fontSize: 38,
        backgroundColor: 'transparent'
      },
      button: {
        marginRight: 10
      },
      card: {
        width: 300
      },
       touchableAdd: {
       height: 50,
          borderRadius: 50,
          alignSelf: "flex-end",
          paddingRight : 10
        },
        addButton: {
          textAlign: 'center',
          padding: 5,
          borderRadius: 50,
          fontSize: 30,
          width: 50,
          height: 50
        },
        buttonLight: {
          borderWidth: 1
        },
});