import { ethers } from "ethers";
import { useEffect } from "react"
import { useWallet } from "./WalletContext";

export const LastWaverAddress = () => {
    const {contractAddress, contractABI, lastWaverAddress, setLastWaverAddress} = useWallet();
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    useEffect(() => {
        getLastWaverAddress();
    });

    const getLastWaverAddress = async () => {
        setLastWaverAddress((await contract.getLastWaver()).toString());
    }

    return (
        <div>
            <h4>Last waver was</h4>
            <a href={`https://rinkeby.etherscan.io/address/${lastWaverAddress}`}>{lastWaverAddress}</a>
        </div>
    )
}
