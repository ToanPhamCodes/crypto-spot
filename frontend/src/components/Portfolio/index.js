import React, {useState}from "react";
import "./style.css";

const Portfolio = ({ balance, coins }) => {
    const [showWithdrawPopup, setWithdrawPopup] = useState(false);
    const [showDepositPopup, setDepositPopup] = useState(false);

    const handleDeposit = (event) => {
        //handle the user deposit here
    }
    const handleWithdraw = (event) => {
        //handle the user withdrawal here
    }
    return (
        <div className="portfolio-container">
            <div className="balances-container">
                <div className="balance-card">
                    <div className="balance-label">Wallet Balance</div>
                    <div className="balance-value">$0</div>
    
    
                </div>
    
                <div className="cash-balance-card">
                    <div className="cash-balance-label">Cash Balance</div>
                    <div className="cash-balance-value">${balance}</div>
                </div>

                <div className="button-container">
                    <button className="deposit-button" onClick={() => setDepositPopup(true)}>Deposit</button>
                    <button className="withdraw-button" onClick={() => setWithdrawPopup(true)}>Withdraw</button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map((coin) => (
                            <tr key={coin.id} className="coin-row">
                                <td className="coin-col coin-name-col">{coin.name}</td>
                                <td className="coin-col">{coin.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showDepositPopup && (
            <div className="popUpScreen">
                <div className="popUpScreenDiv">
                    <form onSubmit={handleDeposit}>
                    <label htmlFor="amount">Amount (GBP):</label>
                    <input type="number" id="amount" name="amount" />
                    <button type="submit">Deposit</button>
                    <button type="button" onClick={() => setDepositPopup(false)}>Cancel</button>
                    </form>
                </div>
            </div>
            )}
            {showWithdrawPopup && (
            <div className="popUpScreen">
                <div className="popUpScreenDiv">
                    <form onSubmit={handleWithdraw}>
                        <p>Cash Available: {balance} (GBP)</p>
                    <label htmlFor="amount">Amount (GBP):</label>
                    <input type="number" id="amount" name="amount" />
                    <button type="submit">Withdraw</button>
                    <button type="button" onClick={() => setDepositPopup(false)}>Cancel</button>
                    </form>
                </div>
            </div>
            )}
        </div>
    );
};

export default Portfolio;
