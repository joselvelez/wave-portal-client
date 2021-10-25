import { useCallback, useEffect, useState, useContext } from "react";
import AppContext from "../context/app-context";

export const TotalWaves = () => {
    const appContext = useContext(AppContext);
    const [totalWaves, setTotalWaves] = useState();

    const fetchWaves = useCallback(async () => {
        const _waves = await appContext.state.contractProvider.getTotalWaves();
        setTotalWaves(_waves);
    }, [appContext.state.contractProvider]);

    useEffect(() => {
        fetchWaves()
            .catch(e => console.log(e));
    }, [fetchWaves]);

    return totalWaves ? `Total Waves: ${totalWaves.toString()}` : 'No waves';
}
