import { ethers } from "ethers";
import { contractABI, contractAddress } from "../constants/contractConstants"

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractProvider = new ethers.Contract(contractAddress, contractABI, provider);
const contractSigner = new ethers.Contract(contractAddress, contractABI, signer);

export function useContract() {
    return ({
        contractAddress,
        contractProvider,
        contractSigner
    });
};