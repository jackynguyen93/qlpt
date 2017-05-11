import {getStorageData,PAYMENT_DIEN,PAYMENT_NUOC,PAYMENT_NHA,PAYMENT_KHAC, payment, updateValue} from '../actions'
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Actions} from 'react-native-redux-router'
import { StyleSheet, Text, View,Button,ScrollView,TouchableHighlight,Image, TextInput, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardTitle, CardImage, CardContent, CardAction} from 'react-native-card-view';
import ProgressBar from '../components/ProgressBar'
import InputDialog from '../components/InputDialog'
import {formatDate} from '../utils/CalculateDate'


export class ListRoom extends Component {

    constructor(props) {
      super(props)
      this.renderRoomCard = this.renderRoomCard.bind(this)
      this.createConfirmMessage = this.createConfirmMessage.bind(this)
      this.state = {}
    }

   componentDidMount() {
      this.props.getStorageData()
   }

   createConfirmMessage() {
      let confirmRoom = this.props.rooms.filter((room) => room.tenphong === this.state.confirmRoom)[0]
      if (confirmRoom) {
          switch (this.state.confirmType) {
            case PAYMENT_NHA: return "Thu tiền nhà (" + confirmRoom.ngaythunhamoi + ") : " + confirmRoom.tiennha
            case PAYMENT_KHAC: return "Thu tiền khác (" + confirmRoom.ngaythukhacmoi + ") : " + confirmRoom.tienkhac
            case PAYMENT_DIEN: return "Thu tiền điện (" + confirmRoom.ngaythudienmoi + ") : " + confirmRoom.tiendien +
                                (confirmRoom.sodienmoi == 0 ? '' :
                                ' x (Số điện mới:' + confirmRoom.sodienmoi + ' - Số điện cũ:' + confirmRoom.sodien + ') =' + confirmRoom.tiendien * (confirmRoom.sodienmoi - confirmRoom.sodien))
            case PAYMENT_NUOC: return "Thu tiền nước (" + confirmRoom.ngaythunuocmoi + ") : " + confirmRoom.tiennuoc +
                                (confirmRoom.sonuocmoi == 0 ? '' :
                                ' x (Số nước mới:' + confirmRoom.sonuocmoi + ' - Số nước cũ:' + confirmRoom.sonuoc + ') =' + confirmRoom.tiennuoc * (confirmRoom.sonuocmoi - confirmRoom.sonuoc))
          }
      }
   }

   renderRoomCard(room) {
        let pngaynha, pngaydien, pngaynuoc, pngaykhac, canthunha, canthudien, canthunuoc, canthukhac
        let today = Date.parse((new Date()).toISOString().substring(0,10))
        if(room.tiennha != 0) {
            pngaynha = today < Date.parse(room.ngaythunhacu) ? 0 : (today - Date.parse(room.ngaythunhacu))/(Date.parse(room.ngaythunhamoi) - Date.parse(room.ngaythunhacu)) * 100
            canthunha = pngaynha > 99
        }
        if(room.tiendien != 0) {
            pngaydien =  today < Date.parse(room.ngaythudiencu) ? 0 : (today - Date.parse(room.ngaythudiencu))/(Date.parse(room.ngaythudienmoi) - Date.parse(room.ngaythudiencu)) * 100
            canthudien = pngaydien > 99
        }
        if(room.tiennuoc != 0) {
            pngaynuoc =  today < Date.parse(room.ngaythunuoccu) ? 0 : (today - Date.parse(room.ngaythunuoccu))/(Date.parse(room.ngaythunuocmoi) - Date.parse(room.ngaythunuoccu)) * 100
            canthunuoc = pngaynuoc > 99
        }
        if(room.tienkhac != 0) {
            pngaykhac =  today < Date.parse(room.ngaythukhaccu) ? 0 : (today - Date.parse(room.ngaythukhaccu))/(Date.parse(room.ngaythukhacmoi) - Date.parse(room.ngaythukhaccu)) * 100
            canthukhac = pngaykhac >99
        }
        return (

               <Card key={room.tenphong} style={styles.card}>
                     <CardTitle>
                        <Text style={styles.title}>{room.tenphong}</Text>
                     </CardTitle>
                     <CardContent style={{width: 300}} >
                          { room.tiennha != 0 ?
                              <TouchableHighlight activeOpacity= {0.5} underlayColor={"#ffffff"} onPress = {() => canthunha ? this.setState({confirmRoom: room.tenphong, confirmType: PAYMENT_NHA}) : ''}>
                                  <ProgressBar styles = { styles.progressbar }
                                  completePercentage={canthunha ? 100 : pngaynha}
                                  color={canthunha ? "#4FB948" : "#bee4a6"}
                                  borderColor={"#007696"} animation = {canthunha}
                                  text={canthunha ? 'Bấm để thu tiền nhà (' + formatDate(room.ngaythunhamoi) +')' : 'Ngày thu tiền nhà: ' + formatDate(room.ngaythunhamoi)}
                                  />
                              </TouchableHighlight>
                            : null
                          }
                           { room.tiendien != 0 ?
                              <TouchableHighlight activeOpacity= {0.5} underlayColor={"#ffffff"}
                                  onPress = { () => canthudien? (room.sodienmoi ? this.setState({confirmRoom: room.tenphong, confirmType: PAYMENT_DIEN}) : this.setState({updatingRoom: room.tenphong, updatingType: PAYMENT_DIEN})) :
                                                    (room.sodien ? '' : this.setState({updatingRoom: room.tenphong, updatingType: PAYMENT_DIEN}))}>
                                  <ProgressBar styles = { styles.progressbar }
                                 completePercentage={canthudien ? 100 : pngaydien}
                                 color={canthudien ? "#4FB948" : "#bee4a6"}
                                 borderColor={"#007696"} animation = {canthudien || !room.sodien}
                                 text={room.sodien ?
                                        (canthudien ? (room.sodienmoi ? 'Bấm để thu tiền điện (' + formatDate(room.ngaythudienmoi) +')' : 'Bấm để nhập số điện mới (' + formatDate(room.ngaythudienmoi) +')') : 'Ngày thu tiền điện: ' + formatDate(room.ngaythudienmoi))
                                        :  'Bấm để nhập số điện'}
                                 />
                             </TouchableHighlight>
                             : null
                         }
                          { room.tiennuoc != 0 ?
                              <TouchableHighlight activeOpacity= {0.5} underlayColor={"#ffffff"}
                                  onPress = { () => canthunuoc ? (room.sonuocmoi ? this.setState({confirmRoom: room.tenphong, confirmType: PAYMENT_NUOC}) : this.setState({updatingRoom: room.tenphong, updatingType: PAYMENT_NUOC})) :
                                                    (room.sonuoc? '' : this.setState({updatingRoom: room.tenphong, updatingType: PAYMENT_NUOC}))}>
                                 <ProgressBar styles = {styles.progressbar }
                                 completePercentage={canthunuoc ? 100 : pngaynuoc}
                                 color={canthunuoc ? "#4FB948" : "#bee4a6"}
                                 borderColor={"#007696"} animation = {canthunuoc || !room.sonuoc}
                                 text={room.sonuoc ?
                                      (canthunuoc ? (room.sonuocmoi ? 'Bấm để thu tiền nước (' + formatDate(room.ngaythunuocmoi) +')' : 'Bấm để nhập số nước mới (' + formatDate(room.ngaythunuocmoi) +')') : 'Ngày thu tiền nước: ' + formatDate(room.ngaythunuocmoi))
                                       : 'Bấm để nhập số nước'}
                                 />
                              </TouchableHighlight>
                            : null
                         }
                          { room.tienkhac != 0 ?
                               <TouchableHighlight activeOpacity= {0.5} underlayColor={"#ffffff"} onPress = {() => canthukhac? this.setState({confirmRoom: room.tenphong, confirmType: PAYMENT_KHAC}) : ''}>
                                 <ProgressBar styles = {styles.progressbar }
                                 completePercentage={canthukhac ? 100 : pngaykhac}
                                 color={canthukhac ? "#4FB948" : "#bee4a6"}
                                 borderColor={"#007696"} animation = {canthukhac}
                                 text={canthukhac ? 'Bấm để thu tiền khác (' + formatDate(room.ngaythukhacmoi) +')' : 'Ngày thu tiền khác: ' + formatDate(room.ngaythukhacmoi)}
                                 />
                               </TouchableHighlight>
                               : null
                         }
                     </CardContent>
                     <CardAction >
                         <Icon  name="trash" backgroundColor="#3b5998" size={25} onPress={this.loginWithFacebook}/>
                         <Icon  style={{marginLeft:30}} name="edit" backgroundColor="#3b5998" size={25} onPress={() => Actions.addRoom({room})}/>
                     </CardAction>
               </Card>)
   }

  render() {
    let rooms = this.props.rooms
    return (
      <View style={styles.container}>

        <ScrollView>
              <View style={styles.container}>
                   {rooms.map( this.renderRoomCard)}
              </View>
        </ScrollView>
        <InputDialog show={!!this.state.updatingRoom}
                                text = {this.state.updatingType === PAYMENT_DIEN ? 'Nhập số điện mới' : 'Nhập số nước mới'}
                                input = {true}
                                    onOk={(newValue) => {
                                                this.props.updateValue(this.state.updatingType, this.state.updatingRoom, newValue)
                                                this.setState({updatingRoom: undefined})
                                    }} onCancel = {() => this.setState({updatingRoom: undefined})}/>
        <InputDialog show={!!this.state.confirmRoom}
                                text = {this.createConfirmMessage()}
                                    onOk={(value) =>  {
                                                this.props.payment(this.state.confirmType, this.state.confirmRoom)
                                                this.setState({confirmRoom: undefined})
                                                        }}
                                    onCancel = {() => this.setState({confirmRoom: undefined})}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
    rooms: state.rooms
})


export default connect(
    mapStateToProps,
    {getStorageData, updateValue, payment}
)(ListRoom)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5
  },
  card: {
    borderRadius:3,
  },
  progressbar: {
    width: 350,
    marginBottom: 10
  },
  title: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 10
  }
});