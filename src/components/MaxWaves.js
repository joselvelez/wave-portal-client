import { useCallback, useEffect, useState, useContext } from "react";
import AppContext from "../context/app-context";

export const MaxWaves = () => {
    const appContext = useContext(AppContext);
    const [maxWaves, setMaxWaves] = useState();

    const fetchMaxWaves = useCallback(async () => {
        const _maxWaves = await appContext.state.contractProvider.getMaxWaves();
        setMaxWaves(_maxWaves);
    }, [appContext.state.contractProvider]);

    useEffect(() => {
        console.log("Loading max waves data.");
        fetchMaxWaves()
            .catch(e => console.log(e));
    }, [fetchMaxWaves]);

    return maxWaves ? `Most Waves: ${maxWaves}` : 'No waves';
}