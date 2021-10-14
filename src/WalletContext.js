import React, { useState, useContext, useEffect } from "react";
import abi from  './utils/WavePortal.json';

const WalletContext = React.createContext();

export function WalletProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState('');
  const [contractAddress, setContractAddress] = useState('0x5D8858888bFc5ad37096d8184e7230d6b2629da9');
  const [contractABI, setContractABI] = useState(abi.abi);

  const walletObject = { contractAddress, setContractAddress, contractABI, setContractABI, currentAccount, setCurrentAccount };

  // Confirm access to window.ethereum object
  const checkWalletConnection = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("You need to connect your MetaMask wallet!");
        return;
      } else {
        console.log("Connection to the ethereum object established", ethereum);
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
  },[]);

  return (
      <WalletContext.Provider value={walletObject}>
          {children}
      </WalletContext.Provider>
  );
}

export const useWallet = () => {
    const {currentAccount, setCurrentAccount, contractAddress, contractABI} = useContext(WalletContext);
    return {currentAccount, setCurrentAccount, contractAddress, contractABI};
}