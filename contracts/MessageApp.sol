// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract MessageApp {
    struct Account {
        string username;
        address eth_address;
        Friend[] friendList;
        mapping(address => bool) isFriend;
        /* "isFriend" mapping is to check if an account is already friends with another,
          rather than having to loop through the friendList, which may be a large array. */
    }

    struct Message {
        string msg;
        address sender;
        uint256 time;
    }

    struct Friend {
        address eth_address;
        string username;
    }

    mapping(bytes32 => Message[]) messages;
    mapping(address => Account) public registeredAccounts;
    uint public noOfRegisteredUsers = 0;

    function register(string calldata _username) external {
        require(!checkIfRegistered(msg.sender), "Account already registered");
        require(bytes(_username).length > 0, "Username cannot be empty");

        registeredAccounts[msg.sender].username = _username;
        registeredAccounts[msg.sender].eth_address = msg.sender;

        noOfRegisteredUsers++;
    }

    function checkIfRegistered(address _account) public view returns (bool) {
        return bytes(registeredAccounts[_account].username).length > 0;
    }

    function getUsername(address _account) public view returns (string memory) {
        require(checkIfRegistered(msg.sender), "This account is not registered");
        return registeredAccounts[_account].username;
    }


    function addFriend(address _friend) external {
        require(checkIfRegistered(msg.sender), "Register your account");
        require(checkIfRegistered(_friend), "User not registered");
        require(msg.sender != _friend, "You cannot add yourself");
        require(
            !checkIfFriendAdded(_friend),
            "You are already friends with this user"
        );

        Account storage newFriend = registeredAccounts[_friend];

        registeredAccounts[msg.sender].friendList.push(
            Friend(_friend, newFriend.username)
        );
        registeredAccounts[_friend].friendList.push(
            Friend(msg.sender, registeredAccounts[msg.sender].username)
        );

        registeredAccounts[msg.sender].isFriend[_friend] = true;
        registeredAccounts[_friend].isFriend[msg.sender] = true;
    }

    function checkIfFriendAdded(address account) private view returns (bool) {
        return registeredAccounts[msg.sender].isFriend[account];
    }

    function getMyFriends() public view returns (Friend[] memory) {
        return registeredAccounts[msg.sender].friendList;
    }

    function getAccount(address acc) internal view returns (Account storage) {
        return registeredAccounts[acc];
    }

    // returns a unique code for messages sent between the two accounts
    function getChatCode(address account_1, address account_2)
        internal
        pure
        returns (bytes32)
    {
        if (account_1 < account_2) {
            return keccak256(abi.encodePacked(account_1, account_2));
        } else {
            return keccak256(abi.encodePacked(account_2, account_1));
        }
    }

    function readMessages(address _friend) external view returns (Message[] memory) {
        bytes32 chatcode = getChatCode(msg.sender, _friend);

        return messages[chatcode];
    }

    function sendMessage(address _friend, string memory _message) external {
        require(checkIfRegistered(msg.sender), "Register your account");
        require(checkIfRegistered(_friend), "This account is not registered");
        require(checkIfFriendAdded(_friend), "To send a message, add this account to your friend list");

        bytes32 chatcode = getChatCode(msg.sender, _friend);

        Message memory newMessage = Message(_message, msg.sender, block.timestamp);
        messages[chatcode].push(newMessage);
    }

}
