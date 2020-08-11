import React from 'react';
import logo from './logo.svg';
import  './App.css'

import Websocket from './websocket'

import AddressUi from './AddressUi'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Websocket />
      </header>
    </div>
  );
}

export default App;
