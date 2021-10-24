import './App.css';
import { useWallet } from './WalletContext';
import { Content } from './components/Content';
import { NoWallet } from './components/NoWallet';
import { WrongChain } from './components/WrongChain';

function App() {
  const { walletAccessible, currentChain } = useWallet();

  if (walletAccessible && currentChain === '0x4') {
    return <Content />;
  } else if (walletAccessible && currentChain !== '0x4') {
    return  <WrongChain />
  }
  return <NoWallet />;
}

export default App;
