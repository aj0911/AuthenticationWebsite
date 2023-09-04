import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import Loader from '../Helper/Loader';

const Home = ({value,setValue}) => {
  const navigate = useNavigate();
  const [loader,setLoader] = useState(false);

  const handleLogOut = ()=>{
    setLoader(true);
    signOut(auth).then(() => {
      localStorage.clear();
      setValue('')
      toast.success('Logout Successfull');
      navigate('/');
    }).catch((error) => {
      toast.warn('Error while logout');
    }).finally(()=>{
      setLoader(false);
    });
  }

  useEffect(()=>{
    if(!value){
      navigate('/');
    }
  },[])

  return (
    (loader)?<Loader/>:
    <div className="home">
      <div className="btnData">
        <button onClick={handleLogOut}>Log Out</button>
      </div>
      <div className="content">
        <h3>You Successfully Logged In</h3>
        <div className="data">
          <h5>{(value.displayName!==null)?`Name: ${value.displayName}`:''}</h5>
          <h5>Email: {value.email}</h5>
          {
            (value.photoURL!==null)?
            <img src={value.photoURL} alt="" />:''
          }
        </div>
      </div>
    </div>
  )
}

export default Home