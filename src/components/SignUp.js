import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  const navigate=useNavigate();


  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {name,email,password}=credentials;
      const response = await fetch("http://localhost:4000/api/auth/createuser", {
      method: 'POST',
          headers:{ 
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name,email,password})
      });
      const json = await response.json();
      if(json.success){
        //save auth-token and redirect
        localStorage.setItem('token',json.authToken);
        navigate("/notes");
        props.showAlert("Account created successfully","success");

      }else{
        props.showAlert("Invlaid details","danger");
        
      }  
}

const onChange = (e) =>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
    <div className="container">
    <form  onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Enter your name"
          onChange={onChange}
        />
      </div>
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
        className="form-control"
        name="password"
        onChange={onChange}
        minLength={5}
        required
      />
      </div>
      <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">
        Confirm Password
      </label>
      <input
        type="password"
        id="cpassword"
        className="form-control"
        name="cpassword"
        onChange={onChange}
        minLength={5}
        required
      />
      </div>
      <button type="submit" className="btn btn-primary" >Submit</button>
    </form> 
    </div>
  )
}

export default SignUp
