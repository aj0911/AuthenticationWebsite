import React, { useEffect, useState } from 'react'
import './Login.css'
import { AiFillGithub, AiOutlineFacebook, AiOutlineGoogle } from 'react-icons/ai'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, fbProvider, githubProvider, provider } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser';
import generateOtp from '../Helper/GenerateOTP'
import Loader from '../Helper/Loader'

const Login = ({setValue}) => {
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cPassword,setCPassword] = useState('');
    const [otp,setOtp] = useState('');
    const [code,setCode] = useState('');
    const [Register,setRegister] = useState(false);
    const [isOtp,setIsOtp] = useState(false);
    const navigate = useNavigate();
    const [loader,setLoader] = useState(false);

    const handleGoogleClick=()=>{
        setLoader(true);
        signInWithPopup(auth,provider).then(data=>{
            setValue(data.user);
            localStorage.setItem("user",data.user);
            toast.success('Login Successfull');
            navigate('home');
        }).catch(err=>{
            toast.warn(err);
        }).finally(()=>{
            setLoader(false);
        })
    }
    const handleFacebookClick=()=>{
        setLoader(true);
        signInWithPopup(auth,fbProvider).then(data=>{
            setValue(data.user);
            localStorage.setItem("user",data.user);
            toast.success('Login Successfull');
            navigate('home');
        }).catch(err=>{
            toast.warn(err);
        }).finally(()=>{
            setLoader(false);
        })
    }
    const handleGitHubClick=()=>{
        setLoader(true);
        signInWithPopup(auth,githubProvider).then(data=>{
            setValue(data.user);
            localStorage.setItem("user",data.user);
            toast.success('Login Successfull');
            navigate('home');
        }).catch(err=>{
            toast.warn(err);
        }).finally(()=>{
            setLoader(false);
        })
    }
    const handleClickLogin =(e)=>{
        e.preventDefault();
        setLoader(true);
        signInWithEmailAndPassword(auth,email,password).then(data=>{
            setValue(data.user);
            localStorage.setItem("user",data.user);
            toast.success('Login Successfull');
            navigate('home');
        }).catch(err=>{
            toast.warn(err.message);
            setEmail('');
            setPassword('');
        }).finally(()=>{
            setLoader(false);
        })
    }

    const handleClickRegister =(e)=>{
        e.preventDefault();
        setLoader(true);
        if(isOtp){
            if(otp!==code){
                toast.warn('OTP is incorrect');
                setLoader(false);
            }
            else{
                createUserWithEmailAndPassword(auth,email,password).then(data=>{
                    setValue(data.user);
                    localStorage.setItem("user",data.user);
                    toast.success('Login Successfull');
                    navigate('home');
                }).catch(err=>{
                    toast.warn(err.message);
                    setEmail('');
                    setPassword('');
                }).finally(()=>{
                    setLoader(false);
                })
            }

        }
        else{
            if(password!==cPassword)toast.warn('Password and Confirm Password must be same');
            else{
                setLoader(true);
                const crack = generateOtp(6);
                emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID,{
                    email,
                    message:'Your OTP is '+crack
                },process.env.REACT_APP_PUBLIC_KEY)
                .then(function(response) {
                    toast.success('OTP Sent to the email');
                    setCode(crack);
                    setIsOtp(true);
                }, function(error) {
                    toast.warn(error.text);
                }).finally(()=>{
                    setLoader(false);
                });
            }
        }
    }

  return (
    
    <div className="login">
        <div style={{width:(window.innerWidth>999)?(Register)?'40%':'60%':'100%',visibility:(!Register)?'':'hidden'}} className="left">
            <h3>Log In</h3>
            <p>Your password is the key to your personal and financial life. Treat it with the same care and respect you do your front door key.</p>
        </div>
        <div style={{width:(window.innerWidth>999)?(Register)?'60%':'40%':'100%',visibility:(Register)?'':'hidden'}} className="left">
            <h3>Register</h3>
            <p>Passwords are like underwear: don't let people see it, change it very often, and you shouldn't share it with strangers.</p>
        </div>
        <div style={{left:(window.innerWidth>999)?(Register)?'10px':'60%':'10px'}} className="slider">
            {
                (loader)?<Loader/>:
                (Register)?
                <>
                    <h3>Register</h3>
                    <p>to get access your files</p>
                    <form  onSubmit={(e)=>handleClickRegister(e)}>
                        {
                            (isOtp)?
                                <input type="number" onChange={(e)=>setOtp(e.target.value)}placeholder={'OTP'} required={true}/>
                                :
                            <>
                                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email' required={true} />
                                <input onChange={(e)=>setPassword(e.target.value)} type="password"  placeholder='Password' required={true} />
                                <input onChange={(e)=>setCPassword(e.target.value)} type="password"  placeholder='Confirm Password' required={true} />
                            </>
                        }
                        <input type="submit" value={(isOtp)?'Confirm':'Register'} />
                    </form>
                    {
                        (isOtp)?<p onClick={()=>{setCode('');setIsOtp(false);setOtp('')}}>Want to Change the Email?</p>:
                        <p>Already have an Account? <span onClick={()=>setRegister(false)}>Login</span> </p>
                    }
                </>
                :
                <>
                    <h3>Log In</h3>
                    <p>to get access your files</p>
                    <div className="btns">
                        <button onClick={handleFacebookClick}>
                            <div className="btn">
                                <AiOutlineFacebook/>
                                <h3>Login in with Facebook</h3>
                            </div>
                        </button>
                        <button onClick={handleGoogleClick}>
                            <div className="btn">
                                <AiOutlineGoogle/>
                                <h3>Login in with Google</h3>
                            </div>
                        </button>
                        <button onClick={handleGitHubClick}>
                            <div className="btn">
                                <AiFillGithub/>
                                <h3>Login in with Github</h3>
                            </div>
                        </button>
                    </div>
                    <div className="or">
                        <div className="line"></div>
                        <p>OR</p>
                        <div className="line"></div>
                    </div>
                    <form  onSubmit={(e)=>handleClickLogin(e)}>
                        <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email' required={true} />
                        <input onChange={(e)=>setPassword(e.target.value)} type="password"  placeholder='Password' required={true} />

                        <input type="submit" value={'Log in'} />
                    </form>
                    <p>Don't have an Account? <span onClick={()=>setRegister(true)}>Register</span> </p>
                </>
            }
        </div>
    </div>
  )
}

export default Login