import { useEffect, useState, useContext } from "react";
import AppContext from "../context/app-context";

export const MaxWaves = () => {
    const appContext = useContext(AppContext);
    const [maxWaves, setMaxWaves] = useState();

    appContext.state.contractProvider.on('NewWave', (from, timestamp, msg) => {
        fetchMaxWaves();
    });

    const fetchMaxWaves = async () => {
        try {
            const _maxWaves = await appContext.state.contractProvider.getMaxWaves();
            setMaxWaves(_maxWaves);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        console.log("Loading max waves data.");
        fetchMaxWaves()
    }, []);

    return maxWaves ? `Most Waves: ${maxWaves}` : 'No waves';
}