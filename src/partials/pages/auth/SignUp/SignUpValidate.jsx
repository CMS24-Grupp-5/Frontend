import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../SignIn/SignIn.css"; // samma CSS

const SignUpStepOne = () => {
    const { signUpValidate } = useAuth();
    const navigate = useNavigate();
  
    const [inputOne, setInputOne] = useState("");
    const [inputTwo, setInputTwo] = useState("");
    const [inputThree, setInputThree] = useState("");
    const [inputFour, setInputFour] = useState("");
    const [inputFive, setInputFive] = useState("");
    const [inputSix, setInputSix] = useState("");

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        const inputField = document.getElementById("0");
        inputField?.select();
      }, 100);
      return () => clearTimeout(timeout);
    }, []);

    const validateForm = () => {
        const newErrors = {};
        const allInputs = [inputOne, inputTwo, inputThree, inputFour, inputFive, inputSix];
        const testInputs = allInputs.every(input => input.length === 1);

        if (!testInputs) newErrors.verification = "You have to fill in all the fields";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
        };

    const handleInput = (setDigit) => (e) => {
        const numberRegex = /^[0-9]+$/;
        const value = e.target.value;
        const inputId = e.target.id;

        if (numberRegex.test(value)) {
            setDigit(value)
            
            const nextInputId = parseInt(inputId) + 1;
            const nextInput = document.getElementById(nextInputId.toString());
            
            if (nextInput) {
                nextInput.select();
            }
        }
        else{
            setDigit("")
        }
    };

    const handleKeyDown = (e) => {
      const inputId = parseInt(e.target.id);
      
      if (e.key === "Backspace" && !e.target.value && inputId > 0) {
        const previousInput = document.getElementById((inputId - 1).toString());
        
        if (previousInput) {
          previousInput.select();
      }
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setGeneralError("");
      
      const isValid = validateForm();
      if (!isValid) return;
      
      setLoading(true);
      try {
        const code = inputOne + inputTwo + inputThree + inputFour + inputFive + inputSix;
        let result = await signUpValidate({ code });
     
        if(!result || result === false){
            setGeneralError("Invalid or expired verification code");
            return;
        }
        
        navigate("/signuppassword");
      } catch (err) {
        setGeneralError(err.message || "Signup failed");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="signupContainerValidate">
        <h2 className="signupHeader">Sign up</h2>
        <form onSubmit={handleSubmit} className="formContainerValidate" noValidate>
          <h3 className="">Verification code:</h3>
          <div className="validationInputWrapper">
            <input
              type="text"
              value={inputOne}
              onChange={handleInput(setInputOne)}
              className="validationInputField"
              maxLength={1}
              onKeyDown={handleKeyDown}
              id="0"
            />

            <input
              type="text"
              value={inputTwo}
              onChange={handleInput(setInputTwo)}
              className="validationInputField"
              maxLength={1}
              onKeyDown={handleKeyDown}
              id="1"
            /> 

            <input
              type="text"
              value={inputThree}
              onChange={handleInput(setInputThree)}
              className="validationInputField"
              maxLength={1}
              onKeyDown={handleKeyDown}
              id="2"
            />

            <input
              type="text"
              value={inputFour}
              onChange={handleInput(setInputFour)}
              className="validationInputField"
              onKeyDown={handleKeyDown}
              maxLength={1}
              id="3"
            />

            <input
              type="text"
              value={inputFive}
              onChange={handleInput(setInputFive)}
              onKeyDown={handleKeyDown}
              className="validationInputField"
              maxLength={1}
              id="4"
            />

            <input
              type="text"
              value={inputSix}
              onChange={handleInput(setInputSix)}
              onKeyDown={handleKeyDown}
              className="validationInputField"
              maxLength={1}
              id="5"
            /> 
          </div>

          {errors.verification && (
            <div className="formErrorMessage">{errors.verification}</div>
          )}

          {generalError && <div className="errorMessage">{generalError}</div>}
          {loading && (
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
  
          <button type="submit" className="submitButton" disabled={loading}>
            {loading ? "Loading..." : "Next"}
          </button>
        </form>
      </div>
    );
  };
  
  export default SignUpStepOne;
  