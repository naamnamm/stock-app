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
//export const useRefContext = createContext();
export const InputContext = createContext();

export function useOptions() {
  return useContext(OptionsContext);
}
export function useOptionsUpdate() {
  return useContext(OptionsUpdateContext);
}
export function useInputRef() {
  return useContext(InputContext);
}

export const OptionsProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState([]);
  const inputRef = useRef();

  const searchValue = useMemo(() => ({ searchInput, setSearchInput }), [
    searchInput,
    setSearchInput,
  ]);
  const optionsValue = useMemo(() => ({ options, setOptions }), [
    options,
    setOptions,
  ]);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (options) {
        setOptions([]);
      }
    });
    console.log(searchInput);
    console.log(options);

    // inputRef.current.addEventListener('click', (e) => {
    //   if (inputRef) {
    //     e.stopPropagation();
    //     ulRef.current.style.display = 'flex';
    //   }
    // });
  }, []);

  return (
    <OptionsContext.Provider value={searchValue}>
      <InputContext.Provider value={inputRef}>
        <OptionsUpdateContext.Provider value={optionsValue}>
          {children}
        </OptionsUpdateContext.Provider>
      </InputContext.Provider>
    </OptionsContext.Provider>
  );
};

//https://dev.to/nazmifeeroz/using-usecontext-and-usestate-hooks-as-a-store-mnm
