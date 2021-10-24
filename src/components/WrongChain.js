import { useWallet } from "../WalletContext";
import { networks } from "../constants/networks";
import { useCallback, useEffect } from "react";
import { useState } from "react/cjs/react.development";

export const WrongChain = () => {
    const [network, setNetwork] = useState([]);
    const { currentChain } = useWallet();
    const ethereum = window.ethereum;

    const fetchNetworks = useCallback(async () => {
        try{
            console.log(currentChain);
            const _network = networks.find(i => i.hex === currentChain);
            setNetwork(_network);
            console.log(_network);
            console.log('setting');
            console.log(networks);
        } catch (e) {
            console.log("No network list found.");
        }
    });

    useEffect(() => {
        fetchNetworks();
        console.log(network);
    }, [fetchNetworks, network]);

    ethereum.on('chainChanged', () => {
        window.location.reload();
    })

    return (
        <div>
            <p>You are currently on the {network} network. You must be on Rinkeby to access this dapp.</p>
            <p>Connect to Rinkeby and reload the page.</p>
        </div>
    )
}