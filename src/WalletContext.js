import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "./constants/contractConstants"

const WalletContext = React.createContext();

export function WalletProvider({ children }) {
  const [currentTheme, setTheme] = useState('light');
  const [currentChain, setCurrentChain] = useState();
  const [currentAccount, setCurrentAccount] = useState();
  const [walletAccessible, setWalletAccessible] = useState(false);
  const [contractProvider, setContractProvider] = useState();
  const [contractSigner, setContractSigner] = useState();
  let provider;
  let signer;

  const switchTheme = () => {
    setTheme(currentTheme !== "light" ? "light" : "dark");
  };

  const value = {
      switchTheme,
      contractAddress,
      contractProvider,
      contractSigner,
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
        console.log(`Current Chain ID: ${_chain}`);
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
        provider = new ethers.providers.Web3Provider(window.ethereum)
        signer = provider.getSigner();
        setContractProvider(new ethers.Contract(contractAddress, contractABI, provider));
        setContractSigner(new ethers.Contract(contractAddress, contractABI, signer));
        fetchAccounts();
        fetchChainId();

      } else {
        console.log("'window.etherem' object is not available. Must have a wallet installed.");
      }

    }, [currentTheme]);

  return (
      <WalletContext.Provider value={value}>
        {children}
      </WalletContext.Provider>
  );
}

export const useWallet = () => {
    const {switchTheme, contractAddress, contractProvider, contractSigner, walletAccessible, setWalletAccessible, setCurrentAccount, currentAccount, currentChain, setCurrentChain} = useContext(WalletContext);
    return {switchTheme, contractAddress, contractProvider, contractSigner, walletAccessible, setWalletAccessible, setCurrentAccount, currentAccount, currentChain, setCurrentChain};
}