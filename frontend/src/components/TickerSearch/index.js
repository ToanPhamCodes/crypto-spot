import React, { useState } from 'react';
import PriceChart from 'components/PriceChart';
import './style.css';

const TickerSearch = () => {
  const [ticker, setTicker] = useState('bitcoin');
  const [searchTerm, setSearchTerm] = useState('');
  const [days, setDays] = useState(5);

  const handleSearch = () => {
    setTicker(searchTerm.toLowerCase());
  };

  return (
    <div className='App'>
      <input
        type="text"
        placeholder="Enter a ticker symbol (e.g. bitcoin)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <div className='GraphComponent'> 
        <div className='GraphChart'>
          
          <PriceChart ticker={ticker} days={days} setDays={setDays} />
          <button onClick={() => setDays(1)}>1 Day</button>
          <button onClick={() => setDays(5)}>5 Days</button>
          <button onClick={() => setDays(10)}>10 Days</button>
          <button onClick={() => setDays(15)}>15 Days</button>
          <button onClick={() => setDays(20)}>20 Days</button>
          <button onClick={() => setDays(25)}>25 Days</button>
          <button onClick={() => setDays(30)}>30 Days</button>
        </div>
      </div>
    </div>
  );
};

export default TickerSearch;