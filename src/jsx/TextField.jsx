import React , { useState, useEffect } from 'react';
import { Text, TextInput, View, Animated, Keyboard } from 'react-native';

export default function TextField(props) {
  const [str, setStr] = useState('')
  const prompt = 'Write your 4 digit room ID here'
  const [warning, setWarning] = useState('')
  const [focus, setFocus] = useState(false)
  const [request, setRequest] = useState()

  const[slideThis] = useState(new Animated.Value(0))
  useEffect(()=>{
    Animated.timing(
      slideThis,
      {
        toValue: props.visible ? 0 : -props.animParams.fVal,
        duration: props.animParams.dur
      }
    ).start()

    if(str.length === 4){
      props.goBtnReady(true)
      Keyboard.dismiss()
    }
    
    if(request!=='sent'){
      props.getQ(request)
      setRequest('sent')
    }
  }, [props.visible, str, focus, request] )

  return (
    <Animated.View style={{
      width: "65%",
      height:50,
      top:slideThis,
      borderWidth: focus ? 5 : 0}}>
      <TextInput
        style={{borderWidth:1,  height:50, textAlign:'center'}}
        placeholder={prompt}
        type="number"
        keyboardType="numeric"
        value={str}
        onChangeText= { (text) => setStr(text.length <= 5 ? text : null )}
        onKeyPress= { (e) => e.key == 'Enter' ? setRequest(str) : null}
        clearTextOnFocus={true}
        onBlur={()=>setFocus(false)}
        onFocus={()=>setFocus(true)}>
      </TextInput>
   </Animated.View>
  )
}
