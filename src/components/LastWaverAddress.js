import { useCallback, useEffect, useState, useContext } from "react"
import AppContext from "../context/app-context";

export const LastWaverAddress = () => {
    const appContext = useContext(AppContext);    
    const [lastWaverAddress, setLastWaverAddress] = useState();

    const fetchLastWaverAddress = useCallback(async () => {
        const _lastWaverAddress = await appContext.state.contractProvider.getLastWaver();
        setLastWaverAddress(_lastWaverAddress);
    }, [appContext.state.contractProvider]);

    useEffect(() => {
        console.log("Loading last waver address");
        fetchLastWaverAddress()
            .catch(e => console.log(e));
    }, [fetchLastWaverAddress]);

    return (
        <div>
            <h4>Last waver was</h4>
            <a href={`https://rinkeby.etherscan.io/address/${lastWaverAddress}`}>{lastWaverAddress}</a>
        </div>
    )
}
