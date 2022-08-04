import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Hand from './Hand';
import update from 'immutability-helper';
import './Blackjack.css';
import logo from './assets/images/favicon.png';
import background2 from "./assets/images/bg2.jpg";
import {useState} from 'react';

class Blackjack extends Component {

  constructor(props) {
    super(props)

    this.state = {
      deck_id: '',
      playerHand: [],
      dealerHand: [],
      inProgress: true,
      amount: 0
    }

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
            
            this.setState({
                amount: data[0][0]
            })
        }
    );
  }

  componentDidMount = () => {
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => {
        const newState = {
          deck_id: response.data.deck_id
        }

        this.setState(newState, this.deckHasBeenShuffled);
      });
  }

  componentDidUpdate = () => {
    if (!this.state.inProgress) {
      return;
    }
    if (this.totalHand('playerHand') > 21 && this.state.inProgress) {
      this.setState({
        gameStatus: 'Player Busted!',
        inProgress: false
      });
      let betcoins = this.state.amount - parseInt(document.getElementById("amount").value);
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
  }

  deckHasBeenShuffled = () => {
    this.dealCards(2, 'playerHand');
    this.dealCards(2, 'dealerHand');
  }

  dealCards = async (numOfCards, whichHand) => {
    if (!this.state.inProgress) {
      return;
    }

    await axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=${numOfCards}`)
      .then(resp => {
        const newState = {
          [whichHand]: update(this.state[whichHand], {
            $push: resp.data.cards
          })
        }
        this.setState(newState);
      });
  }

  hit = event => {
    if(document.getElementById("amount").value != ''){
        document.getElementById("amount").readOnly = true;
        this.dealCards(1, 'playerHand');
    }
  }

  stay = async event => {
    if(document.getElementById("amount").value != ''){
        document.getElementById("amount").readOnly = true;
        while (this.totalHand('dealerHand') < 17) {
        await this.dealCards(1, 'dealerHand');
        }

        if (this.totalHand('dealerHand') > 21) {
        this.setState({
            inProgress: false,
            gameStatus: 'Dealer Busted!'
        });
        let betcoins = this.state.amount + parseInt(document.getElementById("amount").value);
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
        return;
        }

        if (this.totalHand('playerHand') > this.totalHand('dealerHand')) {
        this.setState({
            inProgress: false,
            gameStatus: 'Player Wins!'
        });
        let betcoins = this.state.amount + parseInt(document.getElementById("amount").value);
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
        return;
        }

        if (this.totalHand('playerHand') < this.totalHand('dealerHand')) {
        this.setState({
            inProgress: false,
            gameStatus: 'Dealer Wins!'
        });
        let betcoins = this.state.amount - parseInt(document.getElementById("amount").value);
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
        return;
        }

        if (this.totalHand('playerHand') === this.totalHand('dealerHand')) {
        this.setState({
            inProgress: false,
            gameStatus: 'Tie!'
        });
        window.location.reload();
        }
  }
}

  totalHand = whichHand => {
    let total = 0
    this.state[whichHand].forEach(card => {
      const values = {
        ACE: 11,
        KING: 10,
        QUEEN: 10,
        JACK: 10
      }
      total = total + (values[card.value] || parseInt(card.value));
    });
    return total;
  }

  get hideButtons() {
    return this.state.inProgress ? '' : 'hidden';
  }

  _newGame = event => {
    document.location.reload();
  }

  logout = event => {
    sessionStorage.clear();
    window.location.replace("http://localhost:3000/");
}

  render() {
    return (
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
                        <button className="TransparentButton" type="submit" onClick={this.logout}><a>Logout</a></button>
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
        <h2 className="title text-white">Blackjack</h2>
        <ul className="breadcrumbs d-flex flex-wrap align-items-center justify-content-center">
          <li><Link to="/home">Game</Link></li>
          <li>Blackjack</li>
        </ul>
      </div>
    </div>
  </div>
</div>
        <div className="center">
          <p className="game-status">{this.state.gameStatus}</p>
        </div>
        <div className="center">
          <button className="reset hidden">Play Again!</button>
        </div>

        <div className="game-area">
          <div className="left">
            <button className={`hit ${this.hideButtons}`} onClick={this.hit}>
              Hit
            </button>
            <p>Your Cards:</p>
            <p className="player-total">{this.totalHand('playerHand')}</p>
            <div className="player-hand">
              <Hand cards={this.state.playerHand} />
            </div>
          </div>

          <div className="right">
            <button className={`stay ${this.hideButtons}`} onClick={this.stay}>
              Stay
            </button>
            <p>Dealer Cards:</p>
            <p className="dealer-total">{this.totalHand('dealerHand')}</p>
            <div className="dealer-hand">
              <Hand cards={this.state.dealerHand} />
            </div>
          </div>
        </div>
        <div className="new-game">
            <h4 id="Balance" className="bottom">Balance: {this.state.amount}</h4>
            <h4 className="bottom">Amount to Bet: </h4>
            <input type="number" min="1" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" id="amount" style={{width:'200px', marginLeft:'5px', marginTop:'15px'}} className="form--control form-control" placeholder="Amount" required />
        </div>
      </div>
    )
  }
}

export default Blackjack;