import './App.css';
import { useEffect, useState } from 'react';
import { Wave } from './components/Wave';
import { WaveStats } from './components/WaveStats';
import { useWallet } from './WalletContext';
import { TotalWaves } from './components/TotalWaves';
import { TopWaverAddress } from './components/TopWaverAddress';
import { MaxWaves } from './components/MaxWaves';
import { Transactions } from './components/Transaction';

function App() {
  const {switchTheme, currentAccount, contractAddress} = useWallet();

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
              The current contract address for this web3 app is &nbsp;
              <a href={`https://rinkeby.etherscan.io/address/${contractAddress}`}>{contractAddress}</a>
            </p>
            <p>
              The code for this project is on my github: <b>Front End</b>:&nbsp; 
              <a href="https://github.com/joselvelez/wave-portal-client">https://github.com/joselvelez/wave-portal-client</a>&nbsp; 
              <b>Hardhat project</b>: <a href="https://github.com/joselvelez/wave-portal-jv">https://github.com/joselvelez/wave-portal-jv</a>
            </p>
          </div>
        </div>

        <div className="app">
          {/* <Wave /> */}
        </div>

        <div className="app">
          <div className="waveStat">
            {/* <TotalWaves /> */}
          </div>
          <div className="waveStat">
            {/* <TopWaverAddress /> */}
          </div>
          <div className="waveStat">
            {/* <MaxWaves /> */}
          </div>
        </div>

        {/* {currentAccount ?
            <div className="app">
              <WaveStats />
            </div> : ''          
        } */}

        <div className="app">
          {/* <Transactions /> */}
        </div>

      </div>
    </section>
  );
}

export default App;
