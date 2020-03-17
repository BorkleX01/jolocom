import React, { useState, useEffect } from 'react'
import { View , Text, Animated} from 'react-native';

export default function Progbar(props) {
  const[visible] = useState(false)
  const[slideThis] = useState(new Animated.Value(0))
    useEffect(()=>{
    Animated.timing(
      slideThis,
      {
        toValue: props.visible ? 0 : props.animParams.fVal,
        duration: props.animParams.dur
      }
    ).start()
  }, [props.visible] )

  return (
    <Animated.View style={{borderWidth:1, width:"65%", top:slideThis}}>
      <View style={{ height:30 }}>
        <View style={{ width: "5%",
                       height:"100%",
                       backgroundColor:'black'}}>
        </View>
      </View>
    </Animated.View> 
  )
}
