import { useEffect, useState } from "react";
import { useWallet } from "./WalletContext";

export const TotalWaves = () => {
    const { contractProvider } = useWallet();
    const [totalWaves, setTotalWaves] = useState();

    useEffect(() => {
        getTotalWaves();
    });

    const getTotalWaves = async () => {
        try {
            setTotalWaves(await contractProvider.getTotalWaves());
        } catch(e) {
            console.log(e);
        }
    }
    return totalWaves ? `Total Waves: ${totalWaves.toString()}` : 'No waves';
}
