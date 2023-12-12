export const MESSAGE_APP_ADDRESS = "0xEED472BdCBC65140846bdaf7Aa94bc524C6775f6";

export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_friend",
        type: "address",
      },
    ],
    name: "addFriend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "checkIfRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyFriends",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "eth_address",
            type: "address",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
        ],
        internalType: "struct MessageApp.Friend[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "getUsername",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "noOfRegisteredUsers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_friend",
        type: "address",
      },
    ],
    name: "readMessages",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "msg",
            type: "string",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        internalType: "struct MessageApp.Message[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_username",
        type: "string",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "registeredAccounts",
    outputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "address",
        name: "eth_address",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_friend",
        type: "address",
      },
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    name: "sendMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
