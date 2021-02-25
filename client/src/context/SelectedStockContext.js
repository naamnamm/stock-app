import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

export const SelectedStockContext = createContext();

export function useStock() {
  return useContext(SelectedStockContext);
}

export const SelectedStockProvider = ({ children }) => {
  const [selectedStock, setSelectedStock] = useState('');

  const value = useMemo(() => ({ selectedStock, setSelectedStock }), [
    selectedStock,
    setSelectedStock,
  ]);

  return (
    <SelectedStockContext.Provider value={value}>
      {children}
    </SelectedStockContext.Provider>
  );
};
