import { ethers } from "ethers";
import React, { useState, useContext, useEffect } from "react";
import abi from  './contracts/WavePortal.json';

const WalletContext = React.createContext();

export function WalletProvider({ children }) {
  const [currentTheme, setTheme] = useState('light');
  const [contractProvider, setContractProvider] = useState();
  const [contractSigner, setContractSigner] = useState();
  const contractAddress ='0x9f8f0C33E1e75f88DE860682CaBD5504BcD93c93';
  const contractABI = abi.abi;

  const switchTheme = () => {
    setTheme(currentTheme !== "light" ? "light" : "dark");
  };

  const walletObject = {
      switchTheme,
      contractProvider,
      contractSigner,
    };

    useEffect(() => {
      console.log(`Setting current threme to ${currentTheme} mode.`);
      document.body.setAttribute('theme', currentTheme);

    }, [currentTheme]);

  return (
      <WalletContext.Provider value={walletObject}>
          {children}
      </WalletContext.Provider>
  );
}

export const useWallet = () => {
    const {switchTheme, contractProvider, contractSigner} = useContext(WalletContext);
    return {switchTheme, contractProvider, contractSigner};
}