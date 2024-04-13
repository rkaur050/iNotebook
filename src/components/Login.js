import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

    const [credentials,setCredentials]=useState({email:"",password:""});
    const navigate=useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
         try{
          const response = await fetch("http://localhost:4000/api/auth/login", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email: credentials.email, password: credentials.password })
          });
          const json = await response.json();
          if(json.success && response.ok ){
            //save auth-token and redirect
            localStorage.setItem('token',json.authToken);
            props.showAlert("Logged in successfully","success");
            navigate("/notes");
          }else{
            props.showAlert("Invlaid credentials","danger");
          }
        }catch (error) {
          console.error("Error:", error);
          props.showAlert("An error occurred", "danger");
      }
          
         
    }

    const onChange = (e) =>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="container">
    <form  onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter your mail id"
          value={credentials.email}
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="form-control"
        value={credentials.password}
        minLength={5}
        required
        onChange={onChange}
      />
      </div>
      <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
    </div>
  );
};

export default Login;
