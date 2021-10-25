import { useEffect, useState, useContext } from "react"
import AppContext from "../context/app-context";

export const LastWaverAddress = () => {
    const appContext = useContext(AppContext);    
    const [lastWaverAddress, setLastWaverAddress] = useState();

    appContext.state.contractProvider.on('NewWave', (from, timestamp, msg) => {
        fetchLastWaverAddress();
    });

    const fetchLastWaverAddress = async () => {
        try {
            const _lastWaverAddress = await appContext.state.contractProvider.getLastWaver();
            setLastWaverAddress(_lastWaverAddress);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        console.log("Loading last waver address");
        fetchLastWaverAddress()
    }, []);

    return (
        <div>
            <h4>Last waver was</h4>
            <a href={`https://rinkeby.etherscan.io/address/${lastWaverAddress}`}>{lastWaverAddress}</a>
        </div>
    )
}
