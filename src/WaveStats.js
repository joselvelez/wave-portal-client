import { ethers } from 'ethers';
import './App.css';
import { useWallet } from './WalletContext';
import { LastWaveTimeStamp } from './LastWaveTimeStamp';
import { LastWaverAddress } from './LastWaverAddress';
import { TopWaverAddress} from './TopWaverAddress';

export const WaveStats = () => {
    const {contractAddress, contractABI} = useWallet();
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    return (
        <>
            {contract ?
                <div className="waveStats">
                    <LastWaverAddress />

                    <LastWaveTimeStamp />

                    <TopWaverAddress />
                </div> :
                
            <div className="waveStats">
                <p>No contract data available</p>
            </div>
            }

        </>
    )
}