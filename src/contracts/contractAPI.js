import { ethers } from "ethers";
import { contractABI, contractAddress } from "../constants/contractConstants";

export const getContractSigner = () => {
    try {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer = _provider.getSigner();
        const _contractSigner = new ethers.Contract(contractAddress, contractABI, _signer);
        return _contractSigner;
    } catch (e) {
        console.log("No provider is available");
    }
}

export const getContractProvider = () => {
    try {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const _contractProvider = new ethers.Contract(contractAddress, contractABI, _provider);
        return _contractProvider;
    } catch (e) {
        console.log("No provider is available");
    }
}

export const fetchMaxWaves = async () => {
    try {
        const _provider = getContractProvider();
        const _maxWaves = await _provider.getMaxWaves();
        return _maxWaves;
    } catch (e) {
        console.log("Unable to get max waves data");
    }
};

export const fetchTotalWaves = async () => {
    try {
        const _provider = getContractProvider();
        const _waves = await _provider.getTotalWaves();
        return _waves;
    } catch (e) {
        console.log("Unable to get total waves data");
    }
};

export const fetchTopWaverAddress = async () => {
    try {
        const _provider = getContractProvider();
        const _topWaverAddress = await _provider.getTopWaver();
        return _topWaverAddress;
    } catch (e) {
        console.log("Unable to get top waver address");
    }
};

export const fetchLastWaverAddress = async () => {
    try {
        const _provider = getContractProvider();
        const _lastWaverAddress = await _provider.getLastWaver();
        return _lastWaverAddress;
    } catch (e) {
        console.log("Unable to get last waver address");
    }
};

export const fetchLastWaverTimestamp = async () => {
    try {
        const _provider = getContractProvider();
        const _lastWaverTimestamp = Date(await _provider.getLastWaveAt());
        return _lastWaverTimestamp;
    } catch (e) {
        console.log("Unable to get last waver timestamp");
    }
};

export const fetchWaveTransactions = async () => {
    try {
        const _provider = getContractProvider();
        const _waveTransactions = await _provider.getWavesArray();
        return _waveTransactions
    } catch (e) {
        console.log("Unable to get wave transactions");
    }
};