import { ethers } from "ethers";
import React, { useState, useContext, useEffect } from "react";
import { Connect } from "./Connect";
import abi from  './utils/WavePortal.json';

const WalletContext = React.createContext();

export function WalletProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState();
  const [lastWaverAddress, setLastWaverAddress] = useState();
  const [contractProvider, setContractProvider] = useState();
  const [contractSigner, setContractSigner] = useState();
  const contractAddress ='0x9f8f0C33E1e75f88DE860682CaBD5504BcD93c93';
  const contractABI = abi.abi;
  let provider;

  const walletObject = {
      currentAccount,
      setCurrentAccount,
      lastWaverAddress,
      setLastWaverAddress,
      contractProvider,
      contractSigner
    };

  const handleAccountsChanged = (accountsArray) => {
    if (accountsArray.length === 0) {
      console.log("not accounts bro!");
    } else if (accountsArray[0] !== currentAccount ) {
      console.log(`account loaded: ${accountsArray[0]}`);
      setCurrentAccount(accountsArray[0]);
    }
  }

  window.ethereum.on('accountsChanged', handleAccountsChanged);

  const checkWalletConnection = async () => {
      if (!window.ethereum) {
        console.log("You need to install MetaMask");
      } else {

        let userAccounts = await window.ethereum.request({method: 'eth_accounts'});

        if (currentAccount) {
          setCurrentAccount(userAccounts[0]);
          provider = new ethers.providers.Web3Provider(window.ethereum);
          // setContractProvider(new ethers.Contract(contractAddress, contractABI, provider));
          // setContractSigner(new ethers.Contract(contractAddress, contractABI, provider.getSigner()));
        } else {
          console.log('You need to connect your wallet');
        }
      }
  }

  useEffect(() => {
    checkWalletConnection();
    console.log(currentAccount);
  });

  return (
      <WalletContext.Provider value={walletObject}>
          {currentAccount ? children : <Connect />}
      </WalletContext.Provider>
  );
}

export const useWallet = () => {
    const {currentAccount, setCurrentAccount, lastWaverAddress, setLastWaverAddress, contractProvider, contractSigner} = useContext(WalletContext);
    return {currentAccount, setCurrentAccount, lastWaverAddress, setLastWaverAddress, contractProvider, contractSigner};
}