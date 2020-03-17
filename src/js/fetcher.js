import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
import env from '../api/expo-constants';
import { Linking } from 'expo' 



export async function getEnv() {
  console.log("getEnv")

}

export async function getQuiz(path,  ...rest) {
  console.log(arguments[1])
  console.info("loading from : " , path)
  
  let o = {}
  try {
    let len = 0
    let data = []
    let resp = await fetch(path)
    let respJS = await resp.json()
    o = respJS
  } catch (error) {
    o = error
  } finally {
    console.log(o)
    return o
  }
}
