import { useEffect, useState } from "react"
import { useWallet } from "./WalletContext";

export const TopWaverAddress = () => {
    const [topWaverAddress, setTopWaverAddress] = useState();
    const { contractProvider } = useWallet();

    useEffect(() => {
        getTopWaverAddress();
    });

    const getTopWaverAddress = async () => {
        try {
            setTopWaverAddress(await contractProvider.getTopWaver());
        } catch(e) {
            console.log(e);
        }
    }
    return topWaverAddress ? `Top Waver Address: ${topWaverAddress}` : 'No waves';
}