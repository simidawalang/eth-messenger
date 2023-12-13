import React, { useEffect, useState, createContext } from "react";
import {
  checkIfConnected,
  connectWallet,
  connectToContract,
  formatTime,
} from "../utils/helpers";

export const MessageAppContext = createContext();

export const MessageAppProvider = ({ children }) => {
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

      let _friends = [];

      for (let i = 0; i < friends.length; i++) {
        _friends.push({
          username: friends[i].username,
          account: friends[i].eth_address,
        });
      }
      setFriendsList(_friends);
    } catch (e) {
      console.log(e);
    }
  };
  const registerAccount = async (username) => {
    try {
      setLoading(true);
      const contract = await connectToContract();
      const createdAccount = await contract.register(username);
      await createdAccount.wait();
      setLoading(false);

      setCurrentAccount((prev) => {
        return { ...prev, username };
      });
    } catch (e) {
      console.log(e?.message);
    }
  };

  const getMessages = async (friend) => {
    try {
      setLoading(true);
      const contract = await connectToContract();
      const messages = await contract.readMessages(friend);

      let _messages = [];

      for (let i = 0; i < messages.length; i++) {
        _messages.push({
          msg: messages[i].msg,
          account: messages[i].sender,
          time: formatTime(messages[i].time._hex),
        });
      }
      setChatMessages(_messages);
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
      const contract = await connectToContract();
      const addMyFriend = await contract.addFriend(friend);
      await addMyFriend.wait();
      // navigate("/");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async (acc) => {
    setLoading(true);
    try {
      const contract = await connectToContract();
      const account = await contract.getUsername(acc);
      setLoading(false);
      return account;
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
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
        setCurrentFriend,
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
        getUser,
      }}
    >
      {children}
    </MessageAppContext.Provider>
  );
};
