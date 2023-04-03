import urllib.request, json 

url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=gbp&days=1"

with urllib.request.urlopen(url) as url:
    data = json.load(url)

print(data)
