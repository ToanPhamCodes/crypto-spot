import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip } from 'victory';
import './style.css';


const PriceChart = ({ ticker, days }) => {
  const [tokenPrices, setTokenPrices] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [monetaryChange, setMonetaryChange] = useState(null);
  const [percentChange, setPercentChange] = useState(null);
  
  useEffect(() => {
    const fetchtokenPrices = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${ticker}/market_chart?vs_currency=gbp&days=${days}`
      );
      const data = await response.json();
      setTokenPrices(data.prices);
      setCurrentPrice((data.prices[data.prices.length - 1][1]).toFixed(2));
      setMonetaryChange(((data.prices[data.prices.length - 1][1])-(data.prices[0][1])).toFixed(2));
      setPercentChange(((((data.prices[data.prices.length - 1][1])-(data.prices[0][1]))/(data.prices[0][1]))*100).toFixed(2));
    };

    fetchtokenPrices();
  }, [ticker, days]);

  const transformData = (data) => {
    return data.map((price) => ({
      x: new Date(price[0]),
      y: price[1]
    }));
  };

  return (
    <div className='PriceGraph'>
      <div className='GraphPriceDetails'>
          <p id='currentPrice'>Current Price: {currentPrice} (GBP)</p>
          <p id='monetaryChange'>{`${days} Day Change: `}{monetaryChange} (GBP)</p>
          <p id='percentChange'>{`${days} Day Change: `}{percentChange}%</p>
      </div>

      {tokenPrices && (
        <VictoryChart
          theme={VictoryTheme.material}
          style={{
            axisLabel: { fontSize: 5 },
          }}
          containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryAxis
          tickCount={5}
            tickFormat={(x) => new Date(x).toLocaleDateString()}
            style={{
              axisLabel: {fontSize: 10 },
              tickLabels: { fontSize: 8 }
            }}
          />

          <VictoryLine
            data={transformData(tokenPrices)}
            interpolation="basis"
            style={{ data: { strokeWidth: 0.5 } }}
            labels={({ datum }) => `Price: ${datum.y.toFixed(2)}`}
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

export default PriceChart;