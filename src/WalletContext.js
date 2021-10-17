import React, { useState, useContext, useEffect } from "react";
import abi from  './utils/WavePortal.json';

const WalletContext = React.createContext();

export function WalletProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState();
  const [lastWaverAddress, setLastWaverAddress] = useState();
  const contractAddress ='0xB7C1169F20c3EAb230D1787409fa238EeA898D0B';
  // const contractAddress ='0x5fbdb2315678afecb367f032d93f642f64180aa3'; // Local testnet
  const contractABI = abi.abi;

  const walletObject = {
      contractAddress,
      contractABI,
      currentAccount,
      setCurrentAccount,
      lastWaverAddress,
      setLastWaverAddress
    };

  // Confirm access to window.ethereum object
  const checkWalletConnection = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("You need to connect your MetaMask wallet!");
        return;
      } 

      // Check if app is authorized to access this account
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
          console.log("Found an authorized account", accounts[0]);
          setCurrentAccount(accounts[0]);
      } else {
          console.log("No authorized account found");
      }

    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    checkWalletConnection();
  }, [currentAccount]);

  return (
      <WalletContext.Provider value={walletObject}>
          {children}
      </WalletContext.Provider>
  );
}

export const useWallet = () => {
    const {currentAccount, setCurrentAccount, contractAddress, contractABI, lastWaverAddress, setLastWaverAddress} = useContext(WalletContext);
    return {currentAccount, setCurrentAccount, contractAddress, contractABI, lastWaverAddress, setLastWaverAddress};
}