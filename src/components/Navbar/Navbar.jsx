import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Modal } from "../index";
import { MessageAppContext } from "../../context";
import styles from "./navbar.module.css";

const Navbar = () => {
  const menuList = [
    { title: "Chat", link: "/" },
    { title: "Search", link: "/search" },
  ];

  const [username, setUsername] = useState("");

  const { currentAccount, connectWallet, registerAccount } =
    useContext(MessageAppContext);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles["navbar-list"]}>
          {menuList.map((m, i) => (
            <li key={i} className={styles["navbar-list__item"]}>
              <Link to={m.link}>{m.title}</Link>
            </li>
          ))}
        </ul>

        {!currentAccount.account && (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        )}

        {currentAccount.account && !currentAccount.username && (
          <Button onClick={() => setOpenModal(true)}>Register</Button>
        )}
      </nav>
      {openModal && (
        <Modal
          title="Register your account"
          closeModal={() => setOpenModal(false)}
        >
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Address"
            value={currentAccount.account}
            disabled
            readOnly
          />
          <div className={styles["register-btn__container"]}>
            <Button className={styles["register-btn"]}>Register</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Navbar;
