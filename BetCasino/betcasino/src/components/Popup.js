import React from 'react'
import '../assets/css/lib/bootstrap.min.css';
import '../assets/css/all.min.css';
import '../assets/css/line-awesome.min.css';
import '../assets/css/lib/animate.css';
import '../assets/css/lib/slick.css';
import '../assets/css/main.css';
import './Popup.css';

function Popup(props){
    return (props.trigger) ? (
        <div className="popup col-lg-6 col-xl-4 col-md-6 col-sm-10">
            <div className="popup-inner dashboard__card">
                <button className="close-btn" onClick={() => props.setTrigger(false)}></button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup;