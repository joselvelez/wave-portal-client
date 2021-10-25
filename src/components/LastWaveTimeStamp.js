import { useCallback, useEffect, useState, useContext } from "react";
import AppContext from "../context/app-context";

export const LastWaveTimeStamp = () => {
    const appContext = useContext(AppContext);
    const [lastWaveTimeStamp, setLastWaveTimeStamp] = useState();

    const fetchLastWaverTimestamp = useCallback(async () => {
        const _lastWaverTimestamp = Date(await appContext.state.contractProvider.getLastWaveAt());
        setLastWaveTimeStamp(_lastWaverTimestamp);
    }, [appContext.state.contractProvider]);

    useEffect(() => {
        console.log("Loading last waver time stamp");
        fetchLastWaverTimestamp()
            .catch(e => console.log(e));
    }, [fetchLastWaverTimestamp]);

    return (
        <div>
            <h4>Last wave was</h4>
            <p>{lastWaveTimeStamp}</p>
        </div>
    )
}