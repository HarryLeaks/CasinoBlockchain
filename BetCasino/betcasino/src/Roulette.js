import './assets/css/lib/bootstrap.min.css';
import './assets/css/all.min.css';
import './assets/css/line-awesome.min.css';
import './assets/css/lib/animate.css';
import './assets/css/lib/slick.css';
import './assets/css/main.css';
import button from "./assets/images/button.png";
import marker from "./assets/images/marker.png";
import wheel from "./assets/images/wheel.png";
import "./roulette.css";
import React, { useEffect } from 'react';
import logo from './assets/images/favicon.png';
import background2 from "./assets/images/bg2.jpg";
import { Link } from "react-router-dom";
import {useRef, useState} from 'react';
import useSound from 'use-sound';
import sound from "./assets/audio/277.wav";

let getbal = false;

function Roulette(){
    const [amount, setAmount] = useState();
    const [betAmount, setBetAmount] = useState();
    const [number, setNumber] = useState();
    let value = false;

    if(getbal === false){
        fetch('http://localhost:5000/getBalance',
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
                //console.log(data[0][0]);
                setAmount(data[0][0])
            }
        );
        fetch('http://localhost:5000/getTable',
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

                    cell1.innerHTML = data[i][0];
                    if(data[i][1] === 0){
                        cell2.innerHTML = "Won";
                    }else{
                        cell2.innerHTML = "Lost";
                    }
                }
            }
        );
        getbal =  true;
    }

    const ref = useRef(0);
    const [play] = useSound(sound);

    var element = document.getElementById('result');
    var betType;
    let deg = 0;
    var style = {
        marginTop : "5px",
        display : 'none'
    };

    var opt = document.getElementById('BetOptions');
    const onChange = e => {
        var strUser = opt.options[opt.selectedIndex].value;
        console.log(strUser);
        if(strUser !== 'Number'){
            document.getElementById('quantity').style.display = 'none';
        }else{
            document.getElementById('quantity').style.display = 'block';
        }
    }

    const logout = e => {
        sessionStorage.clear();
        window.location.replace("http://localhost:3000/");
    }

    const event = e =>{
        value = true;
        console.log(betAmount);
        console.log(value);
        if(opt.options[opt.selectedIndex].value === 'Number'){
            if(betAmount !== undefined && number !== undefined && betAmount !== '' && number !== ''){
                betType = 4;
                element.classList.remove("green");
                element.classList.remove("black");
                element.classList.remove("red");
                element.textContent = "";
                play.apply();
                deg = Math.floor(5000 + Math.random() * 5000);
                console.log(ref.current);
                ref.current.style.transition = 'all 9s ease';
                ref.current.style.transform = `rotate(${deg}deg)`;
                ref.current.classList.add('blur');
            }
        }else{
            if(betAmount !== undefined && betAmount !== ''){
                if(opt.options[opt.selectedIndex].value === 'Black'){
                    betType = 1;
                }else if(opt.options[opt.selectedIndex].value === 'Red'){
                    betType = 2;
                }else if(opt.options[opt.selectedIndex].value === 'Green'){
                    betType = 3;
                }
                element.classList.remove("green");
                element.classList.remove("black");
                element.classList.remove("red");
                element.textContent = "";
                play.apply();
                deg = Math.floor(5000 + Math.random() * 5000);
                console.log(ref.current);
                ref.current.style.transition = 'all 9s ease';
                ref.current.style.transform = `rotate(${deg}deg)`;
                ref.current.classList.add('blur');
            }
        }
    }

    useEffect(() =>{
        ref.current.addEventListener('transitionend', function(e){
            if(value === true) {
                value = false;
                ref.current.classList.remove('blur');
                ref.current.transition = 'none';
                const actualDeg = deg%360;
                ref.current.transform = `rotate(${actualDeg}deg)`;

                console.log(actualDeg);
                var element = document.getElementById('result');
                var profit = 0;

                if (actualDeg>=0 && actualDeg<10 ){
                    document.getElementById("result").textContent="26 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=10 && actualDeg<20 ){
                    document.getElementById("result").textContent="3 RED";
                    element.classList.remove("green");
                    element.classList.remove("black");
                    element.classList.add("red");
                }
                if (actualDeg>=20 && actualDeg<30 ){
                    document.getElementById("result").textContent="35 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=30 && actualDeg<39 ){
                    document.getElementById("result").textContent="12 RED";
                    element.classList.remove("green");
                    element.classList.remove("black");
                    element.classList.add("red");
                }
                if (actualDeg>=39 && actualDeg<49 ){
                    document.getElementById("result").textContent="28 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=49 && actualDeg<59 ){
                    document.getElementById("result").textContent="7 RED";
                    element.classList.remove("green");
                    element.classList.remove("black");
                    element.classList.add("red");
                }
                if (actualDeg>=59 && actualDeg<69 ){
                    document.getElementById("result").textContent="29 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=69 && actualDeg<78 ){
                    document.getElementById("result").textContent="18 RED";
                    element.classList.remove("green");
                    element.classList.remove("black");
                    element.classList.add("red");
                }
                if (actualDeg>=78 && actualDeg<88 ){
                    document.getElementById("result").textContent="22 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=88 && actualDeg<98 ){
                    document.getElementById("result").textContent="9 RED";
                    element.classList.remove("green");
                    element.classList.remove("black");
                    element.classList.add("red");
                }
                if (actualDeg>=98 && actualDeg<107 ){
                    document.getElementById("result").textContent="31 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=107 && actualDeg<117 ){
                        document.getElementById("result").textContent="14 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=117 && actualDeg<127 ){
                    document.getElementById("result").textContent="20 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=127 && actualDeg<137 ){
                        document.getElementById("result").textContent="1 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=137 && actualDeg<146 ){
                    document.getElementById("result").textContent="33 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=146 && actualDeg<156 ){
                        document.getElementById("result").textContent="16 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=156 && actualDeg<166 ){
                    document.getElementById("result").textContent="24 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=166 && actualDeg<176 ){
                        document.getElementById("result").textContent="5 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=176 && actualDeg<185 ){
                    document.getElementById("result").textContent="10 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=185 && actualDeg<195 ){
                        document.getElementById("result").textContent="23 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=195 && actualDeg<205 ){
                    document.getElementById("result").textContent="8 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=205 && actualDeg<215 ){
                        document.getElementById("result").textContent="30 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=215 && actualDeg<224 ){
                    document.getElementById("result").textContent="11 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=224 && actualDeg<234 ){
                        document.getElementById("result").textContent="36 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=234 && actualDeg<244 ){
                    document.getElementById("result").textContent="13 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=244 && actualDeg<253 ){
                        document.getElementById("result").textContent="21 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=253 && actualDeg<263 ){
                    document.getElementById("result").textContent="6 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=263 && actualDeg<273 ){
                        document.getElementById("result").textContent="34 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=273 && actualDeg<283 ){
                    document.getElementById("result").textContent="17 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=283 && actualDeg<292 ){
                        document.getElementById("result").textContent="25 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=292 && actualDeg<302 ){
                    document.getElementById("result").textContent="2 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=302 && actualDeg<312 ){
                        document.getElementById("result").textContent="21 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=312 && actualDeg<322 ){
                    document.getElementById("result").textContent="4 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=322 && actualDeg<331 ){
                        document.getElementById("result").textContent="19 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=331 && actualDeg<341 ){
                    document.getElementById("result").textContent="15 BLACK";
                    element.classList.remove("green");
                    element.classList.remove("red");
                    element.classList.add("black");
                }
                if (actualDeg>=341 && actualDeg<350 ){
                        document.getElementById("result").textContent="32 RED";
                        element.classList.remove("green");
                        element.classList.remove("black");
                        element.classList.add("red");
                }
                if (actualDeg>=350 && actualDeg<360 ){
                    document.getElementById("result").textContent="0 GREEN";
                    element.classList.remove("black");
                    element.classList.remove("red");
                    element.classList.add("green");
                }
                var result = document.getElementById("result").textContent.split(' ');
                if(betType === 1){
                    if (result[1] === "BLACK"){
                        console.log("Won");
                        profit = parseInt(betAmount);
                    }else{
                        console.log("Lost");
                        profit = -parseInt(betAmount);
                    }
                }else if(betType === 2){
                    if (result[1] === "RED"){
                    console.log("Won");
                    profit = parseInt(betAmount);
                    }else{
                        console.log("Lost");
                        profit = -parseInt(betAmount);
                    }
                }else if(betType === 3){
                    if (result[1] === "GREEN"){
                        console.log("Won");
                        profit = parseInt(betAmount) * 14;
                    }else{
                        console.log("Lost");
                        profit = -parseInt(betAmount);
                    }
                }else if(betType === 4){
                    if (result[0] === number){
                        console.log("Won");
                        profit = parseInt(betAmount) * 14;
                    }else{
                        console.log("Lost");
                        profit = -parseInt(betAmount);
                        console.log(profit)
                    }
                }
                setAmount(amount + profit);
                var betcoins = amount+profit;
                var table = document.getElementById("table");
                if(table.rows.length > 2){
                    table.deleteRow(2);
                }
                    fetch('http://localhost:5000/setBalance',
                    {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({data: betcoins.toString()+","+sessionStorage.Email})
                    });
                    console.log(betcoins.toString());
                    fetch('http://localhost:5000/makeTransaction',
                    {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({data: betcoins.toString()+","+sessionStorage.Email})
                    }).then(
                        async () => {
                            window.location.reload();
                        }
                    )
            }
             })
        });
return(
    <>
    <div className="game-container">
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
                    <li>
                        <button className="TransparentButton" type="submit" onClick={logout}><a>Logout</a></button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div className="inner-banner bg_img bg_position" style={{backgroundImage: `url(${background2})`}}>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-7 col-xl-6 text-center">
        <h2 className="title text-white">Roulette</h2>
        <ul className="breadcrumbs d-flex flex-wrap align-items-center justify-content-center">
          <li><Link to="/home">Game</Link></li>
          <li>Roulette</li>
        </ul>
      </div>
    </div>
  </div>
</div>
<div className="back parent" style={{paddingBottom:"200px"}}>
        <h1 id="result" className="result"> </h1>
        <div id="app" className="child" style={{display:"inline-block", marginLeft:"15%"}}>
            <img className="marker" src={marker} alt="marker"/>  <span id="result" ></span>
            <div style={{marginTop: "5px"}}>
                <img ref={ref} className="wheel" src={wheel} alt="wheel" />
            </div>
            <button onClick={event} style={{backgroundColor: "Transparent", borderBlockColor: "Transparent", borderLeftColor: "transparent", borderRightColor: "transparent"}}><img className="button" src={button} alt="button"/></button>
        </div>
        <div className="child" style={{marginTop:"5px", marginLeft:"2%"}}>
            <h4 id="Balance" className="bottom">Balance: {amount}</h4>
            <h4 className="bottom">Amount to Bet: </h4>
            <input onInput={e => setBetAmount(e.target.value)} type="number" min="1" id="amount" className="form--control form-control" placeholder="Amount" required />
            <select name="BetOptions" id="BetOptions" style={{backgroundColor: "Transparent", marginTop:"25px", color: "White"}} onChange={onChange}>
                <option value="Red" style={{color: "Black"}}>Bet Red x2</option>
                <option value="Green" style={{color: "Black"}}>Bet Green x14</option>
                <option value="Black" style={{color: "Black"}}>Bet Black x2</option>
                <option value="Number" style={{color: "Black"}}>Bet Number x14</option>
            </select>
            <input onInput={e => setNumber(e.target.value)} type="number" style={style} className="form--control form-control" id="quantity" name="quantity" min="0" max="35" required></input>
        </div>
        <div className="table--responsive--md mt-4 child" style={{marginTop:"5px", marginLeft:"5%"}}>
                        <table className="table" id="table">
                            <thead>
                                <tr>
                                    <th>Betted Amount</th>
                                    <th>Lost/Profit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                </tr>
                            </tbody>
                        </table>
                    </div>
</div>
<div className="footer-section bg_img" style={{ backgroundImage: `url(${background2})` }}>
        <div className="footer-top">
        </div>
        <div className="footer-bottom">
        </div>
</div>
</div>
</>
)};

export default Roulette;