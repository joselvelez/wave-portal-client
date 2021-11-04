import { useEffect, useState } from "react";
import { fetchMaxWaves, getContractProvider } from "../contracts/contractAPI";

export const MaxWaves = () => {
    const [maxWaves, setMaxWaves] = useState(null);
    const provider = getContractProvider();

    provider.on('NewWave', (from, timestamp, msg) => {
        loadMaxWaves();
    });

    useEffect(() => {
        console.log("Loading max waves data.");
        loadMaxWaves();
    }, []);

    async function loadMaxWaves() {
        const _maxWaves = await fetchMaxWaves();
        setMaxWaves(_maxWaves);
    }

    return maxWaves ? `Most Waves: ${maxWaves}` : 'No max waves';
}