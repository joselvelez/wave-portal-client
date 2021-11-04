import { useEffect, useState } from "react";
import { fetchTotalWaves, getContractProvider } from "../contracts/contractAPI";

export const TotalWaves = () => {
    const [totalWaves, setTotalWaves] = useState();
    const provider = getContractProvider();

    provider.on('NewWave', (from, timestamp, msg) => {
        loadTotalWaves();
    });

    useEffect(() => {
        loadTotalWaves();
    }, []);

    async function loadTotalWaves() {
        const _totalWaves = await fetchTotalWaves();
        setTotalWaves(_totalWaves);
    }

    return totalWaves ? `Total Waves: ${totalWaves.toString()}` : 'No waves';
}
