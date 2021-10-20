import { useEffect, useState } from "react"
import { useWallet } from "./WalletContext";

export const LastWaveTimeStamp = () => {
    const [lastWaveTimeStamp, setLastWaveTimeStamp] = useState();
    const { contractProvider } = useWallet();

    useEffect(() => {
        getLastWaveTimeStamp();
    });

    const getLastWaveTimeStamp = async () => {
        try {
            setLastWaveTimeStamp(Date(await contractProvider.getLastWaveAt()));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h4>Last wave was</h4>
            <p>{lastWaveTimeStamp}</p>
        </div>
    )
}