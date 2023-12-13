import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkIfConnected,
  connectWallet,
  connectToContract,
} from "../utils/helpers";

export const MessageAppContext = createContext();

export const MessageAppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // currentAccount for the account you're using to send messages
  // currentFriend for the friend you're currently chatting with
  const [currentAccount, setCurrentAccount] = useState({
    account: "",
    username: "",
  });
  const [currentFriend, setCurrentFriend] = useState({
    account: "",
    username: "",
  });

  const [friendsList, setFriendsList] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getData = async () => {
    try {
      const contract = await connectToContract();
      const account = await connectWallet();
      setCurrentAccount((prev) => {
        return { ...prev, account };
      });
      const username = await contract.getUsername(account);

      !username
        ? alert("This account is not registered")
        : setCurrentAccount({ account, username });

      const friends = await contract.getMyFriends();
      setFriendsList(friends);
    } catch (e) {
      console.log(e);
    }
  };
  const registerAccount = async ({ username, account }) => {
    try {
      setLoading(true);
      const contract = await connectToContract();
      const createdAccount = await contract.register(username);
      await createdAccount.wait();
      setLoading(false);

      setCurrentAccount({ username, account });
    } catch (e) {
      console.log(e?.message);
    }
  };

  const getMessages = async (friend) => {
    try {
      setLoading(true);
      const contract = await connectToContract();
      const messages = await contract.readMessages(friend);
      setChatMessages(messages);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (friend, message) => {
    try {
      setLoading(true);
      const contract = await connectToContract();
      const addMessage = await contract.sendMessage(friend, message);
      await addMessage.wait();
      setChatMessages((prev) => [...prev, { friend, message }]);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const addFriend = async (friend) => {
    try {
      setLoading(true);
      const contract = await connectToContract();
      const addMyFriend = await contract.addFriend(friend);
      await addMyFriend.wait();
      navigate("/");
      window.location.reload();
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MessageAppContext.Provider
      value={{
        checkIfConnected,
        getData,
        currentAccount,
        currentFriend,
        friendsList,
        chatMessages,
        loading,
        errorMessage,
        connectWallet,
        connectToContract,
        registerAccount,
        getMessages,
        sendMessage,
        addFriend,
      }}
    >
      {children}
    </MessageAppContext.Provider>
  );
};
