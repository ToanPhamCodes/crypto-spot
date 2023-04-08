export const getPrices = async (ticker) => {
    const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${ticker}/market_chart?vs_currency=gbp&days=30`
    );
    const data = await response.json();
    return data.prices;
};


export const searchCoin = async (searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();
    const response = await fetch(`https://api.coingecko.com/api/v3/search/autocomplete?query=${searchTermLower}`);
    const data = await response.json();
    const coins = data.tickers || [];
    return coins.map((coin) => ({
        symbol: coin.base.toLowerCase(),
        name: coin.coin_name.toLowerCase(),
        id: coin.target_coin_id,
    }));
};
