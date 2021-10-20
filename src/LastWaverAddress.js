import { useEffect } from "react"
import { useWallet } from "./WalletContext";

export const LastWaverAddress = () => {
    const { contractProvider, lastWaverAddress, setLastWaverAddress } = useWallet();

    useEffect(() => {
        getLastWaverAddress();
    });

    const getLastWaverAddress = async () => {
        try {
            setLastWaverAddress((await contractProvider.getLastWaver()).toString());
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h4>Last waver was</h4>
            <a href={`https://rinkeby.etherscan.io/address/${lastWaverAddress}`}>{lastWaverAddress}</a>
        </div>
    )
}
