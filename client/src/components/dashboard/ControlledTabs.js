import React, { useState } from 'react';
import Transaction from './Transaction';
import { Tabs, Tab } from 'react-bootstrap';

const ControlledTabs = ({ currentPrice, setOrderMsg, currentBalance }) => {
  const [type, setType] = useState('buy');

  return (
    <Tabs
      id='controlled-tab-example'
      activeKey={type}
      onSelect={(k) => setType(k)}
    >
      <Tab eventKey='buy' title='Buy'>
        <Transaction
          type={type}
          currentPrice={currentPrice}
          setOrderMsg={setOrderMsg}
        />
      </Tab>
      <Tab eventKey='sell' title='Sell'>
        <Transaction
          type={type}
          currentPrice={currentPrice}
          setOrderMsg={setOrderMsg}
        />
      </Tab>
    </Tabs>
  );
};

export default ControlledTabs;
