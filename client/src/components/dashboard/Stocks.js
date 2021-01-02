import React, { useEffect, useState } from 'react';
import SearchNav from './SearchNav';

const Stocks = ({ setSelectedStock, selectedStock, handleLogin }) => {
  const [stock, setStock] = useState('');

  console.log(selectedStock);

  const getStock = async () => {
    const url = `https://cloud.iexapis.com/stable/stock/${selectedStock.toLowerCase()}/batch?types=quote,news,chart&token=pk_cd4a2d89dfbe4945828c42cdaadbed9c`;

    const response = await fetch(url);
    const data = await response.json();

    setStock(data);

    console.log(data);
  };

  useEffect(() => {
    getStock();
  }, [selectedStock, stock]);

  return (
    <>
      <SearchNav
        setSelectedStock={setSelectedStock}
        handleLogin={handleLogin}
      />
      <div>stock page</div>
      <div>{stock ? stock.quote.companyName : null}</div>
    </>
  );
};

export default Stocks;
