import { ethers } from "ethers";
// import abi from './utils/WavePortal.json'; // Rinkeby
import abi from './utils/WavePortal.json'; // Localhost


export const Wave = ({ account, connect }) => {
    // const contractAddress = '0xa7B36508C42591aE327b3a160f5465406d9DA8E4'; // Rinkeby
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Localhost
    // const contractABI = abi.abi; // Rinkeby
    const contractABI = abi.abi; // Localhost

    const wave = async () => {
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
    
            const waveTxn = await wavePortalContract.wave();
            console.log("Mining transaction...", waveTxn);
    
            await waveTxn.wait();
            console.log("Mined...", waveTxn.hash);
    
            let count = await wavePortalContract.getTotalWaves();
            console.log("Retrieved total wave count...", count.toNumber());
    
          } else {
            console.log("Ethereum object does not exist!");
          }
    
        } catch (e) {
          console.log(e);
        }
      }

    return (
        <>
            {account ? 
                <button className="btnConnectWallet" onClick={wave}>
                    Go ahead... Send a wave!!!
                </button> :
                <button className="btnConnectWallet" onClick={connect}>
                    Connect your wallet to send a wave!
                </button>
            }
        </>
    );
};