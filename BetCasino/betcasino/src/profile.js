import './assets/css/lib/bootstrap.min.css';
import './assets/css/all.min.css';
import './assets/css/line-awesome.min.css';
import './assets/css/lib/animate.css';
import './assets/css/lib/slick.css';
import './assets/css/main.css';
import logo from './assets/images/favicon.png';
import background2 from "./assets/images/bg2.jpg";
import Profile from './assets/images/profile.png';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Popup from './components/Popup';
import DatePicker from 'react-date-picker';

function POST(path, data) {
    return fetch(`http://localhost:5000${path}`,
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
  }

let gotInfo = false;

function profile(){
    const [age, setAge] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [birthday, setBirthday] = useState();
    const [betcoins, setBetcoins] = useState();
    const [privateAdd, setPrivateAdd] = useState();
    const [publicAdd, setPublicAdd] = useState();

    let tableData;

    if(gotInfo === false){
        fetch('http://localhost:5000/sessionStorage',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({email: sessionStorage.Email})
        }
        ).then(
            async (res) => {
                const json = await res.json();
                let data = json.data;
                setAge(data[0][2]);
                setName(data[0][1]);
                setEmail(data[0][4]);
                setBirthday(data[0][3]);
                setBetcoins(data[0][6]);
                setPrivateAdd(data[0][7].substring(0,15));
                setPublicAdd(data[0][8].substring(0,15));
            }
        );

        fetch('http://localhost:5000/getTableTransactions',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({email: sessionStorage.Email})
        }).then(
            async(res) => {
                const json = await res.json();
                let data = json.data;
                console.log(data);
                for(let i  = 0; i < data.length; i++) {
                    var table = document.getElementById("table");
                    var row = table.insertRow(i+1);

                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);

                    cell1.innerHTML = data[i][0].slice(0, 25)+"...";
                    cell2.innerHTML = data[i][1].slice(0, 25)+"...";
                    cell3.innerHTML = data[i][2];
                    cell4.innerHTML = data[i][3];
                    cell5.innerHTML = data[i][4];
                }

            }
        );
        gotInfo = true;
    }

    const [buttonPopup1, setButtonPopup1] = useState(false);
    const [buttonPopup2, setButtonPopup2] = useState(false);
    const [buttonPopup3, setButtonPopup3] = useState(false);
    const [buttonPopup4, setButtonPopup4] = useState(false);

    const [value, onChange2] = useState(new Date());

    const [text, setText] = useState('Input your name here');
    const onChange = e => {
        setText(e.target.value)
    };

    const onClick1 = e => {
        if(text !== ""){
            console.log("Nome"+","+text+","+sessionStorage.Email);
            e.preventDefault();
            POST('/update', {data: "Nome"+","+text+","+sessionStorage.Email}).then((
                async (resp) => {
                    const json = await resp.json()
                    console.log(json.data);
                    setName(json.data[0][0]);
                }
            ))
            setButtonPopup1(false);
            setText("")
        }else{
            setButtonPopup1(false);
        }
    };

    const onClick2 = e => {
        if(text !== "" && parseInt(text) >= 18){
            console.log("Idade"+","+text+","+sessionStorage.Email);
            e.preventDefault();
            POST('/update', {data: "Idade"+","+text+","+sessionStorage.Email}).then((
                async (resp) => {
                    const json = await resp.json()
                    console.log(json.data);
                    setAge(json.data[0][0]);
                }
            ))
            setButtonPopup2(false);
            setText("")
        }else{
            setButtonPopup2(false);
        }

        if(parseInt(text) <= 18){
            alert("UnderAge");
        }
    }

    const onClick3 = e => {
        if(text !== ""){
            console.log("Email"+","+text+","+sessionStorage.Email);
            e.preventDefault();
            POST('/update', {data: "Email"+","+text+","+sessionStorage.Email}).then((
                async (resp) => {
                    const json = await resp.json()
                    console.log(json.data);
                    setEmail(json.data[0][0]);
                    sessionStorage.setItem("Email", json.data[0][0]);
                }
            ))
            setButtonPopup3(false)
            setText("")
        }else{
            setButtonPopup3(false);
        }
    }

    const onClick4 = e => {
        if(value !== ""){
            console.log("DataNascimento"+","+value+","+sessionStorage.Email);
            e.preventDefault();
            POST('/update', {data: "DataNascimento"+","+value+","+sessionStorage.Email}).then((
                async (resp) => {
                    const json = await resp.json()
                    console.log(json.data);
                    setBirthday(json.data[0][0]);
                }
            ))
            setButtonPopup4(false);
            setText("")
        }else{
            setButtonPopup2(false);
        }
    }

    const logout = e => {
        sessionStorage.clear();
        window.location.replace("http://localhost:3000/");
    }

    return(
    <>
    <div className="header">
    <div className="container">
        <div className="header-bottom">
            <div className="header-bottom-area align-items-center">
                <div className="logo">
                    <Link to="/home">
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
                <ul className="menu">
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

<div className="inner-banner bg_img" style={{backgroundImage: `url(${background2})`}}>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-6 col-xl-6 text-center">
        <h2 className="title text-white">Profile</h2>
        <ul className="breadcrumbs d-flex flex-wrap align-items-center justify-content-center">
          <li><Link to="/home">Home</Link></li>
          <li>Profile</li>
        </ul>
      </div>
    </div>
  </div>
</div>

       <div className="dashboard-section padding-top padding-bottom">
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="dashboard-sidebar">
                        <div className="close-dashboard d-lg-none">
                            <i className="las la-times"></i>
                        </div>
                        <div className="dashboard-user">
                            <div className="user-thumb">
                                <img src={Profile} className="profile-image" alt="dashboard"/>
                            </div>
                            <div className="user-content">
                                <span className="fs-sm">Welcome</span>
                                <h5 className="name">{name}</h5>
                                <ul className="user-option">
                                    <li>
                                    <button className="TransparentButton" type="submit" onClick={() => setButtonPopup1(true)}><i className="las la-pen"></i></button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="row justify-content-center g-4">
                        <div className="col-lg-6 col-xl-4 col-md-6 col-sm-10">
                            <div className="dashboard__card">
                                <div className="dashboard__card-content">
                                    <h2 className="price">Age</h2>
                                    <p className="info">{age}</p>
                                    <button className="TransparentButton" type="submit" onClick={() => setButtonPopup2(true)}><i className="las la-pen"></i></button>
                                </div>
                                <div className="dashboard__card-icon">
                                    <i className="las la-wallet"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4 col-md-6 col-sm-10">
                            <div className="dashboard__card">
                                <div className="dashboard__card-content">
                                    <h2 className="price">Email</h2>
                                    <p className="info">{email}</p>
                                    <button className="TransparentButton" type="submit" onClick={() => setButtonPopup3(true)}><i className="las la-pen"></i></button>
                                </div>
                                <div className="dashboard__card-icon">
                                    <i className="las la-wallet"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4 col-md-6 col-sm-10">
                            <div className="dashboard__card">
                                <div className="dashboard__card-content">
                                    <h2 className="price">Birthday</h2>
                                    <p className="info">{birthday}</p>
                                    <button className="TransparentButton" type="submit" onClick={() => setButtonPopup4(true)}><i className="las la-pen"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4 col-md-6 col-sm-10">
                            <div className="dashboard__card">
                                <div className="dashboard__card-content">
                                    <h2 className="price">Betcoins</h2>
                                    <p className="info">{betcoins}</p>
                                </div>
                                <div className="dashboard__card-icon">
                                    <i className="las la-money-check"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4 col-md-6 col-sm-10">
                            <div className="dashboard__card">
                                <div className="dashboard__card-content">
                                    <h2 className="price">Private</h2>
                                    <p className="info">{privateAdd}...</p>                                
                                </div>
                                <div className="dashboard__card-icon">
                                    <i className="las la-money-check"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4 col-md-6 col-sm-10">
                            <div className="dashboard__card">
                                <div className="dashboard__card-content">
                                    <h2 className="price">Public</h2>
                                    <p className="info">{publicAdd}...</p>
                                </div>
                                <div className="dashboard__card-icon">
                                    <i className="las la-money-check"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table--responsive--md mt-4">
                        <table className="table" id="table">
                            <thead>
                                <tr>
                                    <th>SenderPublicAddress</th>
                                    <th>ReceiverPublicAddress</th>
                                    <th>MinedTransaction</th>
                                    <th>Amount</th>
                                    <th>TimeStamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
    </div>
    <footer className="footer-section bg_img" style={{ backgroundImage: `url(${background2})` }}>
        <div className="footer-top">
        </div>
        <div className="footer-bottom">
        </div>
    </footer>
    <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
        <h4 className="bottom">Change Name</h4>
        <input name="name" id="name" type="text" className="form--control form-control" placeholder="Name" onChange={onChange} required />
        <div className="top">
            <button className="top cmn--btn active w-20 btn--round top" type="submit" onClick={onClick1}>Update</button>
        </div>
    </Popup>
    <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
        <h4 className="bottom">Change Age</h4>
        <input name="age" id="age" type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" className="form--control form-control" placeholder="Age" onChange={onChange} required />
        <div className="top">
            <button className="top cmn--btn active w-20 btn--round top" type="submit" onClick={onClick2}>Update</button>
        </div>
    </Popup>
    <Popup trigger={buttonPopup3} setTrigger={setButtonPopup3}>
        <h4 className="bottom">Change Email</h4>
        <input name="name" id="name" type="text" className="form--control form-control" placeholder="Email" onChange={onChange} required />
        <div className="top">
            <button className="top cmn--btn active w-20 btn--round top" type="submit" onClick={onClick3}>Update</button>
        </div>
    </Popup>
    <Popup trigger={buttonPopup4} setTrigger={setButtonPopup4}>
        <h4 className="bottom">Change Birthday</h4>
        <div>
            <DatePicker onChange={onChange2} value={value}/>
        </div>
        <div className="top">
            <button className="cmn--btn active w-20 btn--round" type="submit" onClick={onClick4}>Update</button>
        </div>
    </Popup>
        </>
    );
}

export default profile;