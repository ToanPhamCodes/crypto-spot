import React, { useState, useEffect } from 'react';
import PriceChart from 'components/PriceChart';
import './style.css';

const TickerSearch = () => {
  const [ticker, setTicker] = useState('bitcoin');
  const [days, setDays] = useState(5);
  const [tokenData, setTokenData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleTestButton = (token) => {
    setTicker(token);
  };

  const handleSearchInputChange = (event) => {
    const userInput = document.getElementById('dashBoardSearchInput').value.toLowerCase();
    const filteredResults = searchResults.filter((result) =>
      result.name.toLowerCase().includes(userInput)
    ).slice(0, 4);
    setSearchResults(filteredResults);
  };

  useEffect(() => {
    const fetchTokenData = async () => {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ticker}&vs_currencies=gbp&include_market_cap=true&include_24hr_vol=true&include_24hr_change=false`);
      const data = await response.json();
      setTokenData(data[ticker]);
    };
    fetchTokenData();
  }, [ticker]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=24h`);
      const data = await response.json();
      setSearchResults(data);
    };
    fetchSearchResults();
  }, []);

  return (
    <div className='App'>
<<<<<<< HEAD
      <div className='GraphChart'>
        <PriceChart ticker={ticker} days={days} />
        <div className='intervals'>
=======
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
>>>>>>> 99a936f4cba99f5cde4c2865608da7ac308e36f6
          <button onClick={() => setDays(30)}>30 Days</button>
        </div>
      </div>
      <div className='tradeTokenDiv'>
        <p>Token Name: {ticker}</p>
        {tokenData && (
          <>
            <p>24H Volume: {tokenData.gbp_24h_vol}</p>
            <button>Buy</button>
            <button>Sell</button>
          </>
        )}
      </div>
      <div className='dashBoardSearchDiv'>
  <input id='dashBoardSearchInput'className='dashBoardSearchInput' onChange={handleSearchInputChange} />
  <div className='dashBoardSearchResultsDiv'>
    {searchResults.map((result) => (
      <div className='testToken' key={result.id} onClick={() => handleTestButton(result.id)}>
        <img src={result.image} alt={`${result.name} logo`} height='48px' />
        <p>{result.name}</p>
        <p>{result.current_price} GBP</p>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default TickerSearch;