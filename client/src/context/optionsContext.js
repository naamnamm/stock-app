import React, { createContext, useState, useContext, useMemo } from 'react';

export const OptionsContext = createContext();
export const OptionsUpdateContext = createContext();
//const OptionsUpdateContext = React.createContext();

// export function useOptions() {
//   return useContext(OptionsContext);
// }
// export function useOptionsUpdate() {
//   return useContext(OptionsUpdateContext);
// }

// export const OptionsProvider = ({ children }) => {
//   const [searchInput, setSearchInput] = useState('');
//   const [options, setOptions] = useState([]);

//   const searchValue = useMemo(() => ({ searchInput, setSearchInput }), [
//     searchInput,
//     setSearchInput,
//   ]);
//   const optionsValue = useMemo(() => ({ options, setOptions }), [
//     options,
//     setOptions,
//   ]);

//   return (
//     <OptionsContext.Provider value={searchValue}>
//       <OptionsUpdateContext.Provider value={optionsValue}>
//         {children}
//       </OptionsUpdateContext.Provider>
//     </OptionsContext.Provider>
//   );
// };

//https://dev.to/nazmifeeroz/using-usecontext-and-usestate-hooks-as-a-store-mnm
