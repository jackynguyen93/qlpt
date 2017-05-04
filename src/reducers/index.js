import {ADD_ROOM,LOAD_DATA} from '../actions'
import {AsyncStorage} from 'react-native'
let cloneObj = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

let defaultState = [{id: 1, name: 'A'}, {id: 2, name: 'B'}]

export default rooms = (state, action)  => {
    switch(action.type) {
        case ADD_ROOM:
            AsyncStorage.setItem("@qlpt:room_data", JSON.stringify([...state, action.roomData]))
            return [...state, action.roomData]
        case LOAD_DATA:
            return action.data
        default:
            return state || defaultState
    }
}