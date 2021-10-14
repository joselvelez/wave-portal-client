import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import { useWallet } from './WalletContext';

export const WaveStats = ({
        lastWaverAddress,
        setLastWaverAddress,
        lastWaverSubAddress,
        setLastWaverSubAddress,

    }) => {
    const [maxWaves, setMaxWaves] = useState();
    const [topWaverAddress, setTopWaverAddress] = useState();
    const [topWaverSubAddress, setTopWaverSubAddress] = useState();
    const [lastWaveTimeStamp, setLastWaveTimeStamp] = useState();
    const {contractAddress, contractABI} = useWallet();

    const getLastWaveTimestamp = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setLastWaveTimeStamp(Date(await contract.getLastWaveAt()))
    }

    const getLastWaverAddress = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setLastWaverAddress((await contract.getLastWaver()).toString());
        setLastWaverSubAddress((await contract.getLastWaver()).toString().substring(1,8));
        console.log(lastWaverAddress);
    }

    const getTopWaverAddress = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setTopWaverAddress((await contract.getTopWaver()).toString());
        setTopWaverSubAddress((await contract.getTopWaver()).toString().substring(1,8));
        console.log(topWaverAddress);
    }

    const getMaxWaves = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setMaxWaves((await contract.getMaxWaves()).toString());
        console.log(maxWaves);
    }

    const { ethereum } = window;

    if (ethereum) {
        getLastWaveTimestamp();
        getLastWaverAddress();
        getTopWaverAddress();
        getMaxWaves();
    }

    return (
        <>
            <div className="waveStats">
                <div className="waveStat">
                    <h4>Last waver was</h4>
                    <a href={`https://rinkeby.etherscan.io/address/${lastWaverAddress}`}>{lastWaverSubAddress}</a>
                </div>

                <div className="waveStat">
                    <h4>Last wave was</h4>
                    <p>{lastWaveTimeStamp}</p>
                </div>

                <div className="waveStat">
                    <h4>Top waver is</h4>
                    <p><a href={`https://rinkeby.etherscan.io/address/`}>{topWaverSubAddress}</a> with {maxWaves} waves!</p>
                </div>
            </div>
        </>
    )
}