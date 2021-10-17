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
    
            const waveTxn = await wavePortalContract.wave(msg, {gasLimit: 300000});
            console.log("Mining transaction...", waveTxn);
            setIsMining(true);
    
            await waveTxn.wait();
            console.log("Mined...", waveTxn);
            setLastWaverAddress(waveTxn.from);
    
            let count = await wavePortalContract.getTotalWaves();
            console.log("Retrieved total wave count...", count.toNumber());

            console.log(msg);
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
        <h3 className="miningIndicator">Transaction is being mined.....block times vary.</h3>
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