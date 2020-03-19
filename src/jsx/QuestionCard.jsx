import React, { useState, useEffect } from 'react';
import {View, Text, Animated, Button} from 'react-native';

export default function QuestionCard(props){
  const[visible] = useState(false)
  const[slideThis] = useState(new Animated.Value(-1))
  const[quiz, setQuiz] = useState()
  const[showResults, setShowResults] = useState(false)
  
  useEffect(()=>{
    Animated.timing(
      slideThis,
      {
        toValue: props.visible ? 1 : -1,
        duration: props.animParams.dur
      }
    ).start()

    
    if(props.visible){
    
      if (props.visible.id !== props.pin)
      {
        props.setPin(props.visible.id)
      }
      
      setQuiz(props.visible)
      
    }
  }, [props.visible, props.results, props.pin] )


  return(
    <Animated.View style={{
      flex: 1,
      flexDirection: "column",
      width: '100%',
      position: 'absolute',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      top: slideThis.interpolate({
        inputRange:[-1 , 1],
        outputRange:['-33%', '33%']
      })
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
            width: '95%',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
          <Text style={{
            fontSize:20,
            width:"95%",
            paddingBottom:"2%"
          }}>
            The Question is: 
          </Text>
          <Text style={{
            fontSize:20,
            width:"95%",
            paddingBottom:"5%"
          }}>

            {props.quiz ? props.quiz.question : "Error"}

          </Text>
          
            {props.results
             ?
             <View>
               <Text>{props.pin}</Text>
               <Text>{props.results ? props.results[0]+'yes ' : 'SECRET' } </Text>
               <Text>{props.results ? props.results[1] + 'no ': 'SECRET' } </Text>
             </View>
             :
             <View
               style={{
                 flexDirection: "row",
                 width: '95%',
                 height: '45%',
                 borderWidth: 1,
                 padding:10,
                 alignItems: "center",
                 justifyContent: "space-around",
                 bottom: 10
               }}>
               <View style={{ width: 120, height: 100, borderWidth: 1, justifyContent: "center" }}>
                 
                 <Button
                   id='yes'
                   onPress = {() =>  props.answer('Yes')}
                   title = 'YES'/>

               </View>
               
               <View style={{ width: 120, height: 100, borderWidth: 1, justifyContent: "center" }}>
                 
                 <Button
                   onPress = {() => props.answer('No')}
                   title = 'NO'
                   size={15}/>
               </View>
             </View>
            }
        </View>
      </View>
    </Animated.View>
  )}
