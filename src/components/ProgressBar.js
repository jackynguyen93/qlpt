import React, { Component,PropTypes } from 'react'
import {StyleSheet, View,Text,Animated} from 'react-native'

export default class ProgressBar extends Component {

  componentWillMount() {
    this._animatedValue = new Animated.Value(100);
  }

  componentDidMount() {
    this.cycleAnimation()
  /*   Animated.timing(this._animatedValue, {
            toValue: 100,
            duration: 3000
        }).start();*/
  }

  setNativeProps(nativeProps) {
     this._root.setNativeProps(nativeProps);
  }

  cycleAnimation() {
    Animated.sequence([
      Animated.timing(this._animatedValue, {
        toValue: 100,
        duration: 200,
        delay: 200
      }),
      Animated.timing(this._animatedValue, {
        toValue: 50,
        duration: 200
     })
    ]).start(event => {
      if (event.finished) {
        this.cycleAnimation();
      }
    });
  }

  render () {

    let props = this.props,
      progressColor = this.props.color,
      borderColor = this.props.borderColor,
      backgroundColor = this.props.backgroundColor,
      completePerc = this.props.completePercentage,
      incompletePerc = Math.abs(completePerc - 100),
      animation = this.props.animation;
    let interpolatedColorAnimation = this._animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['rgba(255,255,255, 1)', progressColor]
    });
    return (
      <Animated.View ref={component => this._root = component} style={[styles.container, this.props.styles, {backgroundColor: animation ? interpolatedColorAnimation : progressColor, borderColor}]}>
        <Text style = {styles.text}> {this.props.text} </Text>
        <View style={[styles.complete, {flex: completePerc}]}></View>
        <View style={[styles.incomplete, {flex: incompletePerc, backgroundColor}]}></View>
      </Animated.View>
    );

  }
}

ProgressBar.defaultProps = {
      color: "blue",
      backgroundColor: "#ffffff",
      borderColor: "#ffffff",
      styles: {},
      completePercentage: 50
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 4,
    marginBottom: 3
  },
  text: {
    position: 'absolute',
    zIndex: 1
  },
  complete: {
    borderRadius: 4
  },

  incomplete: {
    backgroundColor: "#ffffff"
  }
});
