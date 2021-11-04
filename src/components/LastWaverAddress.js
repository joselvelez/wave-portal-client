import { useEffect, useState } from "react";
import { fetchLastWaverAddress, getContractProvider } from "../contracts/contractAPI";

export const LastWaverAddress = () => {
    const [lastWaverAddress, setLastWaverAddress] = useState();
    const provider = getContractProvider();

    provider.on('NewWave', (from, timestamp, msg) => {
        loadLastWaverAddress();
    });

    useEffect(() => {
        console.log("Loading last waver address");
        loadLastWaverAddress();
    }, []);

    async function loadLastWaverAddress() {
        const _lastWaverAddress = await fetchLastWaverAddress();
        setLastWaverAddress(_lastWaverAddress);
    }

    return (
        <div>
            <h4>Last waver was</h4>
            <a href={`https://rinkeby.etherscan.io/address/${lastWaverAddress}`}>{lastWaverAddress}</a>
        </div>
    )
}
