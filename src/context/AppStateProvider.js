import { useReducer } from "react";
import AppContext from "./app-context";
import { appReducer } from "./app-reducer";

const AppStateProvider = ({ children }) => {
    // Initial App state
    const initialState = {
        theme: 'light',
        walletInstalled: false
    }

    const [state, dispatch] = useReducer(appReducer, initialState);
    const value = {state, dispatch};

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppStateProvider;