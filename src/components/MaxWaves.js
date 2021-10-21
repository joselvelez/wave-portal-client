import { useCallback, useEffect, useState } from "react"
import { useContract } from "../hooks/useContract";

export const MaxWaves = () => {
    const [maxWaves, setMaxWaves] = useState();
    const { contractProvider } = useContract();

    const fetchMaxWaves = useCallback(async () => {
        const _maxWaves = await contractProvider.getMaxWaves();
        setMaxWaves(_maxWaves);
    }, [contractProvider]);

    useEffect(() => {
        console.log("Loading max waves data.");
        fetchMaxWaves()
            .catch(e => console.log(e));
    }, [fetchMaxWaves]);

    return maxWaves ? `Most Waves: ${maxWaves}` : 'No waves';
}