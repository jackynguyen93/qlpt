import {addRoom} from '../actions'
import React, { Component } from 'react';
import {AddRoomBar} from '../components/NavBar'
import {connect} from 'react-redux'
import {StyleSheet,View,Button,ScrollView,Text,Keyboard,TouchableWithoutFeedback,Alert } from 'react-native';
import {Card, CardTitle, CardImage, CardContent, CardAction} from 'react-native-card-view';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export class AddRoom extends AddRoomBar {

   constructor(props) {
      super(props)
      let today = new Date();
      this.state = { tientrotheo: 'thang', tiennuoctheo: 'm3', tiendientheo: 'kwh', tienkhactheo: 'thang' }
      this.onSave = this.onSave.bind(this)
  }
  componentWillMount() {
    if(this.props.room) {
        this.state = this.props.room
    }
  }
  __onRightButtonPressed() {
      this.onSave()
  }

  onSave() {
      if (this.state.tenphong && this.state.ngaythue && this.state.tiendien && this.state.tiennuoc && this.state.tiennha && this.state.tienkhac) {
          this.props.addRoom(this.state)
          this.props.routes.pop()
      } else {
          return Alert.alert(
                      'Vui lòng nhập đủ thông tin',
                      null,
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                      ]
                    )
      }
  }

  render() {
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
         <Sae
              label={"Tên Phòng"}
              value = {this.state.tenphong}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'#e0dddb'}
              inputStyle={styles.inputfield}
              labelStyle={styles.textfield}
              onChangeText={(text) => { this.setState({tenphong: text}) }}
         />
          <DatePicker
                 style={styles.datepicker}
                 date={this.state.ngaythue}
                 mode="date"
                 placeholder="Ngày thuê"
                 format="YYYY-MM-DD"
                 confirmBtnText="Confirm"
                 cancelBtnText="Cancel"
                 customStyles={{
                   dateIcon: {
                     position: 'absolute',
                     left: 0,
                     top: 4,
                     marginLeft: 0
                   },
                   dateInput: {
                     width: 260,
                     marginLeft: 36
                   }
                 }}
                 onDateChange={(date) => {this.setState({ngaythue: date})}}
          />
          <Sae
                label={"Tiền nhà"}
                value = {this.state.tiennha  ? this.state.tiennha + '' : undefined}
                iconClass={FontAwesomeIcon}
                iconName={'pencil'}
                iconColor={'#e0dddb'}
                inputStyle={styles.inputfield}
                labelStyle={styles.textfield}
                keyboardType = 'numeric'
                onChangeText={(text) => { this.setState({tiennha: text}) }}
           />
           <RadioForm
                     style = {styles.radiobtn}
                     radio_props={[{label: 'Tháng', value: 'thang'},{label: 'Quý', value: 'quy'},{label: 'Năm', value: 'nam'}]}
                     initial={this.state.tiennhatheo ? ['thang','quy','nam'].indexOf(this.state.tiennhatheo) : 0}
                     onPress={(value) => {this.setState({tiennhatheo:value})}}
                     formHorizontal={true}
                     buttonSize={10}
                     labelStyle={{paddingRight: 10}}
           />

           <Sae
                   label={"Tiền điện"}
                   value = {this.state.tiendien ? this.state.tiendien + '' : undefined}
                   iconClass={FontAwesomeIcon}
                   iconName={'pencil'}
                   iconColor={'#e0dddb'}
                   inputStyle={styles.inputfield}
                   labelStyle={styles.textfield}
                   keyboardType = 'numeric'
                   onChangeText={(text) => { this.setState({tiendien: text}) }}
              />
           <RadioForm
                        style = {styles.radiobtn}
                        radio_props={[{label: 'Kwh/Tháng', value: 'kwh'},{label: 'Tháng', value: 'thang'},{label: 'Quý', value: 'quy'},{label: 'Năm', value: 'nam'}]}
                        initial={this.state.tiendientheo ? ['kwh','thang','quy','nam'].indexOf(this.state.tiendientheo) : 0}
                        onPress={(value) => {this.setState({tiendientheo:value})}}
                        formHorizontal={true}
                        buttonSize={10}
                        labelStyle={{paddingRight: 10}}
             />
          <Sae
                      label={"Tiền nước"}
                      value = {this.state.tiennuoc ? this.state.tiennuoc + '' : undefined}
                      iconClass={FontAwesomeIcon}
                      iconName={'pencil'}
                      iconColor={'#e0dddb'}
                      inputStyle={styles.inputfield}
                      labelStyle={styles.textfield}
                      keyboardType = 'numeric'
                      onChangeText={(text) => { this.setState({tiennuoc: text}) }}
                 />
          <RadioForm
                       style = {styles.radiobtn}
                       radio_props={[{label: 'm3/Tháng', value: 'm3'},{label: 'Tháng', value: 'thang'},{label: 'Quý', value: 'quy'},{label: 'Năm', value: 'nam'}]}
                       initial={this.state.tiennuoctheo ? ['m3','thang','quy','nam'].indexOf(this.state.tiennuoctheo) : 0}
                       onPress={(value) => {this.setState({tiennuoctheo:value})}}
                       formHorizontal={true}
                       buttonSize={10}
                       labelStyle={{paddingRight: 10}}
            />
          <Sae
                        label={"Tiền khác"}
                        value = {this.state.tienkhac ? this.state.tienkhac + '' : undefined}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'#e0dddb'}
                        inputStyle={styles.inputfield}
                        labelStyle={styles.textfield}
                        keyboardType = 'numeric'
                        onChangeText={(text) => { this.setState({tienkhac: text}) }}
                   />
            <RadioForm
                         style = {styles.radiobtn}
                         radio_props={[{label: 'Tháng', value: 'thang'},{label: 'Quý', value: 'quy'},{label: 'Năm', value: 'nam'}]}
                         initial={this.state.tienkhactheo ? ['thang','quy','nam'].indexOf(this.state.tienkhactheo) : 0}
                         onPress={(value) => {this.setState({tienkhactheo:value})}}
                         formHorizontal={true}
                         buttonSize={10}
                         labelStyle={{paddingRight: 10}}
              />
      </ScrollView>
    </TouchableWithoutFeedback>
    );
  }
}


export default connect(
    null,
    {addRoom}
)(AddRoom)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft:20,
    marginRight:20,
    marginBottom: 10
  },
  inputfield:{
    fontFamily: 'Arial',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6a7989'
  },
  textfield: {
    marginTop: 5,
    marginLeft: 15,
    fontFamily: 'Arial',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#6a7989'
  },
  datepicker: {
    width: 300,
    paddingTop: 10
  },
  radiobtn : {
    marginTop: 15,
  }
});