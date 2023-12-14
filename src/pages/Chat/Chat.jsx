import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageAppContext } from "../../context";
import { FaRegCircleUser } from "react-icons/fa6";
import styles from "./chat.module.css";
import { Button, Input, Loader, Modal } from "../../components";

const Chat = () => {
  const { account } = useParams();
  const navigate = useNavigate();

  const {
    getMessages,
    chatMessages,
    friendsList,
    sendMessage,
    loading,
    addFriend,
    getUser,
    currentAccount,
  } = useContext(MessageAppContext);

  const [messageToSend, setMessageToSend] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const [friendUsername, setFriendUsername] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [friendAddress, setFriendAddress] = useState("");
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [addFriendLoading, setAddFriendLoading] = useState(false);

  const searchAccount = async () => {
    setLoadingAccount(true);
    const res = await getUser(friendAddress.trim());
    if (res) setFriendUsername(res);
    setLoadingAccount(false);
  };

  useEffect(() => {
    getMessages(account);
  }, [account]);

  const handleSendMessage = async () => {
    setSendLoading(true);
    await sendMessage(account, messageToSend);

    setSendLoading(false);
  };

  const addUser = async () => {
    setAddFriendLoading(true);
    await addFriend(friendAddress);
    setAddFriendLoading(false);
  };


  return (
    <>
      <div className={styles["chat-body"]}>
        <div className={styles["friends-list"]}>
          {friendsList.length === 0 ? (
            <p>No friends</p>
          ) : (
            friendsList.map((f, i) => (
              <div
                className={styles["friend-list__item"]}
                key={i}
                onClick={() => navigate(`/chat/${f.account}`)}
              >
                <FaRegCircleUser />
                <div>
                  <h4>{f.username}</h4>
                  <p>{f.account}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles["chat-user"]}>
          <div>
            <Button onClick={() => setOpenModal(true)}>Add Friend</Button>
          </div>
          <h3 className={styles["current-chat__username"]}>
            @{friendsList.find((f) => f?.account === account)?.username}
          </h3>
          <div className={styles["chat-messages__container"]}>
            {chatMessages.length === 0 ? (
              <p>No recorded messages. Start a chat by sending a message.</p>
            ) : (
              chatMessages.map((c, i) => (
                <div
                  key={i}
                  className={`${styles["chat-message"]} ${
                    c.account !== account && styles["my-message"]
                  }`}
                >
                  {c.msg}

                  <span className={styles.timestamp}>{c.time}</span>
                </div>
              ))
            )}
          </div>
          <div className={styles["chat-input__container"]}>
            <div className={styles["chat-input"]}>
              <Input
                className={styles.input}
                placeholder="Type your message..."
                value={messageToSend}
                onChange={(e) => setMessageToSend(e.target.value)}
              />
              <Button onClick={handleSendMessage}>
                {sendLoading ? <Loader /> : "Send"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <Modal title="Add Friend" closeModal={() => setOpenModal(false)}>
          <p>
            Paste the address of the account you want to add. If their account
            is registered on this platform, you can see their account.
          </p>
          <Input
            className={styles["user-address"]}
            label="User Address"
            value={friendAddress}
            placeholder="0x0000000000000000000000000000000000000000"
            onChange={(e) => setFriendAddress(e.target.value)}
          />
          <div className={styles["search-btn__container"]}>
            <Button className={styles["search-btn"]} onClick={searchAccount}>
              {loading ? <Loader /> : "Search"}
            </Button>
          </div>
          {!loadingAccount && !friendUsername && (
            <p>This account is not registered on this platform</p>
          )}
          {friendUsername && (
            <div className={styles["search-result"]}>
              <FaRegCircleUser size={40} />
              <div>
                <h3>@{friendUsername}</h3>
                <span className={styles["friend-address"]}>
                  {friendAddress}
                </span>
              </div>

              {currentAccount.account.trim() !== friendAddress.trim() && (
                <Button className={styles["search-btn"]} onClick={addUser}>
                  {addFriendLoading ? <Loader /> : "Add Friend"}
                </Button>
              )}
        
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default Chat;
