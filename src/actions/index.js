import {AsyncStorage} from 'react-native'

export const ADD_ROOM = 'ADD_ROOM'
export const LOAD_DATA = 'LOAD_DATA'

export const addRoom = (data) => ({
    type: ADD_ROOM,
    roomData: data
})

export const getStorageData = () => (dispatch, getState) => {
    AsyncStorage.getItem("@qlpt:room_data", (err, result) => {
       dispatch({
               type: LOAD_DATA,
               data: JSON.parse(result) ||  [{id: 1, name: 'A'}, {id: 2, name: 'B'}]
       })
    })


}