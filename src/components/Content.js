import { useContext } from 'react';
import { Wave } from './Wave';
import { WaveStats } from './WaveStats';
import { TotalWaves } from './TotalWaves';
import { TopWaverAddress } from './TopWaverAddress';
import { MaxWaves } from './MaxWaves';
import { Transactions } from './Transactions';
import { contractAddress } from '../constants/contractConstants';
import AppContext from '../context/app-context';
import { Debug } from './Debug';
import { ethers } from 'ethers';

export const Content = () => {
  const appContext = useContext(AppContext);
  const ethereum = window.ethereum;

  // Handle wallet events (Docs @ https://docs.metamask.io/guide/ethereum-provider.html#events)
  ethereum.on('accountsChanged', (accounts) => {
  console.log("Changing account");
  appContext.getAccounts(accounts)
  });

  ethereum.on('chainChanged', (chainId) => {
  console.log(`Switching chains to ${chainId}`);
  appContext.getChain(chainId);
  window.location.reload();
  });

  appContext.state.contractProvider.on('NewWave', (from, timestamp, msg) => {
    console.log(`wave from ${from}`);
  })

  return (
    <section>

      <div className="theme-switcher">
        <input className="switcherInput" type="checkbox" id="switcher" onChange={() => appContext.setTheme(!appContext.state.darkTheme)} />
        <label className="switcherLabel" htmlFor="switcher">Switch</label>
      </div>
      
      <div className="mainContainer">
        <div className="greeting">
          <div className="greetingContent">
            <h1>simple web3 dapp</h1>
            <p>
              This is a simple web3 dapp that tracks waves from senders. Each wave can also have a message attached that will display below.
            </p>
            <p>
              This app is a slight variation from the <a href="https://buildspace.so/">buildspace</a> course app. Much of the logic has been
              separated into distinct components.
            </p>
            <p>
              The current contract address for this web3 app is &nbsp;
              <a href={`https://rinkeby.etherscan.io/address/${contractAddress}`}>{contractAddress}</a>
            </p>
            <p>The code for this project is on my github:</p>
            <p>
              <b>Front End</b>: <a href="https://github.com/joselvelez/wave-portal-client">https://github.com/joselvelez/wave-portal-client</a>&nbsp; 
              <b>Hardhat project</b>: <a href="https://github.com/joselvelez/wave-portal-jv">https://github.com/joselvelez/wave-portal-jv</a>
            </p>
          </div>
        </div>

        <div className="app">
          <Wave />
        </div>

        {/* Debug Content */}
        {/* <div className="app">
          <Debug />
        </div> */}

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

        <div className="app">
          <WaveStats />
        </div>          

        <div className="app">
          <Transactions />
        </div>

      </div>
    </section>
  );
};