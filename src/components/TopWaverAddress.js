import { useCallback, useEffect, useState, useContext } from "react";
import AppContext from "../context/app-context";

export const TopWaverAddress = () => {
    const appContext = useContext(AppContext);
    const [topWaverAddress, setTopWaverAddress] = useState();

    const fetchTopWaverAddress = useCallback(async () => {
        const _topWaverAddress = await appContext.state.contractProvider.getTopWaver();
        setTopWaverAddress(_topWaverAddress);
    }, [appContext.state.contractProvider]);

    useEffect(() => {
        console.log("Loading top waver address");
        fetchTopWaverAddress()
            .catch(e => console.log(e));
    }, [fetchTopWaverAddress]);
    
    return topWaverAddress ? `Top Waver Address: ${topWaverAddress}` : 'No waves';
}