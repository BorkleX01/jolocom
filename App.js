import React , { useState, useEffect } from 'react';
import { View } from 'react-native';
import env from './src/api/expo-constants';
import { Linking } from 'expo'
import { getEnv , getQuiz } from './src/js/fetcher';
import Base from  './src/jsx/Base'; 

export default function App() {
  const [pin, setPin] = useState('1337')
  const [appState, setAppState] = useState({})
  
  useEffect(()=>{
    if (!appState)
    {
      init()
    }

  }, [])

  

  async function init() {
    let path =  env.apiUrl+'?id=' + pin
    console.info('init', path)
    let respObj = await getQuiz(path)
    setAppState(respObj)
  }


  return (
    <View style={{height: '100%'}}>
      <Base appState={appState} startOver={()=>init()}/>
    </View>
  );
}

