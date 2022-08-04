import './assets/css/lib/bootstrap.min.css';
import './assets/css/all.min.css';
import './assets/css/line-awesome.min.css';
import './assets/css/lib/animate.css';
import './assets/css/lib/slick.css';
import './assets/css/main.css';
import logo from './assets/images/favicon.png';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function POST(path, data) {
    return fetch(`http://localhost:5000${path}`,
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    )
}

function App() {  
    const [text, setText] = useState('Input your name here');
    const [text2, setText2] = useState('input your name here');

  const onChange = e => {
    setText(e.target.value)
  }

  const onChange2 = e => {
    setText2(e.target.value)
  }

  const onClick = e => {
    e.preventDefault();
    POST('/post', {name: text+","+text2}).then(
      async (resp) => {
        const json = await resp.json()
        if(json.name !== "0"){
            let Data = json.name.split(",");
            sessionStorage.setItem("Email", Data[0]);
            sessionStorage.setItem("Password", Data[1]);
            window.location.replace("http://localhost:3000/home");
        }else{
            alert("Login Failed");
        }
      }
    )
  }

    return(
            <><div><div data-bs-spy="scroll" data-bs-offset="170" data-bs-target=".privacy-policy-sidebar-menu">
            <div className="overlay">
            <div className="preloader">
                <div className="scene" id="scene">
                    <input type="checkbox" id="andicator"/>
                    <div className="cube">
                        <div className="cube__face cube__face--front"><i></i></div>
                        <div className="cube__face cube__face--back"><i></i><i></i></div>
                        <div className="cube__face cube__face--right">
                            <i></i> <i></i> <i></i> <i></i> <i></i>
                        </div>
                        <div className="cube__face cube__face--left">
                            <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>
                        </div>
                        <div className="cube__face cube__face--top">
                            <i></i> <i></i> <i></i>
                        </div>
                        <div className="cube__face cube__face--bottom">
                            <i></i> <i></i> <i></i> <i></i>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div><div className="header">
                <div className="container">
                    <div className="header-bottom">
                        <div className="header-bottom-area align-items-center">
                            <div className="logo">
                                <Link to="/">
                                    <img src={logo} alt="logo" />
                                </Link>
                            </div>
                            <ul className="menu">
                                <li>
                                    <Link to="/">
                                        Home
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            <div className="account-section overflow-hidden bg_img" style={ {background: "url('assets/images/account/bg.jpg') top"} }>
                <div className="container">
                    <div className="account__main__wrapper">
                        <div className="account__form__wrapper">
                        <div className="row justify-content-center">
                            <div className="col-lg-7 col-xl-6 text-center">
                                <h2 className="title text-white">Sign In</h2> 
                            </div>
                            </div>
                            <form className="account__form form row g-4" method='post' action='/post'>
                                <div className="col-12">
                                    <div className="form-group">
                                        <div htmlFor="username" className="input-pre-icon"><i className="las la-user"></i></div>
                                        <input name="email" id="username" type="text" className="form--control form-control style--two" placeholder="Email" onChange={onChange} required />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <div htmlFor="pass" className="input-pre-icon"><i className="las la-lock"></i></div>
                                        <input name="pass" id="pass" type="password" className="form--control form-control style--two" placeholder="Password" onChange={onChange2} required />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <button className="cmn--btn active w-100 btn--round" type="submit" onClick={onClick}>Sign In</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div></>
    );
};
export default App; 
  