import yfinance as yf
from flask import Flask, jsonify, request
import requests
btc_usd = yf.Ticker("BTC-USD")
hist = btc_usd.history(period="1mo")
#print(hist)


app = Flask(__name__)

@app.route('/home')
def get_data():
    response = requests.get('https://api.example.com/data')
    return jsonify(response.json())


yf.download(tickers = "SPY AAPL",  # list of tickers
            period = "1y",         # time period
            interval = "1d",       # trading interval
            ignore_tz = True,      # ignore timezone when aligning data from different exchanges?
            prepost = False)       # download pre/post market hours data?