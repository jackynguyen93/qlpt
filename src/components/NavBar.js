import NavigationBar from 'react-native-navbar'
import React, { Component } from 'react';
import {StyleSheet, View,Alert} from 'react-native'
import {Actions} from 'react-native-redux-router'

class NavBarBase extends Component {
   render() {
       return <NavigationBar style={{ backgroundColor: '#0db0d9'}}
                             titleColor='white'
                             buttonsColor='white'
                             statusBar= {{style:'light-content', hidden: false}}
                             title= {{title:this.props.title}}
                             prevTitle={this.props.initial ? " " : null}
                             leftButton = {this.props.leftButton ? this.props.leftButton : {title:''}}
                             rightButton = {this.props.rightButton ? this.props.rightButton : {title:''}}
           />
   }
}
export class AddRoomBar extends Component {
    constructor(props) {
        super(props)
        var navigator = this.props.navigator
        navigator.__onRightButtonPressed = this.__onRightButtonPressed.bind(this)
    }

   __onRightButtonPressed() {
   }

   render() {
       return <NavBarBase  {...this.props} leftButton={{title:'Về', handler:this.props.onPrev || this.props.routes.pop}}
       rightButton={{title:'Lưu', handler: () => this.props.navigator.__onRightButtonPressed()  }}/>
   }
}

export class ListRoomBar extends Component {
   render() {
       return <NavBarBase {...this.props}  rightButton={{title:'Thêm', handler: Actions.addRoom}}/>
   }
}

