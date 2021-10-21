import { useWallet } from "../WalletContext";

export function Connect() {
    const { walletAccessible, setCurrentAccount } = useWallet();

    /*
        Setup dapp initialization flow per EIP 1102 specification
        https://eips.ethereum.org/EIPS/eip-1102
    */

    const connectWallet = async () => {
        if (!walletAccessible) {
            console.log("Wallet not available. dApp should have even made it this far");
        } else {
            const ethereum = window.ethereum;
    
            try {
                const userAccounts = await ethereum.request({ method: 'eth_requestAccounts'});
                console.log('trying to get accounts...');
                console.log(userAccounts);
                setCurrentAccount(userAccounts[0]);
            } catch (e) {
                console.log(e);
            }
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