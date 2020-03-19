import React, { useState, useEffect } from 'react';
import {View, Text, Animated, Button} from 'react-native';
export default function GoButton(props){
  const[slideThis] = useState(new Animated.Value(0))
  useEffect(()=>{
    Animated.timing(
      slideThis,
      {
        toValue: props.visible ? 0 : -100,
        duration: 250
      }
    ).start()
  }, [props.visible] )

  return(
    <Animated.View style={{
      flex: 1,
      width: '100%',
      height: "15%",
      position: 'absolute',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      bottom: slideThis
    }}>
      <View style={{
        flex: 1,
        height: 75,
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1
      }}>
        <View style={{
          flex: 1,
          width: '80%',
          height: 50,
          borderWidth: 1,
          justifyContent: "center",
        }}>
          
          <Button title={props.label} onPress={props[
            props.label === 'RANDOM' ? 'goBtnDoAnother'  
            : props.label === 'START OVER' ? 'goBtnRestart' 
            : props.label === 'RETRY' ? 'goBtnProcess'
            : props.label === 'PROCESS' ? 'goBtnProcess' :
            'goBtnProcess']}/>
          
          
        </View>
      </View>
    </Animated.View>
  )}
