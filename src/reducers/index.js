import {ADD_ROOM,LOAD_DATA, UPDATE_DIEN, UPDATE_NUOC, PAYMENT_NHA, PAYMENT_DIEN, PAYMENT_NUOC, PAYMENT_KHAC} from '../actions'
import {AsyncStorage} from 'react-native'
import {calculateNextDate} from '../utils/CalculateDate'

let cloneObj = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

let defaultState = []

export default rooms = (state, action)  => {
    switch(action.type) {
        case ADD_ROOM:
            newRoomData = [...state.filter((room) => room.tenphong !== action.roomData.tenphong), action.roomData]
            AsyncStorage.setItem("@qlpt:room_data", JSON.stringify(newRoomData))
            return newRoomData
        case LOAD_DATA:
            return action.data
        case UPDATE_DIEN: {
                let updateRoom = state.filter((room) => room.tenphong == action.roomName)[0]
                if (updateRoom.sodien) {
                    updateRoom = {...updateRoom, sodienmoi: action.newValue}
                } else {
                    updateRoom = {...updateRoom, sodien: action.newValue}
                }

                return [...state.filter((room) => room.tenphong !== action.roomName), updateRoom]
            }
        case UPDATE_NUOC: {
                let updateRoom = state.filter((room) => room.tenphong == action.roomName)[0]
                if (updateRoom.sonuoc) {
                    updateRoom = {...updateRoom, sonuocmoi: action.newValue}
                } else {
                    updateRoom = {...updateRoom, sonuoc: action.newValue}
                }

                return [...state.filter((room) => room.tenphong !== action.roomName), updateRoom]
            }
        case PAYMENT_NHA: {
              let updateRoom = state.filter((room) => room.tenphong == action.roomName)[0]
              updateRoom.ngaythunhacu = updateRoom.ngaythunhamoi
              updateRoom.ngaythunhamoi = calculateNextDate(updateRoom.ngaythunhamoi, updateRoom.tiennhatheo)
              return [...state.filter((room) => room.tenphong !== action.roomName), updateRoom]
        }
        case PAYMENT_KHAC: {
              let updateRoom = state.filter((room) => room.tenphong == action.roomName)[0]
              updateRoom.ngaythukhaccu = updateRoom.ngaythukhacmoi
              updateRoom.ngaythukhacmoi = calculateNextDate(updateRoom.ngaythukhacmoi, updateRoom.tienkhactheo)
              return [...state.filter((room) => room.tenphong !== action.roomName), updateRoom]
        }
        case PAYMENT_DIEN: {
              let updateRoom = state.filter((room) => room.tenphong == action.roomName)[0]
              updateRoom.ngaythudiencu = updateRoom.ngaythudienmoi
              updateRoom.ngaythudienmoi = calculateNextDate(updateRoom.ngaythudienmoi, updateRoom.tiendientheo)
              return [...state.filter((room) => room.tenphong !== action.roomName), updateRoom]
        }
        case PAYMENT_NUOC: {
              let updateRoom = state.filter((room) => room.tenphong == action.roomName)[0]
              updateRoom.ngaythunuoccu = updateRoom.ngaythunuocmoi
              updateRoom.ngaythunuocmoi = calculateNextDate(updateRoom.ngaythunuocmoi, updateRoom.tiennuoctheo)
              return [...state.filter((room) => room.tenphong !== action.roomName), updateRoom]
        }
        default:
            return state || defaultState
    }
}