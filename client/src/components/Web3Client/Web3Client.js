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
  ];

  aclContract = new web3.eth.Contract(
    aclContractAbi,
    process.env.CONTRACT_ADDRESS // should be an env variable
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
  return aclContract.methods.addBlock(fileCID).call();
};
