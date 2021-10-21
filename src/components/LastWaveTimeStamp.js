import { useCallback, useEffect, useState } from "react"
import { useContract } from "../hooks/useContract";

export const LastWaveTimeStamp = () => {
    const [lastWaveTimeStamp, setLastWaveTimeStamp] = useState();
    const { contractProvider } = useContract();

    const fetchLastWaverTimestamp = useCallback(async () => {
        const _lastWaverTimestamp = Date(await contractProvider.getLastWaveAt());
        setLastWaveTimeStamp(_lastWaverTimestamp);
    }, [contractProvider]);

    useEffect(() => {
        console.log("Loading last waver time stamp");
        fetchLastWaverTimestamp();
    }, [fetchLastWaverTimestamp]);

    return (
        <div>
            <h4>Last wave was</h4>
            <p>{lastWaveTimeStamp}</p>
        </div>
    )
}