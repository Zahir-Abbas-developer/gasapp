import { Checkbox, Col, Row } from "antd";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./SignIn.scss";
import {
  useForgetPasswordRequestMutation,
  useNewPasswordRequestMutation,
  useSignInPostRequestMutation,
} from "../../store/Slices/Signin";


import { useAuthSignUpMutation } from "../../store/Slices/Products";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import { ConfirmationCode } from "../Otp/otp";

//comment for testing
const Login = () => {


  let navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();
  const [otpShow, setOtpShow] = useState(false)
  const [isLoadingSignIn ,setIsLoadingSignIn]=useState(false)
  const [isLoadingSignUp ,setIsLoadingSignUp]=useState(false)
  const [phoneNumber ,setPhoneNumber]=useState({})
  const [isCheckbox ,setIsCheckbox]=useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [authSignUp] = useAuthSignUpMutation();
 
    const onChange = (e:any) => {
      setIsChecked(e.target.checked);
      setErrorMessage('');
    };
  
  const onFinishSignUp = async (values: any) => {
    if (!isChecked) {
      setErrorMessage('You must agree to the terms of use.');
      return;
    }
    delete values?.confirmpassWord;
  
    setIsLoadingSignUp(true)
    if (values?.password === values?.confirmPassword) {
      const payload = {
        email: values.email,
        password: values.password,
        username: values?.username,
        address:values?.address,
        phoneNumber:`+${values?.phoneNumber}`
      };
      const { error, data }: any = await authSignUp({
        payload: { ...payload, role: "user" },
      });
      setIsCheckbox(true)
      if (!error) {
        navigate("/confirmation-signup");
      } else {
     
        setIsLoadingSignUp(false)
      }
    }
  };

  const onFinish = async (values: any, optioanlBoolean?: boolean) => {
    navigate("/services")
    // try {
    //   if (!optioanlBoolean) {
    //     setIsLoadingSignIn(true)
    //     const baseURL = "https://eager-fly-handkerchief.cyclic.app"
    //     const { data } = await axios.post(baseURL + "/auth/login", { phoneNumber: values.mobilenumber })
    //     console.log("🚀 ~ file: Login.tsx:81 ~ onFinish ~ data:", data)
    //     setPhoneNumber(data)
    //     setIsLoadingSignIn(false);
    //   }
     
    //   onCaptchaVerify();
    //   const payload = {
    //     phoneNumber: values.mobilenumber,
    //   };
    //   const appVerifier = (window as any).recaptchaVerifier;
    //   signInWithPhoneNumber(auth, payload.phoneNumber, appVerifier).then((result: any) => {
    //     setOtpShow(true);  
    //     (window as any).confirmationResult = result;
    //     console.log("hurray", result)
        

    //   }).catch(err => console.log("errrrrrrrr", err))
    // } catch (err: any) {
    //   console.log("Errrrr", err?.response?.data)
    //   setErrorMessage(err?.response?.data?.message);

    // }
    // const { error, data }: any = await signInPostRequest({
    //   payload,
    // });

    // let token
    // const role = data?.data?.user?.roleData?.name;

    // console.log("test data", data?.data?.session)

    // if (data?.data?.session) {
    //   navigate(`/reset-password`, {
    //     state: { session: data?.data?.session, email: values.username },
    //   });
    // } else {
    //   if (!error) {
    //     const userData = {
    //       username: data?.user?.email,
    //       token: data?.accessToken,
    //       refreshToken: data?.data?.refreshToken,
    //       role: data?.user?.role,
    //     };
    //     const stringifyData = JSON.stringify(userData);
    //     localStorage.setItem("careUserData", stringifyData);

    //     navigate(renderDashboard(role))

    //   } else {
    //     setErrorMessage(error?.data?.message);
    //   }
    // }
  };

  const onCaptchaVerify = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            console.log("window 132231")
            onFinish({ mobilenumber: form.getFieldValue("mobilenumber") }, true)
          },
          "expired-callback": () => { },
        }
      );
    }
  };


  const myParam = useLocation().search;


  const validateEmail = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback();
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        callback();
      } else {
        callback("Invalid format of email");
      }
    }
  };
  const validatePhoneNumber = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(); // No value provided, validation passes.
    } else {
      // Regular expression to validate phone numbers.
      // This example assumes a simple format of numbers only.
      const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

      if (phoneRegex.test(value)) {
        callback(); // Valid phone number format, validation passes.
      } else {
        callback("Invalid format of phone number"); // Invalid phone number format.
      }
    }
  };
// Define a function to handle the onChange event
const handlePhoneNumberChange = (value:any) => {
  form.setFieldsValue({ phoneNumber: value });
};

  return (
    <Row className="care-signin">
      {/* Left Div */}
     {!otpShow && <Col xs={0} sm={0} lg={6} xl={14}>
        <div className="left-outer-div">
          <div className="inner-left-div">
            <div>
              <h1 className="heading-1">
                <span style={{ color: "#D1372D" }}>
                  {location?.pathname === "/login"
                    ? "Sign In"
                    : location?.pathname === "/sign-up"
                      ? "Sign Up"
                      : "Change Password"}
                </span>
                <span> to</span>
              </h1>
              <h3 className="heading-3">LNG</h3>
            </div>
            {/* <div>
              <p className="p-tag-description-1">If you don't have an account register</p>
              <p className="p-tag-description-2">
                You can
                <span className="pink-color fw-600"> Register</span>
                <span> here!</span>
              </p>
            </div> */}
            {/* <div className="demo-wrap">
              <div className="demo-content">
                <img src={LazyIcon} alt="care-library-icon" />
              </div>
            </div> */}
          </div>
        </div>
      </Col>}
      {/* Right Div for form */}
      {location?.pathname === "/login" &&
       !otpShow && 
        <Col xs={24} sm={24} lg={18} xl={10}>
        <div className="right-outer-div">
          <div>
            <div id="recaptcha-container"></div>

            <h2 className="sign-in-gas-app">Sign In</h2>
            <Form name="emailOrUsername" onFinish={onFinish} form={form}>
              <Form.Item
                name="mobilenumber"
                // rules={[
                //   {
                //     required: true,
                //     message: "Required field",
                //   },
                //   { validator: validatePhoneNumber },
                // ]}
              >
                <Input placeholder="Mobile Number +92*********" className="input-style" />
              </Form.Item>

              <p style={{ color: "red" }}>{errorMessage}</p>

              {/* <div style={{ textAlign: "end", margin: "10px 0px 20px 0px" }}>
                  <Link to="/forget-password" className="forgot-password-style">
                    Forget Password?
                  </Link>
                </div> */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoadingSignIn}
                  className=" login-button-gas-app "
                  block
                >
                  Sign In
                </Button>
                <Col sm={24} className="text-center">
                  <p>OR</p>
                </Col>
                <Link to="/sign-up">
                  {" "}
                  <Button
                    type="primary"
                    htmlType="submit"
                 
                    className=" login-button-gas-app "
                    block
                  >
                    Sign up
                  </Button>
                </Link>
                {/* <div style={{ textAlign: "end", margin: "10px 0px 20px 0px" }}>
                  <Link to="/sign-up" className="forgot-password-style">
                  New to Solace Leather? <span style={{textDecoration:"revert"}}>Sign Up</span>
                  </Link>
                </div> */}
              </Form.Item>
            </Form>

            {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
          </div>
        </div>
      </Col> 
      
      }
      {otpShow && 
        <Col sm={24} style={{textAlign:"center",backgroundColor:"white"}}>
        <ConfirmationCode confirmationResult={(window as any).confirmationResult} phoneNumber={phoneNumber} />
        </Col>
      }
      {location?.pathname === "/sign-up" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div>
              <h2
                className="Sign-in-heading"
                style={{ textDecoration: "revert" }}
              >
                Sign Up
              </h2>
              <Form name="currentPassword" onFinish={onFinishSignUp}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  <Input
                    placeholder="Full Name"
                    className="input-style"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                    { validator: validateEmail },
                  ]}
                >
                  <Input placeholder="Email" className="input-style" />
                </Form.Item>

                <Form.Item name="phoneNumber"   rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]} >
                  <PhoneInput
                    containerClass="phone-input-style"
                    inputClass="phone-input-style"
                    country={"pk"}
                    onlyCountries={["pk"]}
                    disableDropdown
                    onChange={handlePhoneNumberChange}
                    placeholder="Phone number"
                    inputStyle={{background: "rgba(238, 46, 126, 0.05)",height:"50px",border:"1px solid black"}}
                  />
                </Form.Item>

                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  <Input
                   
                    placeholder="Address"
                    className="input-style"
                  />
                </Form.Item>
                <Form.Item>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <p className="fs-16">
          <Checkbox
            checked={isChecked}
            onChange={onChange}
          />
           <span style={{marginLeft:"5px"}}>By Signing up, I agree to Term of use</span>
        </p>
      </Form.Item>
                  {" "}
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoadingSignUp}
                    className=" login-button-gas-app "
                    block
                  >
                    Sign up
                  </Button>
                
              </Form>

              {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
            </div>
          </div>
        </Col>
      )}

    </Row>
  );
};

export default Login;
