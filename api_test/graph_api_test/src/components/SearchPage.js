import React, { useEffect, useState } from 'react';
import './SearchPage.css';

const SearchPage = () => {
  const [tokens, setTokens] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchTokens() {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false');
      const data = await response.json();
      setTokens(data);
    }
    fetchTokens();
  }, []);

  const handleInputChange = async (event) => {
    setSearchTerm(event.target.value);
    const filteredTokens = tokens.filter((token) => {
      return (
        token.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    const searchResults = await Promise.all(filteredTokens.slice(0, 4).map(async (token) => {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${token.id}`);
      const data = await response.json();
      return {
        id: data.id,
        symbol: data.symbol,
        name: data.name,
        logo: data.image.small,
      };
    }));
    setSearchResults(searchResults);
  };

  return (
    <div className="Main">
      <div className="searchBarDiv">
        <input
          id="searchBar"
          type="text"
          placeholder="Enter a ticker symbol"
          value={searchTerm}
          onChange={handleInputChange}
        />

        <div className="resultsDiv">
          {searchResults.map((token) => (
            <div key={token.id}>
              <img src={token.logo} alt={token.name} />
              <p>{token.id}</p>
              <p>{token.symbol}</p>
              <p>{token.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;