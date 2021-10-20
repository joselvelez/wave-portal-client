import { useWallet } from "./WalletContext";

export function Connect() {
    const { setCurrentAccount } = useWallet();
    let userAccounts;

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