import React , { useState, useEffect } from 'react';
import Base from './src/jsx/base';


export default function App(props) {
  const [isWaiting, setWaiting] = useState(true);
  
  return (
    <Base animating={isWaiting}/>
  );
  
}




