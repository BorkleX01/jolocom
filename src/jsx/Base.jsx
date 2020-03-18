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
  const [ loaded, setLoaded ] = useState()
  const [ err, setErr ] = useState()
  const [ quiz, setQuiz ] = useState()
  
  const [ pin, setPin ] = useState('')
  const [ submitReady, setSubmitReady ] = useState(false)
  const [ requestSent, setRequestSent ] = useState(false)
  const [ statBar, setStatBar ] = useState()

  useEffect((didUpdate) =>
  {
    if(requestSent){
      setQuiz()
      setErr()
    }
    
    if(loaded){
      setRequestSent(false)
      typeof loaded.question !== 'undefined' ? setQuiz(loaded) : setErr(loaded)
      
    }

    if(err){
      setRequestSent(false)
      typeof err.error === 'undefined' ? setStatBar(err) : setStatBar('API_ERROR')
    }
    
  },[requestSent, loaded, err, pin])

  const { box , vert } = BaseStyle()
  const centrum = { fVal:-1, dur:250 }
  
  const submitRequest= () => {
    let path = env.apiUrl+'?id='+pin+'&op=fetchRoom'
    console.log(path)
    getQuiz(path)
      .then((res)=>{setLoaded(res)})
    setRequestSent(true)
  }

  const requestRandom = () => {
    let path=env.apiUrl+'?'+'op=fetchRoom'
    console.log(path)
    getQuiz(path)
      .then((res)=>{setLoaded(res)})
  }
  
  const submitQuiz = (yn) => {
    console.log('submitQuiz')
    let path = env.apiUrl + '?id='+ pin +'&op=fetchRoom' + '&yn=' + yn
    console.log(path)
    getQuiz(path)
    .then((res)=>{setLoaded(res)})
  }
  
  return (

    <View style={{height: "100%", backgroundColor:"70"}}>
      <Status visible={err} msg={statBar}/>
      <View style={vert}>
        <TextField visible={!quiz}
                   animParams={centrum}
                   setPin={setPin}
                   goBtnReady={()=>setSubmitReady(true)}/>
        <Progbar visible={requestSent}
                 animParams={centrum}/>
      </View>

      <QuestionCard visible={quiz} animParams={centrum}
                    answer={submitQuiz}/>
      
      <GoButton visible={submitReady} 
                goBtnProcess={submitRequest} 
                goBtnRestart={()=> props.reStart} 
                goBtnDoAnother={()=> requestRandom()}
                label={'PROCESS'}/>
    </View>

  )
}
