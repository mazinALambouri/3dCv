import React from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
