import React from "react";
import "./style.css";

const Portfolio = ({ balance, coins }) => {
    return (
        <div className="portfolio-container">
            <div className="balances-container">
                <div className="balance-card">
                    <div className="balance-label">Current Balance</div>
                    <div className="balance-value">${balance}</div>
    
    
                </div>
    
                <div className="cash-balance-card">
                    <div className="cash-balance-label">Cash Balance</div>
                    <div className="cash-balance-value">$0</div>
                </div>

                <div className="button-container">
                    <button className="deposit-button">Deposit</button>
                    <button className="withdraw-button">Withdraw</button>
                    <button className="export-button">export</button>
                </div>
            </div>

            <div className="coin-list">
                <div className="coin-header">Your Assets</div>
                <table>
                    <thead>
                        <tr>
                            <th>#Name</th>
                            <th>Amount</th>
                            <th>Bought at</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map((coin) => (
                            <tr key={coin.id} className="coin-row">
                                <td className="coin-col coin-name-col">{coin.name} - {coin.symbol}</td>
                                <td className="coin-col">{coin.amount}</td>
                                <td className="coin-col">{coin.priceBought}</td>
                                <td className="coin-col">{coin.change}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Portfolio;
