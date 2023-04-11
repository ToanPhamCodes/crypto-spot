import React, { useState, useEffect } from 'react';
import Sidebar from 'components/SideBar';
import TickerSearch from 'components/TickerSearch';
import Contact from 'components/Contact';
import Portfolio from 'components/Portfolio';

import { useLocation } from 'react-router-dom';
import './style.css';

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState('home');

  const location = useLocation();
  const userId = location.state.userId;
  const [user, setUser] = useState(null);

  const handleSelection = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`http://127.0.0.1:8000/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    };

    fetchUserData();
  }, [userId]);


  const coins = [
    {
      id: "1",
      name: "Bitcoin",
      amount: "123",
      priceBought: "123",
      symbol: "BTC",
      change: "%",
    },
    {
      id: "2",
      name: "Litecoin",
      amount: "123",
      priceBought: "123",
      symbol: "LTC",  
      change: "%",
    },

  ];

  const balance = 42412;

  const renderComponent = () => {
    switch (selectedItem) {
      case 'home':
        return <div><TickerSearch/></div>;
      case 'setting':
        return <div>Setting</div>;
      case 'portfolio':
        return <div><Portfolio balance={user ? user.account.cashWallet.balance : 0} coins={coins} /></div>;
      case 'support':
        return <div><Contact></Contact></div>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="left">
        <Sidebar onSelection={handleSelection} />
      </div>
      <div className="middle">{renderComponent()}</div>
    </div>
  );
};

export default Dashboard;
