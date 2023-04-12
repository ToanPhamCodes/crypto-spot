import React, { useState, useEffect } from 'react';
import Sidebar from 'components/SideBar';
import TickerSearch from 'components/TickerSearch';
import Contact from 'components/Contact';
import Portfolio from 'components/Portfolio';
import Settings from 'components/Settings';

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

  const coins = user ? user.account.cryptoWallets.coins : [];
  const balance = user ? user.account.cashWallet.balance : 0;
  const userName = user ? user.firstName: "";
  const userLastName = user ? user.lastName: "";
  const userEmail = user ? user.email: "";
  const userPassword = user ? user.password: "";


  const renderComponent = () => {
    switch (selectedItem) {
      case 'home':
        return <div><TickerSearch balance={balance} userId={userId}/></div>;
      case 'setting':
        return <div><Settings userId={userId} userName={userName} userLastName={userLastName} userEmail={userEmail} userPassword={userPassword}/></div>;
      case 'portfolio':
        return <div><Portfolio balance={balance} coins={coins} userId={userId}/></div>;
      case 'support':
        return <div><Contact/></div>;
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
