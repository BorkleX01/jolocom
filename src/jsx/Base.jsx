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

  
  const [ pathApi, setpathApi ] = useState('')

  const [ progress , setProgress ] = useState(0)
  const [ isWaiting, setWaiting ] = useState(true);
  
  const [ err, setErr ] = useState()
  const [ quiz, setQuiz ] = useState()
  
  const [ loaded, setLoaded ] = useState(false)
  const [ pin, setPin ] = useState('')
  const [ getPin, setGetPin ] = useState(true)
  const [ submitReady, setSubmitReady ] = useState(false)
  const [ requestSent, setRequestSent ] = useState(false)
  const [ requestDone, setRequestDone ] = useState(false)

  useEffect((didUpdate)=>{
  },[requestSent, requestDone])

  const { box , vert } = BaseStyle()
  const centrum = { fVal:-500, dur:500 }
  
  
  const submitRequest= (id) => {
    console.log('submitRequest')
    console.log(id)
    setPin(id)
    getQuiz(env.apiUrl+'?id='+pin+'&op=fetchRoom')
    setRequestSent(true)
    //setGetPin(false)
  }

  const requestRandom = () => {
    path=env.apiUrl+'?'+'op=fetchRoom'
    console.log(path)
  }
  
  const submitQuiz = (yn) => {
    console.log('submitQuiz')
    console.log(pin)
    console.log(yn)
    path=env.apiUrl+'?'+'op=fetchRoom'
    //setGetPin(true)
  }
  
  return (

    <View style={{height: "100%", backgroundColor:"70"}}>
      <Status visible={false}/>
      <View style={vert} >
        <TextField visible={getPin} animParams={centrum} getQ={()=>submitRequest} goBtnReady={()=>setSubmitReady(true)}/>
        <Progbar visible={requestSent} animParams={centrum}/>
      </View>
      <QuestionCard visible={!getPin} animParams={centrum} sAns={submitQuiz}/>
      <GoButton visible={submitReady} 
                goBtnProcess={()=> submitRequest(pin)} 
                goBtnRestart={()=> props.reStart} 
                goBtnDoAnother={()=> requestRandom()}
                label={'PROCESS'}/>
    </View>

  )
}
