
import React, { Component } from 'react';
import ListRoom from './containers/ListRoom'
import AddRoom from './containers/AddRoom'
import rooms from './reducers'
import {createStore,combineReducers ,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {Router, routerReducer, Route, Container, Animations, Schema} from 'react-native-redux-router'
import {View} from  'react-native';
import {NavBar, NavBarModal} from './components/NavBar'
const loggerMiddleware = createLogger();

let store = createStore(combineReducers({rooms,routerReducer}),  applyMiddleware(thunk))

export default class App extends Component {
  render() {
    return (
    <Provider store={store}>
       <View style={{flex:1}}>
            <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}/>
          <Router>
                <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal}/>
                <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
                <Schema name="withoutAnimation" navBar={NavBar}/>
                <Schema name="tab" navBar={NavBar}/>

                <Route name="listRoom" component={ListRoom} initial={true}    title="List Room"/>
                <Route name="addRoom" component={AddRoom}   title="Add Room"/>
          </Router>
      </View>
    </Provider>
    );
  }
}