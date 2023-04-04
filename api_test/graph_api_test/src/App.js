import React, { useState, useEffect } from 'react';
import {VictoryChart,VictoryLine,VictoryTheme,VictoryAxis, VictoryVoronoiContainer, VictoryTooltip} from 'victory';
import './App.css';

const BitcoinPriceGraph = ({ ticker }) => {
  const [bitcoinPrices, setBitcoinPrices] = useState(null);

  useEffect(() => {
    const fetchBitcoinPrices = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${ticker}/market_chart?vs_currency=gbp&days=30`
      );
      const data = await response.json();
      setBitcoinPrices(data.prices);
    };

    fetchBitcoinPrices();
  }, [ticker]);

  const transformData = (data) => {
    return data.map((price) => ({
      y: price[1]
    }));
  };

  return (
    <div >
      <h1>{`${ticker.toUpperCase()} Price Graph (GBP)`}</h1>
      {bitcoinPrices && (
        <VictoryChart
          theme={VictoryTheme.material}
          style={{
            axisLabel: { fontSize: 5 },
          }}
          containerComponent={<VictoryVoronoiContainer />}
        >

          <VictoryAxis
            dependentAxis
            label="Price (GBP)"
            style={{
              axisLabel: { padding: 40 },
            }}
          />
          
          <VictoryLine
            data={transformData(bitcoinPrices)}
            style={{ data: { strokeWidth: 0.5 } }}
            labels={({ datum }) => `Price: ${datum.y.toFixed(4)}`}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 8 }}
              />
            }
          />
        </VictoryChart>
      )}
    </div>
  );
};

const TickerSearch = () => {
  const [ticker, setTicker] = useState('bitcoin');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    setTicker(searchTerm.toLowerCase());
  };

  return (
    <div className='App'>
      <h1>Crypto Price Graph</h1>
      <input
        type="text"
        placeholder="Enter a ticker symbol (e.g. bitcoin)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <BitcoinPriceGraph ticker={ticker} />
    </div>
  );
};

export default TickerSearch;