import React, { useState, useEffect } from 'react';
import {View, Text, Animated} from 'react-native';
export default function Bogus(props){

  const[visible, setVisible] = useState(false)
  const[slideThis] = useState(new Animated.Value(0))

  
  useEffect(()=>{
    Animated.timing(
      slideThis,
      {
        toValue: -50,
        duration: 10000
      }
    ).start()
  }, [visible] )

  return(
    <Animated.View style={{
      backgroundColor: '#0000FF',
      width: '100%',
      height: '65%',
      position: 'absolute',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      top: slideThis,
    }}>
      <Text></Text>
    </Animated.View>
  )




}


  
