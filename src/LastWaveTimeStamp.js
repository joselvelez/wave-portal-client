import { ethers } from "ethers";
import { useEffect, useState } from "react"
import { useWallet } from "./WalletContext";

export const LastWaveTimeStamp = () => {
    const [lastWaveTimeStamp, setLastWaveTimeStamp] = useState();
    const {contractAddress, contractABI} = useWallet();
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    useEffect(() => {
        getLastWaveTimeStamp();
    });

    const getLastWaveTimeStamp = async () => {
        setLastWaveTimeStamp(Date(await contract.getLastWaveAt()));
    }

    return (
        <div className="waveStat">
            <h4>Last wave was</h4>
            <p>{lastWaveTimeStamp}</p>
        </div>
    )
}