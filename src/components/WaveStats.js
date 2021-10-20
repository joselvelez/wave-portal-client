import '../App.css';
import { useWallet } from '../WalletContext';
import { LastWaveTimeStamp } from './LastWaveTimeStamp';
import { LastWaverAddress } from './LastWaverAddress';

export const WaveStats = () => {
    const { currentAccount } = useWallet();
    return (
        <>
            {currentAccount ?
                <div className="waveStats">
                    <LastWaverAddress />

                    <LastWaveTimeStamp />
                </div> :
            <div className="waveStats">
                <p>No contract data available</p>
            </div>
            }

        </>
    )
}