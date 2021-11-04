import { useEffect, useState } from "react";
import { fetchTopWaverAddress, getContractProvider } from "../contracts/contractAPI";

export const TopWaverAddress = () => {
    const [topWaverAddress, setTopWaverAddress] = useState();
    const provider = getContractProvider();

    provider.on('NewWave', (from, timestamp, msg) => {
        fetchTopWaverAddress();
    });

    useEffect(() => {
        console.log("Loading top waver address");
        loadTopwaverAddress();
    }, []);

    async function loadTopwaverAddress() {
        const _topWaverAddress = await fetchTopWaverAddress();
        setTopWaverAddress(_topWaverAddress);
    }
    
    return topWaverAddress ? `Top Waver Address: ${topWaverAddress}` : 'No waves';
}