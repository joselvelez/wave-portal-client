import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWallet } from "./WalletContext";

export const TotalWaves = () => {
    const [totalWaves, setTotalWaves] = useState();
    const {contractAddress, contractABI} = useWallet();
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    useEffect(() => {
        getTotalWaves();
    });

    const getTotalWaves = async () => {
        try {
            setTotalWaves(await contract.getTotalWaves());
        } catch(e) {
            console.log('No wallet connected.');
        }
    }
    return totalWaves ? `Total Waves: ${totalWaves.toString()}` : 'No waves';
}
