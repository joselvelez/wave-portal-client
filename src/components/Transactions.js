import { useEffect, useState, useContext } from "react";
import AppContext from "../context/app-context";

export const Transactions = () => {
    const appContext = useContext(AppContext);
    const [wavesArray, setWavesArray] = useState([]);

    appContext.state.contractProvider.on('NewWave', (from, timestamp, msg) => {
        fetchWavesArray();
    });

    const fetchWavesArray = async () => {
        try {
            const _wavesArray = await appContext.state.contractProvider.getWavesArray();
            setWavesArray(_wavesArray);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        console.log("Loading wave history...");
        fetchWavesArray();
    }, []);

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