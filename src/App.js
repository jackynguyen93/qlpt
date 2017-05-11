import React, { Component } from 'react';
import ListRoom from './containers/ListRoom'
import AddRoom from './containers/AddRoom'
import rooms from './reducers'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {Router, routerReducer, Route, Container, Animations, Schema} from 'react-native-redux-router'
import {View} from  'react-native';
import {AddRoomBar, ListRoomBar} from './components/NavBar'

const loggerMiddleware = createLogger();
let store = createStore(combineReducers({rooms,routerReducer}),applyMiddleware(thunk))

export default class App extends Component {
  render() {
    return (
    <Provider store={store}>
          <Router >
                <Schema name="addRoomSchema" sceneConfig={Animations.FlatFloatFromRight} navBar={AddRoomBar} />
                <Schema name="listRoomSchema" sceneConfig={Animations.FlatFloatFromRight} navBar={ListRoomBar}/>

                <Route name="listRoom" component={ListRoom} initial={true}  schema="listRoomSchema"  title="QUẢN LÝ PHÒNG TRỌ" />
                <Route name="addRoom" component={AddRoom}   schema="addRoomSchema" title="THÔNG TIN PHÒNG"/>
          </Router>
    </Provider>
    );
  }
}