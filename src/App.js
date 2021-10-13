import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import './App.css';
import { Wave } from './Wave';

function App() {
  const [currentTheme, setTheme] = useState('light');
  const [currentAccount, setCurrentAccount] = useState('');

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

      // Check if app is authorized to access the user's wallet
      // json-rpc method used: https://eth.wiki/json-rpc/API#eth_accounts
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }

    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    checkWalletConnection();
  }, [])

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("You need MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts'});

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log(e);
    }
  }

  document.body.setAttribute('theme', currentTheme);

  const switchTheme = () => {
    setTheme(currentTheme !== "light" ? "light" : "dark");
  };

  return (
    <section>
      <div className="theme-switcher">
        <input type="checkbox" id="switcher" onChange={() => switchTheme()} />
        <label htmlFor="switcher">Switch</label>
      </div>
      
      <div className="mainContainer">
        <div className="greeting">
          <div className="content">
            <h1>👋 Hi folks!</h1>
            <br />
          </div>
          <div className="content">
            <p>I am Jose and I'm looking to transition from finance to web3. Web3 is going to fundamentally change how we interact online. I want to be a part of that transformation!</p>
          </div>
        </div>

        <div className="app">
          <Wave account={currentAccount} connect={connectWallet}/>
        </div>
      </div>
    </section>
  );
}

export default App;
