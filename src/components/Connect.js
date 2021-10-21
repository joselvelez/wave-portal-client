import { useWallet } from "./WalletContext";

export function Connect() {
    const { setCurrentAccount } = useWallet();
    let userAccounts;

    /*
        Setup dapp initialization flow per EIP 1102 specification
        https://eips.ethereum.org/EIPS/eip-1102
    */

    const connectWallet = async () => {
        try {
            userAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch(e) {
            console.log(e);
        }

        console.log("Connected to wallet. Retreiving account.", userAccounts[0]);
        setCurrentAccount(userAccounts[0]);
    }

    return (
        <>
        <button className="btnConnectWallet" onClick={connectWallet}>
            Connect your wallet to send a wave!
        </button>
        </>
    )
}