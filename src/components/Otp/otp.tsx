import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Row, Col, Input, Form } from "antd";
import PhoneInput from "react-phone-input-2";
import './otp.scss'
import { useNavigate } from "react-router-dom";
import {  doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { renderDashboard } from "../../utils/useRenderDashboard";
export const TwoFactorAuth = (props: any) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
  const [phoneError, setPhoneError] = useState(false);
  const [form] = Form.useForm();

  const { isTwoFactorAuth, setISTwoFactorAuth, setIsCodeConfirmation } = props;
  return (
    <>
      <div className=" card-bg-color">
        <Modal
          title={<span className="fs-20 fw-500" style={{ fontFamily: 'Inter' }}>Two-factor authentication</span>}
          width={608}
          centered
          open={isTwoFactorAuth}
          onCancel={() => setISTwoFactorAuth(false)}
          className="account-modal-wrapper modal-theme"
          footer={false}
        >
          <div style={{ padding: "0px 37px", marginTop: "32px" }}>
            <span className="fs-14 fw-400 title-color line-height-20">
              Ensure top-level security for your account with Two-Factor
              Authentication.
            </span>
            <div>
              <p
                className="title-color fs-12 fw-500 m-0 label-color "
                style={{ marginTop: "20px", marginBottom: '5px' }}
              >
                Phone
              </p>

              <Form form={form}>
                <Form.Item
                  // label="Phone Number"
                  name="phoneNumber"
                  // className={phoneError ? 'phone-error-input' : "phone-input"}
                  rules={[
                    {
                      required: true,
                      min: 5,
                      message: "Required field",
                      validator(_, value) {
                        if (value.length > 4) {
                          return Promise.resolve(setPhoneError(false));
                        }
                        return Promise.reject(setPhoneError(true));
                      },
                    },
                  ]}
                >
                  <PhoneInput
                    containerClass="phone-input-style"
                    inputClass="phone-input-style"
                    country={"pk"}
                    value={phoneNumberInput}
                    onChange={(phone: any) => setPhoneNumberInput(phone)}
                  />
                </Form.Item>
                <div style={{ textAlign: "center", paddingBlock: "1.5rem" }}>
                  <Button
                    key="Continue"
                    type="primary"
                    htmlType="submit"
                    className="fs-16 fw-500"
                    style={{ paddingBottom: '1.9rem' }}
                    onClick={() => {
                      if (phoneNumberInput) {
                        setISTwoFactorAuth(false);
                        setIsCodeConfirmation(true);
                      }
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export const ConfirmationCode = (props: any) => {
  const { confirmationResult,phoneNumber } = props;
  const navigate = useNavigate()
  const [isReSend, setIsReSend] = useState(false);

  const [validationText, setvalidationText] = useState("");

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");
  const [expiryTime, setExpiryTime] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (expiryTime > 0) {
        setExpiryTime((prevExpiryTime) => prevExpiryTime - 1);
      } else {
        // setvalidationText("OTP has expired. Please request a new OTP.");
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [expiryTime]);
  console.log("otp1", phoneNumber)
  const inputRefs: any = Array(6)
    .fill(0)
    .map(() => React.createRef());
  const handlePaste = (e: any, index: any) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text");
    const otpArray = pasteData.split("").slice(0, 6);
    const newOtpValues = [...otpValues];
    otpArray.forEach((char: any, i: any) => {
      newOtpValues[index + i] = char;
    });
    setOtpValues(newOtpValues);
    inputRefs[index + otpArray.length]?.current.focus();
  };
  const handleInput = (e: any, index: any) => {
    const value = e.target.value;
    if (value.length <= 1 && !isNaN(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      inputRefs[index + 1]?.current.focus();
    }
  };
  const handleKeyDown = (e: any, index: any) => {
    if (e.keyCode === 8 && !e.target.value) {
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = "";
      setOtpValues(newOtpValues);
      inputRefs[index - 1]?.current.focus();
    }
  };
  const handleBlur = (e: any, index: any) => {
    // do nothing
  };

  const handleVerify = (event: any) => {
    event.preventDefault();
    const enteredOtp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    // do validation and submit the OTP
    console.log(otpValues?.every((item) => item !== ""));

   
      confirmationResult?.confirm(enteredOtp)?.then(async (res: any) => { console.log(res); getDoc(doc(db, "users", res?.user?.uid)).then((result) => {
        if (result.exists()) {
          console.log(result.data())
          const userData: any = { id: result.id, ...result.data() };
          console.log(userData)
          localStorage.setItem("user", JSON.stringify(userData));
          navigate(renderDashboard(userData?.role || "user"));
        }
      });navigate("/services") }).catch((err: any) => { console.log(err, "errrrrrrrr") })
      // setIsCodeConfirmation(false);
      // setvalidationText("");
      // setIsVerified(true);
  
  };
  useEffect(() => {

  }, [otp1])
  return (
    <div className="myAccount-otp-wrapper">

      <div className="myAccount-otp-wrapper modal-theme" style={{ textAlign: "center", marginTop: "90px" }}>
        <h1 style={{ fontSize: "40px", fontWeight: "700" }}>OTP</h1>
        <span className="fs-24 fw-600 line-height-20 code-verif-title account-modal-title-color">
          Enter 6 digits OTP sent to your  Phone ({phoneNumber?.phoneNumber})
        </span>
        <div style={{ marginTop: "12px" }}>
          <span
            className="fs-16 fw-500 line-height-22"
            style={{ color: "#6F7074" }}
          >
            Please enter the code
          </span>
        </div>
      </div>

      <div className="otp-container">
        <Input
          className="otp-inputs"
          maxLength={1}
          name="otp1"
          ref={inputRefs[0]}
          value={otpValues[0]}
          onPaste={(e) => handlePaste(e, 0)}
          onInput={(e) => handleInput(e, 0)}
          onKeyDown={(e) => handleKeyDown(e, 0)}
          onBlur={(e) => handleBlur(e, 0)}
          onChange={(event: any) => setOtp1(event?.target?.value)}
        />
        <Input
          className="otp-inputs"
          maxLength={1}
          name="otp2"
          ref={inputRefs[1]}
          value={otpValues[1]}
          onPaste={(e) => handlePaste(e, 1)}
          onInput={(e) => handleInput(e, 1)}
          onKeyDown={(e) => handleKeyDown(e, 1)}
          onBlur={(e) => handleBlur(e, 1)}
          onChange={(event: any) => setOtp2(event?.target?.value)}
        />
        <Input
          className="otp-inputs"
          maxLength={1}
          ref={inputRefs[2]}
          name="otp3"
          value={otpValues[2]}
          onPaste={(e) => handlePaste(e, 2)}
          onInput={(e) => handleInput(e, 2)}
          onKeyDown={(e) => handleKeyDown(e, 2)}
          onBlur={(e) => handleBlur(e, 2)}
          onChange={(event: any) => setOtp3(event?.target?.value)}
        />
        <Input
          className="otp-inputs"
          maxLength={1}
          name="otp4"
          ref={inputRefs[3]}
          value={otpValues[3]}
          onPaste={(e) => handlePaste(e, 3)}
          onInput={(e) => handleInput(e, 3)}
          onKeyDown={(e) => handleKeyDown(e, 3)}
          onBlur={(e) => handleBlur(e, 3)}
          onChange={(event: any) => setOtp4(event?.target?.value)}
        />
        <Input
          className="otp-inputs"
          maxLength={1}
          name="otp5"
          ref={inputRefs[4]}
          value={otpValues[4]}
          onPaste={(e) => handlePaste(e, 4)}
          onInput={(e) => handleInput(e, 4)}
          onKeyDown={(e) => handleKeyDown(e, 4)}
          onBlur={(e) => handleBlur(e, 4)}
          onChange={(event: any) => setOtp5(event?.target?.value)}
        />
        <Input
          className="otp-inputs"
          maxLength={1}
          name="otp6"
          ref={inputRefs[5]}
          value={otpValues[5]}
          onPaste={(e) => handlePaste(e, 5)}
          onInput={(e) => handleInput(e, 5)}
          onKeyDown={(e) => handleKeyDown(e, 5)}
          onBlur={(e) => handleBlur(e, 5)}
          onChange={(event: any) => setOtp6(event?.target?.value)}
        />
      </div>
      {validationText && (
        <div style={{ position: 'relative' }}>
          <p className="two-factor-auth-error fs-14 fw-400 m-0" style={{ position: 'absolute', bottom: '5px', left: '4px', width: '100%' }}>
            {validationText}
          </p>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <Button key="Continue" type="primary" style={{ backgroundColor: "#D1372D", width: "229px" }} onClick={handleVerify}>
          Confirm
        </Button>
      </div>

      {/* <div style={{ textAlign: "center", marginTop: "40px", paddingBottom: '50px' }}>
        <span
          className="fs-14 fw-400"
          style={{ color: "#6F7074", paddingRight: "8px" }}
        >
          Didn’t get code?
        </span>
        <span
          className="fs-14 fw-500 account-modal-title-color"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsReSend(true);
            setOtpValues(["", "", "", ""]);
          }}
        >
          Resend
        </span>
        {isReSend && (
          <div style={{ position: 'relative' }}>
            <p className="fs-12 fw-400" style={{ color: "#264653", position: "absolute", top: "10px", right: '4px', width: '100%' }}>
              Code has been resend
            </p>
          </div>
        )}
      </div> */}

    </div>
  );
};
