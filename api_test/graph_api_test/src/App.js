import React from 'react';
import './App.css';
import TickerSearch from './components/TickerSearch';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <div className="App">
      <TickerSearch />
      <SearchPage />
    </div>
  );
}

export default App;