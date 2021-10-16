import './App.css';
import { useEffect, useState } from 'react';
import { Wave } from './Wave';
import { WaveStats } from './WaveStats';
import { Connect } from './Connect';
import { useWallet } from './WalletContext';
import { TotalWaves } from './TotalWaves';
import { TopWaverAddress } from './TopWaverAddress';
import { MaxWaves } from './MaxWaves';
import { Transactions } from './Transaction';

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
        <input className="switcherInput" type="checkbox" id="switcher" onChange={() => switchTheme()} />
        <label className="switcherLabel" htmlFor="switcher">Switch</label>
      </div>
      
      <div className="mainContainer">
        <div className="greeting">
          <div className="greetingContent">
            <h1>👋 Hi folks!</h1>
            <p>
              My name is Jose and I'm looking to transition from finance to web3.
               Web3 is going to fundamentally change how we interact online. 
              I want to be a part of that transformation!
            </p>
            <p>
              The code for this project is on my github: <b>Front End</b>:&nbsp; 
              <a href="https://github.com/joselvelez/wave-portal-client">https://github.com/joselvelez/wave-portal-client</a>&nbsp; 
              <b>Hardhat project</b>: <a href="https://github.com/joselvelez/wave-portal-jv">https://github.com/joselvelez/wave-portal-jv</a>
            </p>
          </div>
        </div>

        <div className="app">
          {currentAccount ? <Wave /> : <Connect /> }
        </div>

        <div className="app">
          <div className="waveStat">
            <TotalWaves />
          </div>
          <div className="waveStat">
            <TopWaverAddress />
          </div>
          <div className="waveStat">
            <MaxWaves />
          </div>
        </div>

        {currentAccount ?
            <div className="app">
              <WaveStats />
            </div> : ''          
        }

        <div className="app">
          <Transactions />
        </div>

      </div>
    </section>
  );
}

export default App;
