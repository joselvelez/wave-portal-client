export const Wave = ({ account, connect }) => {
    return (
        <>
        <button className="btnConnectWallet" onClick={connect}>
            Connect your wallet to send a wave!
        </button>
        </>
    );
};