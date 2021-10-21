import { useCallback, useEffect, useState } from "react"
import { useContract } from "../hooks/useContract";

export const TopWaverAddress = () => {
    const [topWaverAddress, setTopWaverAddress] = useState();
    const { contractProvider } = useContract();

    const fetchTopWaverAddress = useCallback(async () => {
        const _topWaverAddress = await contractProvider.getTopWaver();
        setTopWaverAddress(_topWaverAddress);
    }, [contractProvider]);

    useEffect(() => {
        console.log("Loading top waver address");
        fetchTopWaverAddress();
    }, [fetchTopWaverAddress]);
    
    return topWaverAddress ? `Top Waver Address: ${topWaverAddress}` : 'No waves';
}