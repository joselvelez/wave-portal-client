import { useCallback, useEffect, useState } from "react"
import { useWallet } from "../WalletContext";

export const LastWaverAddress = () => {
    const [lastWaverAddress, setLastWaverAddress] = useState();
    const { contractProvider } = useWallet();

    const fetchLastWaverAddress = useCallback(async () => {
        const _lastWaverAddress = await contractProvider.getLastWaver();
        setLastWaverAddress(_lastWaverAddress);
    }, [contractProvider]);

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
