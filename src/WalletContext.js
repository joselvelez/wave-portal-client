import React, { useState, useContext, useEffect } from "react";

const WalletContext = React.createContext();

export function WalletProvider({ children }) {
  const [currentTheme, setTheme] = useState('light');
  const [currentAccount, setCurrentAccount] = useState();
  const [walletAccessible, setWalletAccessible] = useState(false);

  const switchTheme = () => {
    setTheme(currentTheme !== "light" ? "light" : "dark");
  };

  const walletObject = {
      switchTheme,
      setCurrentAccount,
      walletAccessible,
      currentAccount
    };

    useEffect(() => {
      document.body.setAttribute('theme', currentTheme);

      /*
        When the dapp loads, make sure the user has a wallet installed
        and the dapp has access to the window.ethereum object
      */
      const { ethereum } = window;

      if (ethereum) {
        console.log("Wallet found. Injecting ethereum object.");
        setWalletAccessible(true)
      } else {
        console.log("'window.etherem' object is not available. Make sure you have a wallet installed.");
      }      

    }, [currentTheme, currentAccount]);

  return (
      <WalletContext.Provider value={walletObject}>
          {children}
      </WalletContext.Provider>
  );
}

export const useWallet = () => {
    const {switchTheme, walletAccessible, setCurrentAccount, currentAccount} = useContext(WalletContext);
    return {switchTheme, walletAccessible, setCurrentAccount, currentAccount};
}