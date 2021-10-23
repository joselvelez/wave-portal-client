import React, { useState, useContext, useEffect } from "react";

const WalletContext = React.createContext();

export function WalletProvider({ children }) {
  const [currentTheme, setTheme] = useState('light');
  const [currentChain, setCurrentChain] = useState('test');
  const [currentAccount, setCurrentAccount] = useState();
  const [walletAccessible, setWalletAccessible] = useState(false);

  const switchTheme = () => {
    setTheme(currentTheme !== "light" ? "light" : "dark");
  };

  const walletObject = {
      switchTheme,
      setCurrentAccount,
      walletAccessible,
      currentAccount,
      currentChain,
      setCurrentChain
    };

    const { ethereum } = window;

    const fetchAccounts = async () => {
      const _accounts = await ethereum.request({ method: 'eth_accounts' });
      try {
        if (_accounts.length === 0) {
          console.log("No accounts found");
        } else {
          console.log("Found an authorized account.", _accounts[0]);
          setCurrentAccount(_accounts[0]);
        }
      } catch (e) {
        console.log(e);
      }
    }

    const fetchChainId = async () => {
      const _chain = await ethereum.request({ method: 'eth_chainId'});
      try {
        console.log(`Got chain id: ${_chain}`);
        setCurrentChain(_chain);
      } catch (e) {
        console.log(e);
      }
    }

    useEffect(() => {
      document.body.setAttribute('theme', currentTheme);

      /*
        When the dapp loads, make sure the user has a wallet installed
        and the dapp has access to the window.ethereum object
      */

      if (ethereum) {
        console.log("Wallet is installed. Injecting ethereum object...");
        setWalletAccessible(true);
        fetchAccounts();
        fetchChainId();

      } else {
        console.log("'window.etherem' object is not available. Must have a wallet installed.");
      }      

    }, [currentTheme, currentAccount, currentChain]);

  return (
      <WalletContext.Provider value={walletObject}>
          {children}
      </WalletContext.Provider>
  );
}

export const useWallet = () => {
    const {switchTheme, walletAccessible, setCurrentAccount, currentAccount, currentChain, setCurrentChain} = useContext(WalletContext);
    return {switchTheme, walletAccessible, setCurrentAccount, currentAccount, currentChain, setCurrentChain};
}