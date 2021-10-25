import { useCallback, useEffect, useState, useContext } from "react";
import AppContext from "../context/app-context";

export const Transactions = () => {
    const appContext = useContext(AppContext);
    const [wavesArray, setWavesArray] = useState([]);

    appContext.state.contractProvider.on("NewWave", (address, timestamp, message) => {
        console.log(`Yo! New wave from ${address}. Says ${message}.`);
        fetchWavesArray();
      });

    const fetchWavesArray = useCallback(async () => {
        const _wavesArray = await appContext.state.contractProvider.getWavesArray();
        setWavesArray(_wavesArray);
    }, [appContext.state.contractProvider]);

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