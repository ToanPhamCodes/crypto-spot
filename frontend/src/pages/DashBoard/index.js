import React, { useState } from 'react';
import Sidebar from 'components/SideBar';
import TickerSearch from 'components/TickerSearch';
import './style.css';

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState('home');

  const handleSelection = (item) => {
    setSelectedItem(item);
  };

  const renderComponent = () => {
    switch (selectedItem) {
      case 'home':
        return <div><TickerSearch/></div>;
      case 'trade':
        return <div>Trade Component</div>;
      case 'portfolio':
        return <div>Portfolio Component</div>;
      case 'support':
        return <div>Support Component</div>;
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
