import { useCallback, useEffect, useState } from "react";
import { useContract } from "../hooks/useContract";

export const Transactions = () => {
    const [wavesArray, setWavesArray] = useState([]);
    const { contractProvider } = useContract();

    contractProvider.on("NewWave", (address, timestamp, message) => {
        console.log(`Yo! New wave from ${address}. Says ${message}.`);
        fetchWavesArray();
      });

    const fetchWavesArray = useCallback(async () => {
        const _wavesArray = await contractProvider.getWavesArray();
        setWavesArray(_wavesArray);
    }, [contractProvider]);

    useEffect(() => {
        console.log("Loading wave history...");
        fetchWavesArray()
            .catch(e => {console.log(e)})
    }, [fetchWavesArray]);

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