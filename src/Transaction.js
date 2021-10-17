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

    const getWaves = async () => {
        let data = [];
        
        try {
            data = await contract.getWavesArray();
        } catch (e) {
            console.log(e);
        }
        setWavesArray(data);
    }

    if (ethereum) {
        contract.on("NewWave", (from, timestamp, message) => {
            console.log(`New wave from ${from} at ${timestamp}: ${message}`);
    
            setWavesArray(prev => [...prev, {
                waver: from,
                timestamp: timestamp,
                message: message
            }]);
        });
    } else {
        console.log("Connect your wallet.");
    }

    useEffect(() => {
        getWaves();
    });

    return (
        <div>
            {wavesArray ? 
                <div>
                    {wavesArray.map((item, index) => {
                        return (
                            <div key={index} className="waveHistory">
                                <div className="waver">
                                    <div className="waverData">Waver Address: {item.waver}</div>
                                    <div className="waverData">Timestamp: {(new Date(item.timestamp * 1000)).toString()}</div>
                                </div>
                                <div className="waveMessage">
                                    <h4>Message: {item.message}</h4>
                                </div>
                            </div>
                        );
                    })}
                </div> : 
                <p>loading...</p>
            }
        </div>
    );
}