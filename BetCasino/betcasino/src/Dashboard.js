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
import React from 'react';
import $ from "jquery";

async function execute(row){
    fetch('http://localhost:5000/deleteTransaction',
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json'
        },
        body: JSON.stringify({idTransaction: row})
    }).then(
        async (res) => {
            const json = await res.json();
            console.log(json.data);
            window.location.replace("http://localhost:3000/dashboard");
        }
    )
}

function Dashboard(){
    let tableData = []
    let counter = 1;

    fetch('http://localhost:5000/getTransaction',
    {
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(
        async(res) => {
            const json = await res.json();
            let data = json.data;

            for(let i  = 0; i < data.length; i++) {
                var table = document.getElementById("table");
                var row = table.insertRow(i+1);

                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);
                var cell4 = row.insertCell(4);
                var cell5 = row.insertCell(5);
                console.log(data[i][4]);
                if (data[i][3] === 0){
                    var cell6 = row.insertCell(6);
                }
                cell0.innerHTML = data[i][0];
                cell0.style = "display: none";
                cell1.innerHTML = data[i][1].slice(0, 30)+"...";
                cell2.innerHTML = data[i][2].slice(0, 30)+"...";
                if(data[i][3] === 0)
                    cell3.innerHTML = "Not validated";
                else
                    cell3.innerHTML = "Validated";
                cell4.innerHTML = data[i][4];
                cell5.innerHTML = data[i][5];
                if(data[i][3] === 0){
                    cell6.innerHTML = '<input type="checkbox" id="'+counter+'"></input>'
                    counter+=1;
                }
                tableData.push([
                    data[i][0],
                    data[i][1],
                    data[i][2],
                    data[i][3],
                    data[i][4],
                    data[i][5],
                ]);
            }
        }
    );

    const logout = e => {
        sessionStorage.clear();
        window.location.replace("http://localhost:3000/");
    }
    const deleteRow = e => {
        let counter = 1;
        var table = document.getElementById("table");
        for (var i = 1, row; row = table.rows[i]; i++) { 
            if(row.cells[6] != undefined){
                if(document.getElementById(counter).checked){
                    execute(row.cells[0].innerHTML);
                }
                counter++;
            }
        }
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
            <h2 className="title text-white">Dashboard</h2>
            <ul className="breadcrumbs d-flex flex-wrap align-items-center justify-content-center">
              <li><Link to="/home">Home</Link></li>
              <li>Dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
           <div className="dashboard-section padding-top padding-bottom">
            <div className="container">
            <button type="button" onClick={deleteRow} className="cmn--btn active btn--round" style={{float: "right", marginRight:"10px", top: "5px", width: "10%"}}>Delete</button>
                <div className="row">
                    <div className="table--responsive--md mt-4">
                            <table className="table" id="table">
                                <thead>
                                    <tr>
                                        <th style={{display: "none"}}>IdTransaction</th>
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
            </>
        );
}

export default Dashboard;