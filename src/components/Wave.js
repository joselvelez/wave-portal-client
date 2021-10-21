import { useRef } from "react";
import { useContract } from "../hooks/useContract";

export const Wave = ({ changeLastWaver }) => {
    const { contractSigner } = useContract();
    const msgText = useRef();
    let isMining = false;

    const sendWave = async (msg) => {
      const waveTxn = await contractSigner.wave(msg, {gasLimit: 300000});
      console.log("Mining transaction...", waveTxn);
      isMining = true;
      await waveTxn.wait();
      console.log("Mined...", waveTxn);
      console.log('msg...', msg);
      isMining = false;
      }

    if (isMining === true) {
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