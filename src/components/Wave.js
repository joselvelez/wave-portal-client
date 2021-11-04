import { useRef, useState } from "react";
import { getContractSigner } from "../contracts/contractAPI";

export const Wave = () => {
  const signer = getContractSigner();
  const [isMining, setIsMining] = useState(false);
  const msgText = useRef();

  const sendWave = async (msg) => {
    try {
      const waveTxn = await signer.wave(msg, {gasLimit: 300000})
      .catch(e => console.log(e));

      console.log("Mining transaction...", waveTxn);
      setIsMining(true);
      await waveTxn.wait();
      console.log("Transaction mined successfully!", waveTxn);
      console.log('Message: ', msg);
      setIsMining(false);
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