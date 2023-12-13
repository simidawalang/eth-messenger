import React, { useContext, useState } from "react";
import { MessageAppContext } from "../../context";
import { Button, Input, Loader, Modal } from "../../components";
import { FaRegCircleUser } from "react-icons/fa6";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {
    currentAccount,
    friendsList,
    getUser,
    loading,
    addFriend,
    setCurrentFriend,
  } = useContext(MessageAppContext);
  const [openModal, setOpenModal] = useState(false);
  const [friendAddress, setFriendAddress] = useState("");
  const [friendUsername, setFriendUsername] = useState("");
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [addFriendLoading, setAddFriendLoading] = useState(false);
  const navigate = useNavigate();

  const searchAccount = async () => {
    setLoadingAccount(true);
    const res = await getUser(friendAddress.trim());
    if (res) setFriendUsername(res);
    setLoadingAccount(false);
  };

  const addUser = async () => {
    setAddFriendLoading(true);
    await addFriend(friendAddress);
    setAddFriendLoading(false);
  };

  const startChat = (user) => {
    setCurrentFriend(user);
    navigate(`/chat/${user.account}`, {
      state: { ...user },
    });
  };
  return (
    <>
      <div className={styles["main-body"]}>
        <div className={styles["current-account__details"]}>
          <h2 className={styles.username}> @{currentAccount.username}</h2>
          <p className={styles.account}>{currentAccount.account}</p>
        </div>
        <div className={styles.instructions}>
          <h3>Instructions</h3>
          <ul>
            <li>Use Metamask for this application</li>
            <li>Connect and interact using the Goerli Testnet only</li>
            <li>
              You can only add a friend if you know their address, similar to
              WhatsApp
            </li>
          </ul>
        </div>

        {friendsList.length === 0 ? (
          <>
            <p>You currently have no friends on your list</p>
            <Button onClick={() => setOpenModal(true)}>Add Friend</Button>
          </>
        ) : (
          <div className={styles["friends-list"]}>
            <h3>Friends</h3>
            {friendsList.map((f, i) => (
              <div key={i} className={styles["search-result"]}>
                <FaRegCircleUser size={40} />
                <div>
                  <h3>@{f?.username}</h3>
                  <span className={styles["friend-address"]}>{f?.account}</span>
                </div>

                <Button
                  className={styles["search-btn"]}
                  onClick={() => startChat(f)}
                >
                  Chat
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      {openModal && (
        <Modal title="Add Friend" closeModal={() => setOpenModal(true)}>
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

              <Button className={styles["search-btn"]} onClick={addUser}>
                {addFriendLoading ? <Loader /> : "Add Friend"}
              </Button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default Home;
