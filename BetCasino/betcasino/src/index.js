import React from 'react';
import './index.css';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page1 from './App.js';
import Page2 from './login.js';
import Page3 from './home.js';
import Page4 from './profile.js';
import Page5 from './Roulette.js';
import Page6 from './Dashboard.js';
import Page7 from './blackjack.js';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
  root.render(
      <BrowserRouter>
       <Routes>
        <Route exact path="/" element={<Page1/>} />
        <Route path="/login" element={<Page2/>} />
        <Route path="/home" element={<Page3/>}/>
        <Route path="/profile" element={<Page4/>}/>
        <Route path="/Roulette" element={<Page5/>}/>
        <Route path="/Dashboard" element={<Page6/>}/>
        <Route path="/blackjack" element={<Page7/>}/>
      </Routes>
      </BrowserRouter>
  );
