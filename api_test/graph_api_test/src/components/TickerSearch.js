import React, { useState } from 'react';
import PriceChart from './PriceChart';
import './TickerSearch.css';

const TickerSearch = () => {
  const [ticker, setTicker] = useState('bitcoin');
  const [days, setDays] = useState(5);



  const handleTestButton = (token) => {
    setTicker(token);
  };

  return (
    <div className='App'>
      <div className='GraphChart'>
        <PriceChart ticker={ticker} days={days} />
        <div className='intervals'>
          <button onClick={() => setDays(1)}>1 Day</button>
          <button onClick={() => setDays(5)}>5 Days</button>
          <button onClick={() => setDays(10)}>10 Days</button>
          <button onClick={() => setDays(15)}>15 Days</button>
          <button onClick={() => setDays(20)}>20 Days</button>
          <button onClick={() => setDays(25)}>25 Days</button>
          <button onClick={() => setDays(30)}>30 Days</button>
        </div>
      </div>
      <div className='tradeTokenDiv'>
        <p>Current Price:</p>
        <button>Buy</button>
        <button>Sell</button>
      </div>
      <div className='dashBoardSearchDiv'>
        <input className='dashBoardSearchInput'></input>
        <div className='dashBoardSearchResultsDiv'>
            <p className='testToken' onClick={() => handleTestButton('bitcoin')}>Bitcoin</p>
            <p className='testToken' onClick={() => handleTestButton('cardano')}>Cardano</p>
            <p className='testToken' onClick={() => handleTestButton('ethereum')}>Ethereum</p>
            <p className='testToken' onClick={() => handleTestButton('dogecoin')}>DogeCoin</p>
        </div>
      </div>
      
      
    </div>
  );
};

export default TickerSearch;