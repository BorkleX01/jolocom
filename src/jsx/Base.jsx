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
  const [ newTF, setNewTF ] = useState(true)
  useEffect(() =>
  {
    
    if(loaded){ 
     
      setRequestSent(false)
      typeof loaded.question !== 'undefined' ? setQuiz(loaded) : setErr(loaded)
        
    } 
    
    if(answered){
     
      setRequestSent(false)
      typeof answered.answers !== 'undefined' ? setResults([answered.answers.Yes, answered.answers.No]) : setErr(answers)
        
        
    }
    if(err){
      
      setRequestSent(false)
        typeof err.error === 'undefined' ? setStatBar('NET_ERROR') : setStatBar('API_ERROR')
    }
    
    if(requestSent){
     
      setErr()
      setQuiz()
      setAnswered(false)
      setResults(false)
    }
    if (newTF)
    {
      
    }
  },[requestSent, loaded, pin, err, answered, newTF])

  const { vert } = BaseStyle()
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
    let path = env.apiUrl + '?id='+ pin +'&op=submitAnswer' + '&yn='+yn
    console.log(path)
    getQuiz(path)
      .then((res)=>{setAnswered(res)})
    setRequestSent(true)
  }

  
  const makeTF = ()=> {
    
    return (<TextField
              visible={!quiz}
              animParams={centrum}
              setPin={setPin}
              goBtnReady={()=>setSubmitReady(true)}/>)
    
  }
  
  return (

    <View style={{height: "100%", backgroundColor:"70"}}>
      <Status visible={err} msg={statBar}/>
      <View style={vert}>

        {makeTF()}
        
        <Progbar visible={requestSent}
                 animParams={centrum}/></View>
      
      <QuestionCard visible={quiz} animParams={centrum} 
                    quiz={ quiz ? {...quiz} : null}
                    results = { results }  
                    answer={ submitQuiz }
                    setPin={setPin}
                    pin={ pin }/>
      
      <GoButton visible={submitReady} 
                goBtnProcess={submitRequest} 
                goBtnRestart={()=>setNewTF(true)} 
                goBtnDoAnother={requestRandom}
                label={ !loaded ? 'PROCESS' 
                        : requestSent ? '...' 
                        : err ? 'RETRY' 
                        : results ? 'RANDOM' 
                        : 'START OVER'} />
      
    </View>

  )
}
