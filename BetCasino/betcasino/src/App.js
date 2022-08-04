import './assets/css/lib/bootstrap.min.css';
import './assets/css/all.min.css';
import './assets/css/line-awesome.min.css';
import './assets/css/lib/animate.css';
import './assets/css/lib/slick.css';
import './assets/css/main.css';
import logo from './assets/images/favicon.png'
import card from './assets/images/banner/card.png'
import thumb from './assets/images/banner/thumb.png'
import bg from './assets/images/banner/bg.png'
import React, { useState } from 'react';
import Popup from './components/Popup';
import { Link } from "react-router-dom";

function App() {
  sessionStorage.clear();
  const style = {
    background:{bg}
  }

  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [text, setText] = useState('URL');
  const onChange = e => {
    setText(e.target.value)
};

const onClick = e => {
    if(text !== ""){
        setButtonPopup1(false);
        setText("")
    }else{
        setButtonPopup1(false);
    }
};

  return (
    <><div><div data-bs-spy="scroll" data-bs-offset="170" data-bs-target=".privacy-policy-sidebar-menu">
      <div className="overlay">
        <div className="preloader">
          <div className="scene" id="scene">
            <input type="checkbox" id="andicator" />
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
      <div className="header">
        <div className="container">
          <div className="header-bottom">
            <div className="header-bottom-area align-items-center">
              <div className="logo">
                <Link to="/"><img src={logo} alt="logo"></img></Link>
                </div>
              <ul className="menu">
                <li>
                  <Link to="/login" className="cmn--btn active btn--lg" style={{marginRight: "20px"}}>
                    <button className='link-hide'>
                      Play Now
                    </button>
                  </Link>
                </li>
                <li>
                  <div className="cmn--btn active btn--lg">
                  <a className='link-hide' href="http://127.0.0.1:5001/" style={{color: "black"}}>View Blockchain</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div><div className="banner-section bg_img overflow-hidden" style={{style}}>
        <div className="container">
          <div className="banner-wrapper d-flex flex-wrap align-items-center">
            <div className="banner-content">
              <h1 className="banner-content__title">Play <span className="text--base">Online Casino</span> & Win Money </h1>
              <p className="banner-content__subtitle">PLAY CASINO WITH YOUR BETCOINS ONLINE. THE ULTIMATE ONLINE CASINO PLATFORM WITH THE BEST GAMES IN THE MARKET.</p>
              <div className="button-wrapper">
              <Link to="/login" className="cmn--btn active btn--lg"><button className='link-hide'>
                Play Now
              </button></Link>
              </div>
              <img src={card} alt="" className="shape1">
              </img></div>
            <div className="banner-thumb">
              <img src={thumb} alt="banner">
              </img></div>
          </div>
        </div>
      </div>
      </>
        );
  };
  export default App; 
