import React, { useState, useEffect } from 'react'
import { View , Text, Animated} from 'react-native';

export default function Progbar(props) {
  const[visible] = useState(false)
  const[fadeThis] = useState(new Animated.Value(0))
  const[timeThis] = useState(new Animated.Value(0))
  
  useEffect(()=>{
    
    Animated.timing(
      fadeThis,
      {
        toValue: props.visible ? 1 : 0,
        duration: 200
      }
    ).start()

    
    Animated.timing(
      timeThis,
      {
        toValue: 100,
        duration: 5000
      } 
    ).start(0)
  
    if(!props.visible){
      timeThis.setValue(0)
    }
    
    
  }, [props.visible] )

  return (
    <Animated.View
      style={{
      borderWidth:1,
      width:"65%",
      opacity:fadeThis
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
