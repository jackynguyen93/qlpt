import {AsyncStorage} from 'react-native'
import {calculateNextDate} from '../utils/CalculateDate'

export const ADD_ROOM = 'ADD_ROOM'
export const LOAD_DATA = 'LOAD_DATA'
export const SAVE_ROOM = 'SAVE_ROOM'
export const PAYMENT_NHA = 'PAYMENT_NHA'
export const PAYMENT_DIEN = 'PAYMENT_DIEN'
export const PAYMENT_NUOC = 'PAYMENT_NUOC'
export const PAYMENT_KHAC = 'PAYMENT_KHAC'
export const UPDATE_DIEN = 'UPDATE_DIEN'
export const UPDATE_NUOC = 'UPDATE_NUOC'

const example =[{tenphong: 'Example',
                ngaythue: '2017-03-03',
                tiennha: 100000,
                tiennhatheo: 'thang',
                tiendien: 3000,
                tiendientheo: 'kwh',
                tiennuoc: 1000,
                tiennuoctheo: 'm3',
                tienkhac: 55000,
                tienkhactheo: 'quy',
                ngaythudiencu: '2017-03-03',
                ngaythudienmoi: '2017-02-03',
                ngaythunhacu: '2017-03-03',
                ngaythunhamoi: '2017-03-03',
                ngaythunuoccu: '2017-03-03',
                ngaythunuocmoi: '2017-04-23',
                ngaythukhaccu: '2017-03-03',
                ngaythukhacmoi: '2017-05-08',
                dathutiennha: false,
                dathutiennuoc: true,
                dathutiendien: false,
                dathutienkhac: false}]

export const addRoom = (data) => {
    data = {...data, ngaythudiencu : data.ngaythue, ngaythunhacu:
        data.ngaythue, ngaythunuoccu: data.ngaythue, ngaythukhaccu: data.ngaythue,
        ngaythunhamoi: calculateNextDate(data.ngaythue, data.tiennhatheo),
        ngaythudienmoi: calculateNextDate(data.ngaythue, data.tiendientheo),
        ngaythunuocmoi: calculateNextDate(data.ngaythue, data.tiennuoctheo),
        ngaythukhacmoi: calculateNextDate(data.ngaythue, data.tienkhactheo),
        sodien: data.tiendientheo !== 'kwh' ? 0 : undefined,
        sodienmoi: data.tiendientheo !== 'kwh' ? 0 : undefined,
        sonuoc: data.tiendientheo !== 'm3' ? 0 : undefined,
        sonuocmoi: data.tiennuoctheo !== 'm3' ? 0 : undefined}


    return {
       type: ADD_ROOM,
       roomData: data
    }
}

export const payment = (paymentItem, roomName) => {
    switch (paymentItem) {
        case PAYMENT_NHA : return {type: PAYMENT_NHA, roomName}
        case PAYMENT_DIEN : return {type: PAYMENT_DIEN, roomName}
        case PAYMENT_NUOC : return {type: PAYMENT_NUOC, roomName}
        case PAYMENT_KHAC : return {type: PAYMENT_KHAC, roomName}
    }
}


export const getStorageData = () => (dispatch, getState) => {
    AsyncStorage.setItem("@qlpt:room_data", JSON.stringify(example)) //temp
    AsyncStorage.getItem("@qlpt:room_data", (err, result) => {
       dispatch({
               type: LOAD_DATA,
               data: JSON.parse(result) ||  []
       })
    })
}

export const updateValue = (updateItem, roomName, newValue) => {
    switch (updateItem) {
        case PAYMENT_DIEN : return {type: UPDATE_DIEN, roomName, newValue}
        case PAYMENT_NUOC : return {type: UPDATE_NUOC, roomName, newValue}
    }
}
