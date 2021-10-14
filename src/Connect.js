import { ethers } from "ethers";
import { useWallet } from "./WalletContext";

export function Connect() {
    const {setCurrentAccount, contractAddress, contractABI} = useWallet();

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("You need metamask!");
                return;
            }

            const account = await ethereum.request({ method: 'eth_requestAccounts'});
            console.log("Connected to wallet. Retreiving account.", account);
            setCurrentAccount(account);
    
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            console.log(`${account} set to current account.`);
            return contract;

        } catch(e) {
            console.log(e);
        }
    }

    return (
        <>
        <button className="btnConnectWallet" onClick={connectWallet}>
            Connect your wallet to send a wave!
        </button>
        </>
    )
}