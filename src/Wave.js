import { ethers } from "ethers";
import { useRef } from "react";
import { useState } from "react/cjs/react.development";
import { useWallet } from "./WalletContext";

export const Wave = () => {
    const {contractAddress, contractABI, setLastWaverAddress} = useWallet();
    const [isMining, setIsMining] = useState(false);
    const msgText = useRef();

    const sendWave = async (msg) => {
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
    
            const waveTxn = await wavePortalContract.wave(msg);
            console.log("Mining transaction...", waveTxn);
            setIsMining(true);
    
            await waveTxn.wait();
            console.log("Mined...", waveTxn);
            setLastWaverAddress(waveTxn.from);
    
            let count = await wavePortalContract.getTotalWaves();
            console.log("Retrieved total wave count...", count.toNumber());

            console.log(msg);
            // msgText.current.value = null;
            setIsMining(false);
    
          } else {
            console.log("Ethereum object does not exist!");
          }    
        } catch (e) {
          console.log(e);
        }
      }

    if (isMining) {
      return (
        <img src="./utils/loading.gif"  alt="loading..."/>
      )
    } else {
      return (
        <div className="waveForm">
          <form>
            <input className="message" type="text" placeholder="send a message!" ref={msgText}/>
          </form>
          <button className="btnConnectWallet" onClick={() => sendWave(msgText.current.value)}>
              Send a message and a wave! 👋
          </button>
        </div>
      )
    }
};