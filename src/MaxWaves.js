import { ethers } from "ethers";
import { useEffect, useState } from "react"
import { useWallet } from "./WalletContext";

export const MaxWaves = () => {
    const [maxWaves, setMaxWaves] = useState();
    const {contractAddress, contractABI} = useWallet();
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    useEffect(() => {
        getMaxWaves();
    });

    const getMaxWaves = async () => {
        try {
            setMaxWaves(await contract.getMaxWaves());
        } catch(e) {
            console.log('No wallet connected.');
        }
    }
    return maxWaves ? `Most Waves: ${maxWaves}` : 'No waves';
}