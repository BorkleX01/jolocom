import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ActivityIndicator  } from 'react-native';
import env from '../api/expo-constants';

import TextField from './TextField';
import BaseStyle from '../css/BaseStyle';
import Progbar from './Progbar';
import Status from './Status';
import GoButton from './GoButton';
import QuestionCard from './QuestionCard';
import { getQuiz } from '../js/fetcher'

export default function Base(props) {
  const [ loaded, setLoaded ] = useState()
  const [ answered, setAnswered ] = useState()
  const [ err, setErr ] = useState()
  const [ quiz, setQuiz ] = useState()
  
  const [ pin, setPin ] = useState('')
  const [ submitReady, setSubmitReady ] = useState(false)
  const [ requestSent, setRequestSent ] = useState(false)
  const [ statBar, setStatBar ] = useState()
  
  const [ results, setResults ] = useState()


  useEffect(() =>
  {

    if(loaded){ 
      setRequestSent(false)
      typeof loaded.question !== 'undefined' ? setQuiz(loaded) : setErr(loaded)
        setResults()
    }
    if(answered){
      setRequestSent(false)
      console.log(answered.answers)
      typeof answered.answers !== 'undefined' ? setResults([answered.answers.Yes, answered.answers.No]) : setErr(answers)
        
    }
    if(err){
      setRequestSent(false)
        typeof err.error === 'undefined' ? setStatBar('NET_ERROR') : setStatBar('API_ERROR')
    }
    
    if(requestSent){
      setErr()
      setQuiz()

    }
    
      
  },[requestSent, loaded, pin, err, answered])

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
    let path=env.apiUrl+'?'+'op=fetchRandom'
    console.log(path)
    getQuiz(path)
      .then((res)=>{setLoaded(res)})
    setRequestSent(true)
  }
  
  const submitQuiz = (yn) => {
    console.log('submitQuiz')
    let path = env.apiUrl + '?id='+ pin +'&op=submitAnswer' + '&yn='+yn
    console.log(path)
    getQuiz(path)
      .then((res)=>{setAnswered(res)})
    setRequestSent(true)
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
                 animParams={centrum}/></View>
      

      <QuestionCard visible={quiz} animParams={centrum} 
                    quiz={ quiz ? {...quiz} : null}
                    results={ results }  
                    answer={submitQuiz}/>
      
      <GoButton visible={submitReady} 
                goBtnProcess={submitRequest} 
                goBtnRestart={()=> props.reStart} 
                goBtnDoAnother={requestRandom}
                label={ !loaded ? 'PROCESS' 
                : requestSent ? '...' 
                : err ? 'RETRY' 
                : results ? 'RANDOM' 
                : 'END'} />
                
    </View>

  )
}
