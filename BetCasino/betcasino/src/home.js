import './assets/css/lib/bootstrap.min.css';
import './assets/css/all.min.css';
import './assets/css/line-awesome.min.css';
import './assets/css/lib/animate.css';
import './assets/css/lib/slick.css';
import './assets/css/main.css';
import dashboard from './assets/images/dashboard.png';
import logo from './assets/images/favicon.png';
import Profile from './assets/images/profile.png';
import background2 from "./assets/images/bg2.jpg";
import Crash from "./assets/images/Crash.PNG";
import roullete from "./assets/images/roullete.jpg";
import Blackjack from "./assets/images/blackjack.jpg";
import Slot from "./assets/images/SlotMachine.jpg";
import React from 'react';
import { Link } from "react-router-dom";

function home(){
    if(sessionStorage.getItem("Email") === null || sessionStorage.getItem("Password") === null){
        window.location.replace("http://localhost:3000/");
    }

    const logout = e => {
        sessionStorage.clear();
        window.location.replace("http://localhost:3000/");
    }

    var style = {};
    if(sessionStorage.getItem("Email") == "admin@gmail.com"){
        style.display = "block";
    }else{
        style.display = "none";
    }

    return(
        <>
    <div className="header">
    <div className="container">
        <div className="header-bottom">
            <div className="header-bottom-area align-items-center">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
                <ul className="menu">
                    <li style={style}>
                        <Link to="/dashboard"><img src={dashboard} className="profile-image" alt="dashboard"/></Link>
                    </li>
                    <li>
                        <Link to="/profile"><img src={Profile} className="profile-image" alt="profile"/></Link>
                    </li>
                    <li>
                        <button className="TransparentButton" type="submit" onClick={logout}><a>Logout</a></button>
                    </li>
                </ul>
                <div className="header-trigger-wrapper d-flex d-lg-none align-items-center">
                    <Link to="/profile"><img src={Profile} className="profile-image" alt="profile"/></Link>
                    <button className="TransparentButton" type="submit" onClick={logout}><a>Logout</a></button>
                </div>
            </div>
        </div>
    </div>
</div>
<div className="inner-banner bg_img bg_position" style={{backgroundImage: `url(${background2})`}}>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-7 col-xl-6 text-center">
        <h2 className="title text-white">Games</h2>
        <ul className="breadcrumbs d-flex flex-wrap align-items-center justify-content-center">
          <li><Link to="/">Home</Link></li>
          <li>Games</li>
        </ul>
      </div>
    </div>
  </div>
</div>
    <div className="game-section padding-top padding-bottom bg_img">
        <div className="container">
            <div className="row gy-4 justify-content-center">
                <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6">
                    <div className="game-item">
                        <div className="game-inner">
                            <div className="game-item__thumb">
                                <img src={Slot} alt="game"/>
                            </div>
                            <div className="game-item__content">
                                <h4 className="title">Slot Machine</h4>
                                <p className="invest-info">Invest Limit: 99</p>
                                <a href="#0" className="cmn--btn active btn--md radius-0">Play Now</a>
                            </div>
                        </div>
                        <div className="ball"></div>
                    </div>
                </div>
                <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6">
                    <div className="game-item">
                        <div className="game-inner">
                            <div className="game-item__thumb">
                                <img src={roullete} alt="game"/>
                            </div>
                            <div className="game-item__content">
                                <h4 className="title">Roulette</h4>
                                <p className="invest-info">Invest Limit: 99</p>
                                <a href="#0" className="cmn--btn active btn--md radius-0"><Link to="/Roulette">Play Now</Link></a>
                            </div>
                        </div>
                        <div className="ball"></div>
                    </div>
                </div>
                <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6">
                    <div className="game-item">
                        <div className="game-inner">
                            <div className="game-item__thumb">
                                <img src={Blackjack} alt="game"/>
                            </div>
                            <div className="game-item__content">
                                <h4 className="title">Blackjack</h4>
                                <p className="invest-info">Invest Limit: 99</p>
                                <a href="#0" className="cmn--btn active btn--md radius-0"><Link to="/blackjack">Play Now</Link></a>
                            </div>
                        </div>
                        <div className="ball"></div>
                    </div>
                </div>
                <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6">
                    <div className="game-item">
                        <div className="game-inner">
                            <div className="game-item__thumb">
                                <img src={Crash} alt="game"/>
                            </div>
                            <div className="game-item__content">
                                <h4 className="title">Crash</h4>
                                <p className="invest-info">Invest Limit: 99</p>
                                <a href="#0" className="cmn--btn active btn--md radius-0">Play Now</a>
                            </div>
                        </div>
                        <div className="ball"></div>
                    </div>
                </div>
            </div>
    </div>
    </div>
    <div className="footer-section bg_img" style={{ backgroundImage: `url(${background2})` }}>
        <div className="footer-top">
        </div>
        <div className="footer-bottom">
        </div>
    </div>
    </>
    );
}

export default home;