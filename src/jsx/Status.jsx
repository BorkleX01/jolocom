import React, { useState, useEffect } from 'react';
import {View, Text, Animated} from 'react-native';
export default function Status(props){

  const[slideThis] = useState(new Animated.Value(0))
  useEffect(()=>{
    Animated.timing(
      slideThis,
      {
        toValue: props.visible ? 0 : -100,
        duration: 500
      }
    ).start()
  }, [props.visible] )
  
  
  return(
    <Animated.View style={{
      flex: 1,
      width: '100%',
      height: 100,
      position: "absolute",
      borderWidth: 1,
      top:slideThis
    }}>
      <View style={{
        flex: 1,
        width: '100%',
        height: 100,
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <Text style={{textAlign: 'center'}}>Bogus ipsem lorem</Text>
      </View>
    </Animated.View>
  )}
