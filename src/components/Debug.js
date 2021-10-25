import { useContext } from "react";
import AppContext from "../context/app-context";

export const Debug = () => {
    const appContext = useContext(AppContext);
    return (
        <div>
            <p>Dark Theme: {appContext.state.darkTheme.toString()}</p>
            <p>Last Theme: {window.localStorage.getItem('darkTheme')}</p>
            <p>Wallet installed? {appContext.state.walletInstalled.toString()}</p>
            <p>Account Stored: {window.localStorage.getItem('lastAccount')}</p>
            <p>Account in State: {appContext.state.currentAccount}</p>
        </div>
    );
};