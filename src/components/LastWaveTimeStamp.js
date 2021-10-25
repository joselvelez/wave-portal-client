import { useEffect, useState, useContext } from "react";
import AppContext from "../context/app-context";

export const LastWaveTimeStamp = () => {
    const appContext = useContext(AppContext);
    const [lastWaveTimeStamp, setLastWaveTimeStamp] = useState();

    appContext.state.contractProvider.on('NewWave', (from, timestamp, msg) => {
        fetchLastWaverTimestamp();
    });

    const fetchLastWaverTimestamp = async () => {
        try {
            const _lastWaverTimestamp = Date(await appContext.state.contractProvider.getLastWaveAt());
            setLastWaveTimeStamp(_lastWaverTimestamp);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        console.log("Loading last waver time stamp");
        fetchLastWaverTimestamp()
    }, []);

    return (
        <div>
            <h4>Last wave was</h4>
            <p>{lastWaveTimeStamp}</p>
        </div>
    )
}