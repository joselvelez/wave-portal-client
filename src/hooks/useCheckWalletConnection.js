// Confirm access to window.ethereum object
const checkWalletConnection = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("You need to connect your MetaMask wallet!");
        return;
      } else {
        console.log("Connection to the ethereum object established", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        walletObject.setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }

    } catch(e) {
      console.log(e);
    }
}

export function useCheckWalletConnection() {
    return () => checkWalletConnection();
}