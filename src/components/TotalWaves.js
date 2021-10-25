import { useEffect, useState, useContext } from "react";
import AppContext from "../context/app-context";

export const TotalWaves = () => {
    const appContext = useContext(AppContext);
    const [totalWaves, setTotalWaves] = useState();

    appContext.state.contractProvider.on('NewWave', (from, timestamp, msg) => {
        fetchWaves();
    });

    const fetchWaves = async () => {
        try {
            const _waves = await appContext.state.contractProvider.getTotalWaves();
            setTotalWaves(_waves);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchWaves();
    }, []);

    return totalWaves ? `Total Waves: ${totalWaves.toString()}` : 'No waves';
}
