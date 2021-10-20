import { useEffect, useState } from "react";
import { useWallet } from "../WalletContext";

export const Transactions = () => {
    const [wavesArray, setWavesArray] = useState([]);
    const { contractProvider } = useWallet();

    useEffect(() => {
        getWaves();
    }, []);

    const getWaves = async () => {
        let data = [];
        
        try {
            data = await contractProvider.getWavesArray();
        } catch (e) {
            console.log(e);
        }
        setWavesArray(data);
    }

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