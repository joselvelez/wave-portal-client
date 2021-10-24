import { useCallback, useEffect, useState } from "react"
import { useWallet } from "../WalletContext";

export const MaxWaves = () => {
    const [maxWaves, setMaxWaves] = useState();
    const { contractProvider } = useWallet();

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