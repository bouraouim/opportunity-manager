import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useContext, useEffect, useRef, useState} from 'react';
import AuthContext from '../store/auth-context';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const authcontext = useContext(AuthContext);
  const navigate = useNavigate();
  const [falsecredential, setfalsecredential] = useState(false);
  const [isloggedin, setisloggedin] = useState(true);
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    if(authcontext.loggedin){
      navigate('/')  
    }
  },[])
  const switchauth = () => {
    setisloggedin((prevstate)=>!prevstate)
  }
  async function submitHandler(event){
    event.preventDefault();
    const email = emailRef.current.value;
    authcontext.firstemail = emailRef.current.value;
    const password = passwordRef.current.value;
    // setisloading(true)
    // if(!isloggedin){
    //   let url='http://localhost:8000/api/login_check'
    // }
    // else{let url=''}
    const body = {
      "email":email,
      "password":password,
    }
    try {
      const r = await axios.post('http://localhost:8000/api/login_check',body)
      authcontext.login(r.data.token,email)
      // await authcontext.fetchuser()
      navigate('/administration/users')
    }catch (error) {
      setfalsecredential(true)
    }
    // ,{ replace: true }
  }

  return(
    <div className="main-content bg-default">
      <div className="header bg-gradient-primary pb-3 pt-3">
        <div className="container">
          <div className="header-body text-center mb-7">
            <div className="row justify-content-center">
              <div className="col-xl-5 col-lg-6 col-md-8 mt-5 px-5">
                <h1 className="text-white">Welcome!</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </div>
      <div className="container  pb-9">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card bg-secondary border-0 mb-0">
              <div className="card-body px-lg-5 py-lg-5">    
                <form role="form" onSubmit={submitHandler}>
                  <div className="form-group mb-3">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                      </div>
                      <input className="form-control" ref={emailRef} placeholder="Email" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                      </div>
                      <input className="form-control" ref={passwordRef} placeholder="Password" type="password"/>
                    </div>
                  </div>
                  {falsecredential && <h5>False credential</h5>}
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input className="custom-control-input" id=" customCheckLogin" type="checkbox"/>
                    <label className="custom-control-label" htmlFor=" customCheckLogin">
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary my-4">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;