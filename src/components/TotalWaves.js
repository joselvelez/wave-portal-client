import { useCallback, useEffect, useState } from "react";
import { useContract } from "../hooks/useContract";

export const TotalWaves = () => {
    const { contractProvider } = useContract();
    const [totalWaves, setTotalWaves] = useState();

    const fetchWaves = useCallback(async () => {
        const _waves = await contractProvider.getTotalWaves();
        setTotalWaves(_waves);
    }, [contractProvider]);

    useEffect(() => {
        fetchWaves()
            .catch(e => console.log(e));
    }, [fetchWaves]);

    return totalWaves ? `Total Waves: ${totalWaves.toString()}` : 'No waves';
}
