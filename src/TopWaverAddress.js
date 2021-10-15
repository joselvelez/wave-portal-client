import { ethers } from "ethers";
import { useEffect, useState } from "react"
import { useWallet } from "./WalletContext";

export const TopWaverAddress = () => {
    const [topWaverAddress, setTopWaverAddress] = useState();
    const {contractAddress, contractABI} = useWallet();
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    useEffect(() => {
        getTopWaverAddress();
    });

    const getTopWaverAddress = async () => {
        setTopWaverAddress((await contract.getTopWaver()).toString());
    }

    return (
        <div className="waveStat">
            <h4>Top waver is</h4>
            <p><a href={`https://rinkeby.etherscan.io/address/`}>{topWaverAddress}</a></p>
        </div>
    )
}