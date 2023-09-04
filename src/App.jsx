import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Main from './Components/Main/Main';
import Home from './Components/Home/Home';


const App = () => {
  const [value,setValue] = useState('');
  const MainCom = ()=><Main value={value} setValue={setValue}/>
  const HomeCom = ()=><Home setValue={setValue} value={value}/>
  return (
    <div className="App">
        <Routes>
            <Route Component={MainCom} path='/' />
            <Route Component={HomeCom} path='/home' />
        </Routes>
        <ToastContainer/>
    </div>
  )
}

export default App