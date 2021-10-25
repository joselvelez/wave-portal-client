import { useEffect, useState, useContext } from "react";
import AppContext from "../context/app-context";

export const TopWaverAddress = () => {
    const appContext = useContext(AppContext);
    const [topWaverAddress, setTopWaverAddress] = useState();

    appContext.state.contractProvider.on('NewWave', (from, timestamp, msg) => {
        fetchTopWaverAddress();
    });

    const fetchTopWaverAddress = async () => {
        try {
            const _topWaverAddress = await appContext.state.contractProvider.getTopWaver();
            setTopWaverAddress(_topWaverAddress);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        console.log("Loading top waver address");
        fetchTopWaverAddress()
    }, []);
    
    return topWaverAddress ? `Top Waver Address: ${topWaverAddress}` : 'No waves';
}