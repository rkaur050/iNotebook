import React from "react";
import { Link } from "react-router-dom";

export default function Home() {


  return (
    <div className="container text-center my-3 ">
      <h1 className="mb-5 lobster-regular ">Keep Your Notes,<br/> Grab Your Goals</h1>
      <h5 className="narrow mb-5">Maximize your productivity with iNotebook, your all-in-one platform for notes, tasks, and goal tracking. </h5>
      <p>Already have an account?</p><button className="btn btn-primary"><Link to="/login" className="login-btn">Login Now</Link></button>
    </div>
  );
}
