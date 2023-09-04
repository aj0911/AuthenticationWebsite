import React, { useEffect } from 'react'
import './Main.css'
import Login from '../Login/Login'
import { useNavigate } from 'react-router-dom'

const Main = ({setValue,value}) => {
    const navigate  = useNavigate();
    useEffect(()=>{
        if(value!==''){
            navigate('home');
        }
    },[])
  return (
    <div className="main">
        <Login setValue={setValue}/>
    </div>
  )
}

export default Main