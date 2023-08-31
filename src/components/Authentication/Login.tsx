import { Col, Row } from "antd";
import CareLibraryIcon from "../../assets/icons/logo.jpg";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import SignUp from "../../assets/Login/Sign-up.svg"
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import { useForgetPasswordRequestMutation, useNewPasswordRequestMutation, useSignInPostRequestMutation } from "../../store/Slices/Signin";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useChangePasswordPostRequestMutation } from "../../store/Slices/ChangePassword";
import { useAuthSignUpMutation } from "../../store/Slices/Products";

//comment for testing
const Login = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [changePasswordErrorMessage, setChangePasswordErrorMessage] =
    useState("");
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();
  const [signInPostRequest, { isLoading }] = useSignInPostRequestMutation();
  const [forgetPasswordRequest ,{isLoading:isLoadingForgetPassword}]=useForgetPasswordRequestMutation()
  const [resetPasswordRequest ,{isLoading:isLoadingNewPassword}]=useNewPasswordRequestMutation()

  const [authSignUp]=useAuthSignUpMutation()
  const [changePasswordPostRequest, { isLoading: changePasswordLoading }] =
    useChangePasswordPostRequestMutation();

  function renderDashboard(role: string): string {
    if (role === "user") {
      return "/services";
    } else if (role === "admin") {
      return "/admin-dashboard";
    }  else {
      return "/services";
    }
  }
  const onFinishSignUp=async (values:any)=>{
    delete values?.confirmpassWord
    if (values?.password === values?.confirmPassword) {
      const payload = {
        email: values.email,
        password: values.password,
        username:values?.username,
        url:window?.location?.origin + "/user-verification"
      };
      const { error, data }: any = await authSignUp({
        payload:{...payload ,role:"user"},

      });
      
      if (!error) {
        navigate("/login");
      } else {
        setChangePasswordErrorMessage(error?.data?.message);
      }
    } else {
      setChangePasswordErrorMessage(
        "New Password and Confirm New Password Should Be Equal"
      );
    }
    
  }

  const onFinish = async (values: any) => {
    const payload = {
      emailOrUsername:values?.emailOrUsername, // values.username,
      password: values?.password,//values.password,
     
    };
    
 
    const { error, data }: any = await signInPostRequest({
      payload,
    });
    
    let token
    const role = data?.data?.user?.roleData?.name;
  

    // console.log("test data", data?.data?.session)

    if (data?.data?.session) {
      navigate(`/reset-password`, {
        state: { session: data?.data?.session, email: values.username },
      });
    } else {
      if (!error) {
        const userData = {
          username: data?.user?.email,
          token: data?.accessToken,
          refreshToken: data?.data?.refreshToken,
          role: data?.user?.role,
        };
        const stringifyData = JSON.stringify(userData);
        localStorage.setItem("careUserData", stringifyData);
   
        navigate(renderDashboard(role))
        
      } else {
        setErrorMessage(error?.data?.message);
      }
    }
  };

  const onFinishForgetPassword=async(values:any)=>{
    const payload={
      email:values?.email,
      url:window?.location?.origin + "/reset-password"
    }
    try{
      const res:any= await forgetPasswordRequest({payload}).unwrap()
    // console.log(res)
    // navigate(`/reset-password?token=${res?.token}`)
   
    }
   catch(error){
    console.log(error)
   }
  }
  const myParam = useLocation().search;
  const resetToken= new URLSearchParams(myParam).get("token");
  const onFinishNewPassword=async(values:any)=>{
    const payload={
      password:values?.password,
      token:resetToken
    }
    try{
  const res= await resetPasswordRequest({payload}).unwrap()
  console.log(res)
    }
    catch(error){
      console.log(error)
     }
   
  }



  const onFinishChangePassword = async (values: any) => {
    if (values?.newPassword === values?.confirmNewPassword) {
      const payload = {
        currentPassword: values.currentPassword,
        updatedPassword: values.newPassword,
      };
      const { error, data }: any = await changePasswordPostRequest({
        payload,
      });
      if (!error) {
        navigate("/login");
      } else {
        setChangePasswordErrorMessage(error?.data?.message);
      }
    } else {
      setChangePasswordErrorMessage(
        "New Password and Confirm New Password Should Be Equal"
      );
    }
  };
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

  return (
    <Row className="care-signin">
      {/* Left Div */}
      <Col xs={0} sm={0} lg={12} xl={14}>
        <div className="left-outer-div">
          <div className="inner-left-div">
            <div>
              <h1 className="heading-1">
                <span  style={{color:"#D1372D"}}>
                  {location?.pathname === "/login"
                    ? "Sign In" 
                    : location?.pathname === "/sign-up"? "Sign Up": "Change Password"}
                </span>
                <span > to</span>
              </h1>
              <h3 className="heading-3" >Gas App</h3>
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
      </Col>
      {/* Right Div for form */}
      {location?.pathname === "/login" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
           
            <div>
              <h2 className="sign-in-gas-app" >Sign In</h2>
              <Form name="emailOrUsername" onFinish={onFinish}>
                <Form.Item
                  name="mobilenumber"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                    { validator: validateEmail },
                  ]}
                >
                  <Input placeholder="Mobile Number" className="input-style" />
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
                    loading={isLoading}
                    className=" login-button-gas-app "
                    block
                  >
                    Sign In
                  </Button>
                  <Col sm={24} className="text-center">
                  <p>OR</p>
                  </Col>
               <Link to="/sign-up">   <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    className=" login-button-gas-app "
                    block
                  >
                    Sign up
                  </Button></Link>
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
      )}
      {/* Change Password */}
      {location?.pathname === "/change-password" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div className="img-div" style={{textAlign:"center"}}>
              <img
                src={CareLibraryIcon}
                alt="care-library-icon"
                width={90}
                height={90}
                style={{borderRadius:"50%"}}
              />
            </div>
            <div>
              <h2 className="Sign-in-heading">Change Passwod</h2>
              <Form name="currentPassword" onFinish={onFinishChangePassword}>
                <Form.Item
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Current Password"
                    className="input-style"
                  />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="New Password"
                    className="input-style"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="confirmNewPassword"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="Confirm New Password"
                    className="input-style"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <p style={{ color: "red" }}>{errorMessage}</p>
                <p style={{ color: "red" }}>{changePasswordErrorMessage}</p>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    className=" btn-signin fw-600 "
                    block
                  >
                    Save Password
                  </Button>
                </Form.Item>
              </Form>
            
              {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
            </div>
          </div>
        </Col>
      )}
       {location?.pathname === "/sign-up" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div>
              <h2 className="Sign-in-heading" style={{textDecoration:"revert" }}>Sign Up</h2>
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
                  style={{color:"white"}}
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
            
              <Form.Item label="Phone Number" name="phoneNumber">
                <PhoneInput
                  containerClass="phone-input-style"
                  inputClass="phone-input-style"
                  country={"pk"}
                  onlyCountries={['pk']}
                  disableDropdown
                  onChange={(value: string) =>
                    form.setFieldsValue({ phoneNumber: value })
                  }
                  placeholder="Phone number"
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
                  style={{color:"white"}}
                    placeholder="Address"
                    className="input-style"
                  />
                </Form.Item>
                <p style={{ color: "red" }}>{errorMessage}</p>
                <p style={{ color: "red" }}>{changePasswordErrorMessage}</p>
                 <p className="fs-16">By Signing up, I agree to Term of use</p>
                <Link to="/forget-password">   <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    className=" login-button-gas-app "
                    block
                  >
                    Sign up
                  </Button></Link>
              </Form>
            
              {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
            </div>
          </div>
        </Col>
      )}
       {location?.pathname === "/forget-password" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div className="img-div" style={{textAlign:"center"}}>
              <img
                src={SignUp}
                alt="care-library-icon"
                width={176}
                height={176}
                style={{borderRadius:"50%"}}
              />
            </div>
            <p className="fs-16 text-center" style={{marginTop:"80px",marginBottom:"80px"}}>By Signing up, I agree to Term of use</p>
            <div>
            <Link to="/login">   <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    className=" login-button-gas-app "
                    block
                  >
                   Login
                  </Button></Link>
            
            
              {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
            </div>
          </div>
        </Col>
      )}
       {location?.pathname === "/reset-password" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div className="img-div" style={{textAlign:"center"}}>
              <img
                src={CareLibraryIcon}
                alt="care-library-icon"
                width={100}
                height={100}
                style={{borderRadius:"50%"}}
              />
            </div>
            <div>
              <h2 className="Sign-in-heading">New Password</h2>
              <Form name="password" onFinish={onFinishNewPassword}>
              <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="New Password"
                    className="input-style"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="confirmNewPassword"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="Confirm New Password"
                    className="input-style"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                   </Form.Item>
                <Form.Item>
                  
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoadingNewPassword}
                    className=" btn-signin fw-600 "
                    block
                  >
                    Save 
                  </Button>
                </Form.Item>
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
