import { useContext } from 'react';
import AppContext from '../context/app-context';

export const Test = () => {
    const appContext = useContext(AppContext);
    console.log(appContext);
    return (
        <>
        <p>sup man</p>
        <p>{appContext.state.theme}</p>
        <p>{appContext.state.walletInstalled.toString()}</p>
        </>
    );
}