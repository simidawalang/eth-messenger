import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageAppContext } from "../../context";
import { FaRegCircleUser } from "react-icons/fa6";
import styles from "./chat.module.css";
import { Button, Input, Loader } from "../../components";

const Chat = () => {
  const { account } = useParams();
  const navigate = useNavigate();
  const [messageToSend, setMessageToSend] = useState("");
  const [sendLoading, setSendLoading] = useState(false);

  const { getMessages, chatMessages, friendsList, sendMessage } =
    useContext(MessageAppContext);

  useEffect(() => {
    getMessages(account);
  }, [account]);

  const handleSendMessage = async () => {
    setSendLoading(true);
    await sendMessage(account, messageToSend);
    setSendLoading(false);
  };

  return (
    <div className={styles["chat-body"]}>
      <div className={styles["friends-list"]}>
        {friendsList.length === 0 ? (
          <p>No friends</p>
        ) : (
          <div>
            {friendsList.map((f, i) => (
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
            ))}
          </div>
        )}
      </div>
      <div className={styles["chat-user"]}>
        <h3 className={styles["current-chat__username"]}>
          @{friendsList.find((f) => f?.account === account)?.username}
        </h3>
        <div className={styles["chat-messages"]}>
          {chatMessages.length === 0 && (
            <p>No recorded messages. Start a chat by sending a message.</p>
          )}
        </div>
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
  );
};

export default Chat;
