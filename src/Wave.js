import { ethers } from "ethers";
import { useWallet } from "./WalletContext";

export const Wave = () => {
    const {currentAccount, contractAddress, contractABI} = useWallet();

    const sendWave = async () => {
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
        <button className="btnConnectWallet" onClick={() => sendWave()}>
            Go ahead... Send a wave!!!
        </button>
        </>
    );
};