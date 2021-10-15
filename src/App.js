import './App.css';
import { useEffect, useState } from 'react';
import { Wave } from './Wave';
import { WaveStats } from './WaveStats';
import { Connect } from './Connect';
import { useWallet } from './WalletContext';

function App() {
  const {currentAccount} = useWallet();
  const [currentTheme, setTheme] = useState('light');

  useEffect(() => {
    console.log(`Setting current threme to ${currentTheme} mode.`);
  }, [currentTheme])

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
            <p>I am Jose and I'm looking to transition from finance to web3. Web3 is going to fundamentally change how we interact online.</p>
            <p>I want to be a part of that transformation!</p>
          </div>
        </div>

          {currentAccount ?
            <div className="app">
              <WaveStats />
            </div> : ''          
          }

        <div className="app">
          {currentAccount ? <Wave /> : <Connect /> }
        </div>

        <div className="greeting">
          <p>The code for this project is on my github:</p>
          <p>Front End - <a href="https://github.com/joselvelez/wave-portal-client">https://github.com/joselvelez/wave-portal-client</a></p>
          <p>Hardhat project - <a href="https://github.com/joselvelez/wave-portal-jv">https://github.com/joselvelez/wave-portal-jv</a></p>
        </div>
      </div>
    </section>
  );
}

export default App;
