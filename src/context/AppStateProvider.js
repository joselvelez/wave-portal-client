import { ethers } from "ethers";
import { useReducer, useLayoutEffect, useEffect } from "react";
import { contractABI, contractAddress } from "../constants/contractConstants";
import { GET_ACCOUNTS, GET_CHAIN, SET_THEME, WALLET_INSTALLED, SET_CONTRACT_PROVIDER, SET_CONTRACT_SIGNER } from "./app-actions";
import AppContext from "./app-context";
import { appReducer } from "./app-reducer";

const AppStateProvider = ({ children }) => {
    // Initial App state
    const initialState = {
        darkTheme: window.localStorage.getItem('darkTheme'),
        walletInstalled: false,
        currentAccount: [],
        currentChain: null,
        contractProvider: null,
        contractSigner: null,
    }
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Set app theme
    useLayoutEffect(() => {
        if (state.darkTheme === true) {
            setTheme(true);
            window.localStorage.setItem('darkTheme', true);
        } else {
            setTheme(false);
            window.localStorage.setItem('darkTheme', false);
        }

    }, [state.darkTheme]);

    useEffect(() => {
        setContractProvider();
        setContractSigner();
    }, []);

    // dispatch method to set theme
    const setTheme = (value) => {
        dispatch({
            type: SET_THEME,
            payload: value,
        });
        document.body.setAttribute('theme', value);
    };

    // dispatch method to check if a wallet is installed
    const walletInstalled = () => {
        dispatch({
            type: WALLET_INSTALLED,
            payload: true,
        });
    };

    // dispatch method to retrieve the accounts array
    const getAccounts = (accounts) => {
        dispatch({
            type: GET_ACCOUNTS,
            payload: accounts,
        });
    };

    // dispatch method to retrieve the current network
    const getChain = (chainId) => {
        dispatch({
            type: GET_CHAIN,
            payload: chainId,
        });
    };

    // dispatch method to set the contract provider
    const setContractProvider = () => {
        try {
            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            const _contractProvider = new ethers.Contract(contractAddress, contractABI, _provider);
            dispatch({
                type: SET_CONTRACT_PROVIDER,
                payload: _contractProvider,
            });
        } catch (e) {
            console.log("No provider is available");
        }
    }

    // dispatch method to set the contract signer
    const setContractSigner = () => {
        try {
            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            const _signer = _provider.getSigner();
            const _contractSigner = new ethers.Contract(contractAddress, contractABI, _signer);
            dispatch({
                type: SET_CONTRACT_SIGNER,
                payload: _contractSigner,
            });
        } catch (e) {
            console.log("No provider is available");
        }
    }

    const appState = {state, setTheme, walletInstalled, getAccounts, getChain};

    return (
        <AppContext.Provider value={appState}>
            {children}
        </AppContext.Provider>
    );
}

export default AppStateProvider;