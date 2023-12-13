import React, { useContext, useState } from "react";
import { MessageAppContext } from "../../context";
import { Button, Input, Loader, Modal } from "../../components";
import { FaRegCircleUser } from "react-icons/fa6";
import styles from "./home.module.css";

const Home = () => {
  const { currentAccount, friendsList, getUser, loading } =
    useContext(MessageAppContext);
  const [openModal, setOpenModal] = useState(false);
  const [friendAddress, setFriendAddress] = useState("");
  const [friendUsername, setFriendUsername] = useState("");
  const [loadingAccount, setLoadingAccount] = useState(true);

  const searchAccount = async () => {
    setFriendUsername("");
    setLoadingAccount(true);
    const res = await getUser(friendAddress.trim());
    if (res) setFriendUsername(res);
    setLoadingAccount(false);
  };
  return (
    <>
      <div className={styles["main-body"]}>
        <p>
          {currentAccount.account} - @{currentAccount.username}
        </p>
        <div>
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
        <div>
          {friendsList.length === 0 && (
            <>
              <p>You currently have no friends on your list</p>
              <Button onClick={() => setOpenModal(true)}>Add Friend</Button>
            </>
          )}
        </div>
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
          {!loading && friendUsername && (
            <div className={styles["search-result"]}>
              <FaRegCircleUser size={40} />
              <div>
                <h3>@{friendUsername}</h3>
                <span className={styles["friend-address"]}>
                  {friendAddress}
                </span>
              </div>

              <Button className={styles["search-btn"]}>
                {loading ? <Loader /> : "Add Friend"}
              </Button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default Home;
