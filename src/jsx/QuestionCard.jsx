import React, { useState, useEffect } from 'react';
import {View, Text, Animated, Button} from 'react-native';

export default function QuestionCard(props){
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

  

  return(
    <Animated.View style={{
      flex: 1,
      flexDirection: "column",
      width: '100%',
      height: 300,
      position: 'absolute',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      top: slideThis
    }}>
      <View style={{
        flex: 1,
        borderWidth: 1,
        width: '95%',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            height: '50%',
            width: '95%',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>

          <Text style={{
            fontSize:50
          }}>
            Are YOU some kind of Asshole?
          </Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              width: '95%',
              height: '95%',
              borderWidth: 1,
              padding:10
            }}>
            
            <View
              style={{
                flex: 1,
                width: 120,
                height: 100,
                borderWidth: 1
              }}>
              
              <Button
                id='yes'
                onPress = {() => props.sAns('yes')}
                title = 'YES'/>
              
            </View>

            <View
              style={{
                flex: 1,
                width: 120,
                height: 100,
                borderWidth: 1,
                 }}>

              <Button
                
                
                onPress = {() => props.sAns('no')}
                title = 'NO'
                size={15}
                
                
              />
                
              
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  )}
