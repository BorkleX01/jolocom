import React, { useState, useEffect } from 'react'
import { View , Text, Animated} from 'react-native';

export default function Progbar(props) {
  const[visible] = useState(false)
  const[slideThis] = useState(new Animated.Value(0))
  const[timeThis] = useState(new Animated.Value(0))
  
  useEffect(()=>{

    Animated.timing(
      slideThis,
      {
        toValue: props.visible ? 1 : 0,
        duration: 10
      }
    ).start()

    Animated.timing(
      timeThis,
      {
        toValue: 100,
        duration: 10000
      }
    ).start()

    
  }, [props.visible] )

  return (
    <Animated.View
      style={{
      borderWidth:1,
      width:"65%",
      opacity:slideThis
    }}>
      <View style={{
        height:30
      }}>
        <Animated.View style={{
          width: timeThis.interpolate({
            inputRange:[0,100],
            outputRange:['0%', '100%']
          }),
          height:"100%",
          backgroundColor:'black'
        }}>
        </Animated.View>
      </View>
    </Animated.View> 
  )
}
