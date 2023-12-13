import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { MESSAGE_APP_ADDRESS, ABI } from "../constants";

export const checkIfConnected = async () => {
  try {
    if (!window.ethereum) return alert("Kindly install Metamask");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    const _acc = accounts[0];
    return _acc;
  } catch (e) {
    console.log(e);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return alert("Kindly install Metamask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const _acc = accounts[0];
    return _acc;
  } catch (e) {
    console.log(e);
  }
};

export const getContract = (signerOrProvider) =>
  new ethers.Contract(MESSAGE_APP_ADDRESS, ABI, signerOrProvider);

export const connectToContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = getContract(signer);

    return contract;
  } catch (e) {
    console.log(e);
  }
};

export const formatTime = (time) => {
  const _time = new Date(parseInt(time, 10));

  const formattedTime =
    _time.getHours() +
    `:${Number(_time.getMinutes()) < 10 ? "0": ""}` +
    _time.getMinutes() +
    "   " +
    _time.getDate() +
    "/" +
    (_time.getMonth() + 1) +
    "/" +
    _time.getFullYear();


  return formattedTime;
};
