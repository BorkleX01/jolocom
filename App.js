import React , { useState, useEffect } from 'react';
import { View } from 'react-native';
import env from './src/api/expo-constants';
import { Linking } from 'expo'
import { getEnv , getQuiz } from './src/js/fetcher';
import Base from  './src/jsx/Base'; 

export default function App() {
  const [isWaiting, setWaiting] = useState(true);


  
  const [pathApi, setpathApi] = useState('')
  const [progress , setProgress] = useState(0)

  const [err, setErr] = useState()
  const [quiz, setQuiz] = useState()


  const [loaded, setLoaded] = useState(false)
  const [pin, setPin] = useState('1337')
  const [appState, setAppState] = useState({})
  
  useEffect(()=>{
    if (!loaded)
    {
      init()
    }

  }, [loaded])

  

  async function init() {
    let path =  env.apiUrl+'?id=' + pin
    console.log(path)
    let respObj = await getQuiz(path)
    setAppState(respObj)
  }


  return (
    <View style={{height: '100%'}}>
      <Base appState={appState}/>
    </View>
  );
}

/*
    console.info(respObj)
    console.log(respObj['error'] ? 'truly error' : 'maybe network error untruly error undefined type and value')
    console.log(typeof respObj.error ) //true if api error undefined if not?
    console.log(respObj.error )

    console.log(respObj.question ? 'truly success' : 'not question')
    console.log(typeof respObj.question ) //string //undefined if failed
    console.log(respObj.question )

    console.log(respObj ? 'truly caught success untruly error' : 'what then?') //catches when successful
    console.log(typeof respObj)
    console.log(respObj) //printable if truly error //

*/
