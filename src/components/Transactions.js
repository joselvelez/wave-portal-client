import { useEffect, useState } from "react";
import { fetchWaveTransactions, getContractProvider } from "../contracts/contractAPI";

export const Transactions = () => {
    const [waveTransactions, setWaveTransactions] = useState([]);
    const provider = getContractProvider();

    provider.on('NewWave', (from, timestamp, msg) => {
        loadWaveTransactions();
    });

    useEffect(() => {
        console.log("Loading wave history...");
        loadWaveTransactions();
    }, []);

    async function loadWaveTransactions() {
        const _waveTransactions = await fetchWaveTransactions();
        setWaveTransactions(_waveTransactions);
    }

    return (
        <div>
            {waveTransactions ? 
                <div>
                    {waveTransactions.map((item, index) => {
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