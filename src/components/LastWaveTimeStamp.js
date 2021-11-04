import { useEffect, useState } from "react";
import { fetchLastWaverTimestamp, getContractProvider } from "../contracts/contractAPI";

export const LastWaveTimeStamp = () => {
    const [lastWaveTimeStamp, setLastWaveTimeStamp] = useState();
    const provider = getContractProvider();

    provider.on('NewWave', (from, timestamp, msg) => {
        loadLastWaverTimestamp();
    });

    useEffect(() => {
        console.log("Loading last waver time stamp");
        loadLastWaverTimestamp();
    }, []);

    async function loadLastWaverTimestamp() {
        const _lastWaverTimestamp = await fetchLastWaverTimestamp();
        setLastWaveTimeStamp(_lastWaverTimestamp);
    }

    return (
        <div>
            <h4>Last wave was</h4>
            <p>{lastWaveTimeStamp}</p>
        </div>
    )
}