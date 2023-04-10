import React, { useState, useEffect } from 'react';
import PriceChart from 'components/PriceChart';
import './style.css';

const TickerSearch = () => {
  const [ticker, setTicker] = useState('bitcoin');
  const [days, setDays] = useState(5);
  
  const [searchResults, setSearchResults] = useState([]);
  const [originalSearchResults, setOriginalSearchResults] = useState(null);


  const [tokenData, setTokenData] = useState(null);


  const [showBuyPopup, setShowBuyPopup] = useState(false);
  const [showSellPopup, setShowSellPopup] = useState(false);


  //calculate the value the user are going to buy/sell
  const [amount, setAmount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
    const newAmount = Number(e.target.value);
    setAmount(newAmount);
    const newValue = calculateTotalValue(newAmount, tokenData);
    setTotalValue(newValue);
  };

  const calculateTotalValue = (amount, tokenData) => {
    if (tokenData) {
      return amount * tokenData.market_data.current_price.gbp;
    }
    return 0;
  };

  const handleBuySubmit = (e) => {
    // e.preventDefault();
    // TODO: Handle buy form submission
  };

  const handleSellSubmit = (e) => {
    // e.preventDefault();
    // TODO: Handle sell form submission
  };


  const handleTestButton = (token) => {
    setTicker(token);
  };

  const handleSearchInputChange = (event) => {
    const userInput = event.target.value.toLowerCase();
    if (userInput === '') {
      setSearchResults(originalSearchResults);
    } else {
      const filteredResults = originalSearchResults.filter((result) =>
        result.name.toLowerCase().includes(userInput)
      );
      setSearchResults(filteredResults);
    }
  };

  useEffect(() => {
    setTotalValue(amount * (tokenData ? tokenData.market_data.current_price.gbp : 0));
  }, [amount, tokenData]);

  useEffect(() => {
    const fetchTokenData = async () => {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${ticker}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
      const data = await response.json();
      setTokenData(data);

    };
    fetchTokenData();
  }, [ticker]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=24h`);
      const data = await response.json();
      setSearchResults(data);
      setOriginalSearchResults(data);
    };
    fetchSearchResults();
  }, []);

  return (
    <div className='App'>
      <div className='GraphChart'>
        <PriceChart ticker={ticker} days={days} />
        <div className='intervals'>
        <button onClick={() => setDays(1)}>1 Day</button>
        <button onClick={() => setDays(3)}>3 Days</button>
        <button onClick={() => setDays(7)}>7 Days</button>
        <button onClick={() => setDays(14)}>14 Days</button>
          <button onClick={() => setDays(30)}>30 Days</button>
        </div>
      </div>
      <div className='tradeTokenDiv'>
        <div className='tradeTokenButtons'>
            <button onClick={() => setShowBuyPopup(true)}>Buy</button>
            <button onClick={() => setShowSellPopup(true)}>Sell</button>
        </div>
        <div className='tradeTokenInfo'>
          {tokenData && (
            <>

              <p>Token: {tokenData.name}</p>
              <img src={tokenData.image.large} alt={`${tokenData.name} logo`} height='128px' />
              <p>Buy Price (GBP): {tokenData.market_data.current_price.gbp}</p>
              <p>24 Hour High (GBP): {tokenData.market_data.high_24h.gbp}</p>
              <p>24 Hour Low (GBP): {tokenData.market_data.low_24h.gbp}</p>
              <p>All Time High (GBP): {tokenData.market_data.ath.gbp}</p>
              <p>All Time Low (GBP): {tokenData.market_data.atl.gbp}</p>
              <p>Market Cap (GBP): {tokenData.market_data.market_cap.gbp}</p>
              <p>24H Volume: {tokenData.market_data.total_volume.gbp}</p>

            </>
          )}
        </div>
      </div>
      <div className='dashBoardSearchDiv'>
        <input className='dashBoardSearchInput' onChange={handleSearchInputChange} />
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
      {showBuyPopup && (
        <div className='buyScreen'>
          <form onSubmit={handleBuySubmit}>
            {tokenData && (
              <>
                <p>Token Name: {tokenData.name}</p>
                <p>Current Price (GBP): {tokenData.market_data.current_price.gbp}</p>
              </>
            )}
            <p>Account Balance (GBP): Insert Account Balance</p>
            <label>
              Amount:
              <input type='number' name='amount' placeholder='Enter Amount'  onChange={handleAmountChange} />
            </label>
            <p>Total Value (GBP): {calculateTotalValue(amount, tokenData)}</p>
            <button type='submit'>Buy</button>
            <button onClick={() => setShowBuyPopup(false)}>Cancel</button>
          </form>
        </div>
      )}
      {showSellPopup && (
        <div className='buyScreen'>
        <form onSubmit={handleSellSubmit}>
          {tokenData && (
            <>
              <p>Token Name: {tokenData.name}</p>
              <p>Current Price (GBP): {tokenData.market_data.current_price.gbp}</p>
            </>
          )}
          <p>Account Balance (GBP): Insert Account Balance</p>
          <label>
            Amount:
            <input type='number' name='amount' placeholder='Enter Amount' onChange={handleAmountChange} />
          </label>
          <p>Total Value (GBP): {calculateTotalValue(amount, tokenData)}</p>
          <button type='submit'>Sell</button>
          <button onClick={() => setShowBuyPopup(false)}>Cancel</button>
        </form>
      </div>
      )}
    </div>
  );
};

export default TickerSearch;