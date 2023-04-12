import React, {useState}from "react";
import "./style.css";

const Portfolio = ({ balance, coins, userId }) => {
    const [showWithdrawPopup, setWithdrawPopup] = useState(false);
    const [showDepositPopup, setDepositPopup] = useState(false);


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
                    <div className="balance-value">£0</div>
    
    
                </div>
    
                <div className="cash-balance-card">
                    <div className="cash-balance-label">Cash Balance</div>
                    <div className="cash-balance-value">£{balance}</div>
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
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input type="text" id="cardNumber" name="cardNumber" onChange={handleCardNumberChange}/>
                    <label htmlFor="amount">Amount (GBP):</label>
                    <input type="number" id="amount" name="amount" onChange={handleAmountChange}/>
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
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input type="text" id="cardNumber" name="cardNumber" onChange={handleCardNumberChange}/>
                    <label htmlFor="amount">Amount (GBP):</label>
                    <input type="number" id="amount" name="amount" onChange={handleAmountChange} />
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
