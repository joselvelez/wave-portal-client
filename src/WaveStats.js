import { ethers } from 'ethers';
import { useState } from 'react';
import './App.css';
import { useWallet } from './WalletContext';

export const WaveStats = () => {
    const {contractAddress, contractABI} = useWallet();
    const [lastWaveTimeStamp, setLastWaveTimeStamp] = useState();
    const [lastWaverAddress, setLastWaverAddress] = useState();
    const [topWaverAddress, setTopWaverAddress] = useState();

    const getLastWaveTimestamp = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setLastWaveTimeStamp(Date(await contract.getLastWaveAt()));
    }

    const getLastWaverAddress = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setLastWaverAddress((await contract.getLastWaver()).toString().substring(1,10));
    }

    const getTopWaverAddress = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setTopWaverAddress((await contract.getTopWaver()).toString().substring(1,10));
    }

    const { ethereum } = window;

    if (ethereum) {
        getLastWaveTimestamp();
        getLastWaverAddress();
        getTopWaverAddress();
    }

    return (
        <>
            <div className="waveStats">
                <div className="waveStat">
                    <h4>Last waver was</h4>
                    <a href="#">{lastWaverAddress}...</a>
                </div>

                <div className="waveStat">
                    <h4>Last wave was</h4>
                    <p>{lastWaveTimeStamp}</p>
                </div>

                <div className="waveStat">
                    <h4>Top waver is</h4>
                    <p><a href="#">{topWaverAddress}</a> with 15 waves!</p>
                </div>
            </div>
        </>
    )
}