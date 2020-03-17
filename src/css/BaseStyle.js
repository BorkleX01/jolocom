import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function BaseStyle(props) {
  const [fg , setFg] = useState('#000')
  return StyleSheet.create({
    vert : {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    
    box : {
      borderColor: fg,
      borderStyle: 'solid',
      borderWidth: 1
    },

  })
}
     
       
      
//boxShadow: : '0px 0px 12px rgba(0,255,255,1.5)',
