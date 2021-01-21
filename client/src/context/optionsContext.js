import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useRef,
  useEffect,
} from 'react';

export const OptionsContext = createContext();
export const OptionsUpdateContext = createContext();
export const refContext = createContext();
//export const InputContext = createContext();

export function useOptions() {
  return useContext(OptionsContext);
}
export function useOptionsUpdate() {
  return useContext(OptionsUpdateContext);
}
export function useRefContext() {
  return useContext(refContext);
}

export const OptionsProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState([]);
  const inputRef = useRef();
  const ulRef = useRef();

  const searchValue = useMemo(() => ({ searchInput, setSearchInput }), [
    searchInput,
    setSearchInput,
  ]);
  const optionsValue = useMemo(() => ({ options, setOptions }), [
    options,
    setOptions,
  ]);

  useEffect(() => {
    inputRef.current.addEventListener('click', (e) => {
      if (inputRef) {
        e.stopPropagation();
        ulRef.current.style.display = 'flex';
      }
    });

    document.addEventListener('click', (e) => {
      if (ulRef) {
        ulRef.current.style.display = 'none';
      }
    });
  }, []);

  return (
    <OptionsContext.Provider value={searchValue}>
      <refContext.Provider value={(inputRef, ulRef)}>
        <OptionsUpdateContext.Provider value={optionsValue}>
          {children}
        </OptionsUpdateContext.Provider>
      </refContext.Provider>
    </OptionsContext.Provider>
  );
};

//https://dev.to/nazmifeeroz/using-usecontext-and-usestate-hooks-as-a-store-mnm
