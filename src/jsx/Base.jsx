import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ActivityIndicator  } from 'react-native';
import env from '../api/expo-constants';
import { Linking } from 'expo'
import TextField from './TextField';
import BaseStyle from '../css/BaseStyle';
import Progbar from './Progbar';
import Status from './Status';
import GoButton from './GoButton';
import QuestionCard from './QuestionCard';
import { getQuiz } from '../js/fetcher'

export default function Base(props) {
  const [ pin, setPin ] = useState('')
  const [ getPin, setGetPin ] = useState(true)
  const [ submitReady, setSubmitReady ] = useState(false)
  const [ requestSent, setRequestSent ] = useState(false)
  const [ requestDone. setRequestDone ] = useState(false)

  const { box , vert } = BaseStyle()
  const centrum = { fVal:-500, dur:500 }
  
  useEffect((didUpdate)=>{
  },[requestSent, requestDone])
  
  const fethRoom = (id) => {
    console.log('submitRequest')
    console.log(id)
    setPin(id)
    console.log(env.apiUrl+'?id='+pin+'&op=fetchRoom')
    setRequestSent(true)
    //setGetPin(false)
  }

  const submitAnswer = (yn) => {
    console.log('submitQuiz')
    console.log(pin)
    console.log(yn)
    //setGetPin(true)
  }

  const
  
  return (
    <View style={{height: "100%", backgroundColor:"70"}}>
      <Status visible={false}/>
      <View style={vert} >
        <TextField visible={getPin} animParams={centrum} getQ={()=>submitRequest} goBtnReady={()=>setSubmitReady(true)}/>
        <Progbar visible={requestSent} animParams={centrum}/>
      </View>
      <QuestionCard visible={!getPin} animParams={centrum} sAns={submitQuiz}/>
      <GoButton visible={submitReady} goBtnProcess={()=>submitRequest(pin)} label={'PROCESS'}/>
    </View>

  )
}
