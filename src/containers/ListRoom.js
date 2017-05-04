import {addRoom,getStorageData} from '../actions'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Actions} from 'react-native-redux-router'
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

export class ListRoom extends Component {

   componentDidMount() {
      this.props.getStorageData()
   }

  render() {
    let rooms = this.props.rooms
    return (
      <View style={styles.container}>
        <ScrollView>
              <View style={styles.container}>
                   {rooms.map((room) => (
                            <Card key={room.id}>
                                  <CardTitle>
                                    <Text style={styles.title}>{room.id}</Text>
                                  </CardTitle>
                                  <CardContent>
                                    <Text>{room.name}</Text>
                                  </CardContent>
                                  <CardAction >

                                  </CardAction>
                            </Card>)
                      )
                   }
              </View>
        </ScrollView>
        <TouchableHighlight onPress={Actions.addRoom} style={ styles.touchableAdd } underlayColor={ 'transparent' } >
          <Text style={[ styles.addButton, styles.buttonLight ]}>+</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


ListRoom.defaultProps = {
    rooms: []
}


const mapStateToProps = state => ({
    rooms: state.rooms
})


export default connect(
    mapStateToProps,
    {addRoom,getStorageData}
)(ListRoom)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5
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