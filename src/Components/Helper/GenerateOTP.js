const generateOtp = (limit)=>{
    let otp = '';
    for(let i=0;i<limit;i++){
        otp+= Math.floor(Math.random()*10);
    }
    return otp;
}

export default generateOtp;