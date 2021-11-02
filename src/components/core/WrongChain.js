import { useEffect, useState } from "react";
import { networks } from "../../constants/networks";

export const WrongChain = () => {
    const [network, setNetwork] = useState({});
    const ethereum = window.ethereum;

    ethereum.on('chainChanged', () => {
        window.location.reload();
    });

    const fetchNetworks = async () => {
        try{
            const _chain = await ethereum.request({method: 'eth_chainId'});
            const _network = networks.find(i => i.hex === _chain);
            setNetwork(_network);
        } catch (e) {
            console.log("No network list found.");
        }
    };

    useEffect(() => {
        fetchNetworks();
    }, []);

    return (
        <div>
            <p>You are currently on the {network.name} network. You must be on Rinkeby to access this dapp.</p>
            <p>Connect to Rinkeby</p>
        </div>
    )
}