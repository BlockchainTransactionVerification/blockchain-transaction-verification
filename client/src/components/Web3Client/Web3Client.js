import Web3 from "web3";
import dotenv from "dotenv";

let selectedAccount;

let aclContract;

let isInitialized = false;

export const init = async () => {
  let provider = window.ethereum;

  if (typeof provider !== "undefined") {
    // MetaMask is installed

    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
      });

    // Listen to MetaMask account changes
    window.ethereum.on("accountsChanged", function (accounts) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }

  const web3 = new Web3(provider);

  const networkId = await web3.eth.net.getId();

  const aclContractAbi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_fileChunkHash",
          type: "string",
        },
      ],
      name: "addBlock",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_inputAddress",
          type: "address",
        },
        {
          internalType: "string",
          name: "_fileChunkHash",
          type: "string",
        },
      ],
      name: "grantAccess",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_checkAddress",
          type: "address",
        },
        {
          internalType: "string",
          name: "_fileChunkHash",
          type: "string",
        },
      ],
      name: "checkAccess",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
  ];

  aclContract = new web3.eth.Contract(
    aclContractAbi,
    "0xF890dC4947dDE86adE95C33290C6135D2ec31010" // should be an env variable
  );

  isInitialized = true;
};

export const getSelectedAccount = () => {
  return selectedAccount;
};

export const addBlockToAcl = async (fileCID) => {
  if (!isInitialized) {
    await init();
  }

  console.log("Made it to addBlock");
  console.log("File hash in add block");
  console.log(fileCID);
  await aclContract.methods
    .addBlock(fileCID)
    .send({ from: selectedAccount }, function (error, result) {
      console.log("Error: ", error, ", Results: ", result);
    });
};

export const grantAccessToFile = async (walletID, fileCID) => {
  if (!isInitialized) {
    await init();
  }

  await aclContract.methods
    .grantAccess(walletID, fileCID)
    .send({ from: selectedAccount }, function (error, result) {
      console.log("Error: ", error, ", Results: ", result);
    });
};

export const checkAccessToFile = async (walletID, fileCID) => {
  var hasAccess;

  if (!isInitialized) {
    await init();
  }

  hasAccess = await aclContract.methods
    .checkAccess(walletID, fileCID)
    .call({ from: selectedAccount }, function (error, result) {
      console.log("Error: ", error, ", Results: ", result);
    });

  console.log("Returning hasAccess: " + hasAccess);
  return hasAccess;
};
