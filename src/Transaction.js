import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWallet } from "./WalletContext";

export const Transactions = () => {
    const [wavesArray, setWavesArray] = useState([]);
    const {contractAddress, contractABI} = useWallet();
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const wavesArrayCleaned = [];

    useEffect(() => {
        getWaves();
    }, []);

    const getWaves = async () => {
        try {
            const waves = await contract.getWavesArray();
            waves.forEach(item => {
                wavesArrayCleaned.push({
                    waver: item.waver,
                    timestamp: new Date(item.timestamp * 1000),
                    message: item.message
                });
            });
        } catch (e) {
            console.log(e);
        }
        setWavesArray(wavesArrayCleaned);
    }
    console.log(wavesArray);

    return (
        <div>
            {wavesArray.map((item, index) => {
                return (
                    <div key={index} className="waveHistory">
                        <div className="waver">
                            <div className="waverData">Waver Address: {item.waver}</div>
                            <div className="waverData">Timestamp: {item.timestamp.toString()}</div>
                        </div>
                        <div className="waveMessage">
                            <h4>Message: {item.message}</h4>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}