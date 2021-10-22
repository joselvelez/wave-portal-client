import './App.css';
import { Wave } from './components/Wave';
import { WaveStats } from './components/WaveStats';
import { useWallet } from './WalletContext';
import { TotalWaves } from './components/TotalWaves';
import { TopWaverAddress } from './components/TopWaverAddress';
import { MaxWaves } from './components/MaxWaves';
import { Transactions } from './components/Transaction';
import { useContract } from './hooks/useContract';
import { Connect } from './components/Connect';

function App() {
  const { switchTheme, currentAccount, setCurrentAccount } = useWallet();
  const { contractAddress } = useContract();

  const ethereum = window.ethereum;

  const handleAccountChange = (account) => {
    console.log("Changing account");
    setCurrentAccount(account);
  }

  ethereum.on('accountsChanged', handleAccountChange);

  return (
    <section>
      <div className="theme-switcher">
        <input className="switcherInput" type="checkbox" id="switcher" onChange={() => switchTheme()} />
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
            <p>I added React context to manage some global state.</p>
            <p>
              I also created a custom hook to handle interfacing with the contract without having to create a new
               provider, signer and contract each time it was needed.
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
          {currentAccount ? <Wave /> : <Connect />}
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

        <div className="app">
          <WaveStats />
        </div>          

        <div className="app">
          <Transactions />
        </div>

      </div>
    </section>
  );
}

export default App;
