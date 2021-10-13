export const Wave = ({ account, connect, wave }) => {
    return (
        <>
            {account ? 
                <button className="btnConnectWallet" onClick={wave}>
                    Go ahead... Send a wave!!!
                </button> :
                <button className="btnConnectWallet" onClick={connect}>
                    Connect your wallet to send a wave!
                </button>
            }
        </>
    );
};