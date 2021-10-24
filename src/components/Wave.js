import { useRef } from "react";
import { useWallet } from "../WalletContext";

export const Wave = () => {
  const { contractSigner } = useWallet();
  const msgText = useRef();
  let isMining = false;

  const sendWave = async (msg) => {
    try {
      const waveTxn = await contractSigner.wave(msg, {gasLimit: 300000})
      .catch(e => console.log(e));

      console.log("Mining transaction...", waveTxn);
      isMining = true;
      await waveTxn.wait();
      console.log("Mined...", waveTxn);

      console.log('msg...', msg);
      isMining = false;
    } catch (e) {
      console.log(`Transaction failed. Check contract on etherscan for more information`);
    }
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