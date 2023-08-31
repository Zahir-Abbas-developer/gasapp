import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Row, Col, Input, Form } from "antd";

export const ConfirmationCode = (props: any) => {
  const { setIsCodeConfirmation, isCodeConfirmation, setIsVerified } = props;
  const [isReSend, setIsReSend] = useState(false);

  const [validationText, setvalidationText] = useState("");

  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [expiryTime, setExpiryTime] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (expiryTime > 0) {
        setExpiryTime((prevExpiryTime) => prevExpiryTime - 1);
      } else {
        setvalidationText("OTP has expired. Please request a new OTP.");
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [expiryTime]);

  const inputRefs: any = Array(4)
    .fill(0)
    .map(() => React.createRef());
  const handlePaste = (e: any, index: any) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text");
    const otpArray = pasteData.split("").slice(0, 4);
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

  const handleChange = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;
    if (value.length === 1 && /^\d+$/.test(value)) {
      switch (name) {
        case "otp1":
          setOtp1(value);
          break;
        case "otp2":
          setOtp2(value);
          break;
        case "otp3":
          setOtp3(value);
          break;
        case "otp4":
          setOtp4(value);
          break;
        default:
          break;
      }
    }
    console.log("handleChange clicked");
    setIsReSend(false);
    otpValues?.slice(0, otpValues?.length - 1).every((item) => item !== "") &&
      setvalidationText("");
    // console.log(otpValues?.slice(0, otpValues?.length - 1).every(item => item !== ""));
  };

  const handleVerify = (event: any) => {
    event.preventDefault();
    const enteredOtp = otp1 + otp2 + otp3 + otp4;
    // do validation and submit the OTP
    console.log(otpValues?.every((item) => item !== ""));

    if (otpValues?.every((item) => item !== "")) {
      setIsCodeConfirmation(false);
      setvalidationText("");
      setIsVerified(true);
    } else setvalidationText("Please Enter the code");
  };

  return (
    <div>
      <Modal
        centered
        open={isCodeConfirmation}
        className="myAccount-otp-wrapper modal-theme"
        width={760}
        footer={null}
        onOk={() => {
          setIsCodeConfirmation(false);
        }}
        onCancel={() => {
          setIsCodeConfirmation(false);
        }}
        okText="Delete"
        cancelText="Cancel"
      >
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <span className="fs-24 fw-600 line-height-20 code-verif-title account-modal-title-color">
            Four digit code has been sent to (+92 900 - 78601)
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
            ref={inputRefs[0]}
            value={otpValues[0]}
            onPaste={(e) => handlePaste(e, 0)}
            onInput={(e) => handleInput(e, 0)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            onBlur={(e) => handleBlur(e, 0)}
            onChange={handleChange}
          />
          <Input
            className="otp-inputs"
            maxLength={1}
            ref={inputRefs[1]}
            value={otpValues[1]}
            onPaste={(e) => handlePaste(e, 1)}
            onInput={(e) => handleInput(e, 1)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            onBlur={(e) => handleBlur(e, 1)}
            onChange={handleChange}
          />
          <Input
            className="otp-inputs"
            maxLength={1}
            ref={inputRefs[2]}
            value={otpValues[2]}
            onPaste={(e) => handlePaste(e, 2)}
            onInput={(e) => handleInput(e, 2)}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            onBlur={(e) => handleBlur(e, 2)}
            onChange={handleChange}
          />
          <Input
            className="otp-inputs"
            maxLength={1}
            ref={inputRefs[3]}
            value={otpValues[3]}
            onPaste={(e) => handlePaste(e, 3)}
            onInput={(e) => handleInput(e, 3)}
            onKeyDown={(e) => handleKeyDown(e, 3)}
            onBlur={(e) => handleBlur(e, 3)}
            onChange={handleChange}
          />
        </div>
        {validationText && (
          <div style={{ position: 'relative' }}>
            <p className="two-factor-auth-error fs-14 fw-400 m-0" style={{ position: 'absolute', bottom: '5px', left: '4px', width: '100%' }}>
              {validationText}
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Button key="Continue" type="primary" style={{ backgroundColor: "#E76F51" }} onClick={handleVerify}>
            Verify
          </Button>
        </div>

        <div style={{ textAlign: "center", marginTop: "40px", paddingBottom: '50px' }}>
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
        </div>
      </Modal>
    </div>
  );
};
