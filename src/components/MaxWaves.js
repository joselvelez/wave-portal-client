import { useEffect, useState } from "react"
import { useWallet } from "../WalletContext";

export const MaxWaves = () => {
    const [maxWaves, setMaxWaves] = useState();
    const { contractProvider } = useWallet();

    useEffect(() => {
        getMaxWaves();
    });

    const getMaxWaves = async () => {
        try {
            setMaxWaves(await contractProvider.getMaxWaves());
        } catch(e) {
            console.log(e);
        }
    }
    return maxWaves ? `Most Waves: ${maxWaves}` : 'No waves';
}