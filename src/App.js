import './App.css';
import AppStateProvider from './context/AppStateProvider';
import { Test } from './components/Test';

function App() {
  return (
    <AppStateProvider>
      <Test />
    </AppStateProvider>
  );
}

export default App;
