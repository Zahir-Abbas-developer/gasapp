import { useEffect, useState } from "react";
import { Button,Box } from "@mui/material";
import OtpInput from "react-otp-input";
import {Link} from 'react-router-dom';
import "./otp.scss";
const Otp=()=>{

    return(

     <OtpInput value={""}onChange={()=>{}} numInputs={5} separator={<span style={{ width: "13px" }}></span>}
                // isInputNum={true} shouldAutoFocus={true} 
                // errorStyle={{ border: "1px solid red"}}
                // hasErrored={errormessage || checkcode || (minutes === 0 && seconds === 0) ? true : false}
              /> 
    )
}


export default function OtpVerifications() {
//   const [initailCode, setInitailCode] = useState("12345");
//   const [errormessage, setErrormessage] = useState(false);
//   const [checkcode, setCheckcode] = useState(false);
//   const [code, setCode] = useState("");
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(30);

//   useEffect(() => {
//     let myInterval = setInterval(() => {
//       if (seconds > 0) {
//         setSeconds(seconds - 1);
//       }
//       if (seconds === 0) {
//         if (minutes === 0) {
//           clearInterval(myInterval);
//         } else {
//           setMinutes(minutes - 1);
//           setSeconds(59);
//         }
//       }
//     }, 1000);
//     return () => {
//       clearInterval(myInterval);
//     };
//   },[initailCode,minutes,seconds]);

//   const ResendCode =  () => {
//     setInitailCode("56789");
//     setCode("");
//     setSeconds(30);
//   };
//  const handleChange = (code: any) => {
//     setCode(code);

//     if (initailCode === code || (minutes === 0 && seconds === 0)) {
//       setErrormessage(false);
//       } else {
//       setErrormessage(true);
//       if (code.length < 1) {
//         setCheckcode(true);
//       } else {
//         setCheckcode(false);
//       }
//     }
//   };
return (
    <Box className="otpModal-wrapper">
      <Box className="Otp_App">
          <>
            <p className="completeProcess">Please enter the verification code sent to process your payment </p>
            <div className="OtpVerification">
              {/* <OtpInput value={code}onChange={()=>{}} numInputs={5} separator={<span style={{ width: "13px" }}></span>}
                // isInputNum={true} shouldAutoFocus={true} 
                // errorStyle={{ border: "1px solid red"}}
                // hasErrored={errormessage || checkcode || (minutes === 0 && seconds === 0) ? true : false}
              /> */}
            </div>
            {/* {errormessage ? <p className="ErrorMessage error-color">Invalid Code</p> : ""}
            {checkcode ? <p className="ErrorMessage error-color">Enter authentication code</p> : ""} */}
              <>
                <div>
                  {/* {minutes === 0 && seconds === 0 ? (<p className="ErrorMessage error-color">Code expired</p>) : (
                    <h1 className="fw-500 fs-16 error-color">
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </h1>
                  )} */}
                </div>
                <div>
                  <p className="ResendCode"> 
                    Didn’t receive the verification code?
                    <br />
                    {/* <Link to="" onClick={ResendCode} className="cursor-pointer secondary-color"> Resend Code </Link> */}
                  </p>
                </div>
                <div className="stepperBtn">
                  {/* <Button variant="contained" sx={{width:"70%",margin:'auto'}} onClick={()=>{close()}} className="btn-primary">
                    Continue
                  </Button> */}
                </div>
              </>
          </>
      </Box>
    </Box>
  );
}
