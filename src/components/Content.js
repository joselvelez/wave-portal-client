import { Wave } from './Wave';
import { WaveStats } from './WaveStats';
import { TotalWaves } from './TotalWaves';
import { TopWaverAddress } from './TopWaverAddress';
import { MaxWaves } from './MaxWaves';
import { Transactions } from './Transaction';
import { Connect } from './Connect';
import { useWallet } from '../WalletContext';

export const Content = () => {
    const { switchTheme, contractAddress, setCurrentAccount, currentAccount, setCurrentChain } = useWallet();
    const ethereum = window.ethereum;

    // Log events (Docs @ https://docs.metamask.io/guide/ethereum-provider.html#events)
    ethereum.on('accountsChanged', (account) => {
    console.log("Changing account");
    setCurrentAccount(account[0]);
    });

    ethereum.on('chainChanged', (chainId) => {
    console.log(`Switching chains to ${chainId}`);
    setCurrentChain(chainId);
    window.location.reload();
    });

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
};