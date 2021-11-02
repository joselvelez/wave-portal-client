
export const ConnectWalletAction = ({ connectAction }) => {
    return (
        <>
        <button className="btnConnectWallet" onClick={() => connectAction()}>
            Connect your wallet
        </button>
        </>
    )
}