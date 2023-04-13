import React, { useState, useEffect } from "react";
import "./style.css";

const Portfolio = ({ balance, coins, userId, user }) => {
    const [showWithdrawPopup, setWithdrawPopup] = useState(false);
    const [showDepositPopup, setDepositPopup] = useState(false);
    const [totalValue, setTotalValue] = useState(0);
    const cards = user ? user.account.cashWallet.cards : [];

    console.log(cards)
    useEffect(() => {
        const fetchData = async () => {
            const ids = coins.map((coin) => coin.name.toLowerCase());
            const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=gbp`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                let value = 0;
                coins.forEach((coin) => {
                    const coinValue = data[coin.name.toLowerCase()].gbp * coin.amount;
                    value += coinValue;
                });

                setTotalValue(value);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [coins]);


    const deposit = async (userId, cardNumber, amount) => {
        const response = await fetch(`http://127.0.0.1:8000/user/${userId}/deposit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cardNumber, amount }),
        });

        return await response.json();
    };
    const withdraw = async (userId, cardNumber, amount) => {
        const response = await fetch(`http://127.0.0.1:8000/user/${userId}/withdraw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cardNumber, amount }),
        });

        return await response.json();
    };
    const [cardNumber, setCardNumber] = useState('');
    const [amount, setAmount] = useState(0);

    const handleCardNumberChange = (e) => {
        setCardNumber(e.target.value);
    };
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleDeposit = async (e) => {
        e.preventDefault();
        // TODO: Handle deposit form submission
        try {
            const response = await deposit(userId, cardNumber, amount);
            console.log(response);
            // Update user balance 
            setDepositPopup(false);

        } catch (error) {
            console.error(error);
            // Show an error message to the user if necessary
        }
    };


    const handleWithdraw = async (e) => {
        e.preventDefault();
        // TODO: Handle withdraw form submission
        try {
            const response = await withdraw(userId, cardNumber, amount);
            console.log(response);
            // Update user balance 
            setWithdrawPopup(false);
        } catch (error) {
            console.error(error);
            // Show an error message to the user if necessary
        }
    };
    return (
        <div className="portfolio-container">
            <p id="test"></p>
            <div className="balances-container">
                <div className="balance-card">
                    <div className="balance-label">Wallet Balance</div>
                    <div className="balance-value">£{totalValue.toFixed(2)}</div>


                </div>

                <div className="cash-balance-card">
                    <div className="cash-balance-label">Cash Balance</div>
                    <div className="cash-balance-value">£{balance.toFixed(2)}</div>
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
                            
                            <div className="card-list">
                                <div className="card-header">Your Cards</div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Card Number</th>
                                            <th>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cards.map((card) => (
                                            <tr key={card.cardNumber} className="card-row">
                                                <td className="card-col card-number-col">{card.cardNumber}</td>
                                                <td className="card-col">{card.balance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <label htmlFor="cardNumber">Card Number:</label>
                            <input type="text" id="cardNumber" name="cardNumber" onChange={handleCardNumberChange} />
                            <label htmlFor="amount">Amount (GBP):</label>
                            <input type="number" step="0.01" id="amount" name="amount" onChange={handleAmountChange} />
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
                            <div className="card-list">
                                <div className="card-header">Your Cards</div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Card Number</th>
                                            <th>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cards.map((card) => (
                                            <tr key={card.cardNumber} className="card-row">
                                                <td className="card-col card-number-col">{card.cardNumber}</td>
                                                <td className="card-col">{card.balance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <label htmlFor="cardNumber">Card Number:</label>
                            <input type="text" id="cardNumber" name="cardNumber" onChange={handleCardNumberChange} />
                            <label htmlFor="amount">Amount (GBP):</label>
                            <input type="number" step="0.01" id="amount" name="amount" onChange={handleAmountChange} />
                            <button type="submit">Withdraw</button>
                            <button type="button" onClick={() => setWithdrawPopup(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;
