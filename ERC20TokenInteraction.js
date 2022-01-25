const axios = require("axios");
const Web3 = require("web3");

const { abi } = require("./ABI.json");

const { abi: stakingABI } = require("./StakingABI.json");
const { fromWei, toWei, getCurrentGasPrices } = require("./utils");

const web3 = new Web3(
  "https://rinkeby.infura.io/v3/097cf08b81f047458ffc898b8c2537b9"
);

const PRIVATE_KEY =
  "d82f8cda76580b8dd167544ba2d69fcb6dfc93fea17074e55ffd5767155aebcc";

const FROM_ADDRESS = "0x1C168A080e935656Ca40B8D35A3762bc1899033B";

const TO_ADDRESS = "0x6c210CC01E6D6374574d55F0aF75247Cff141385";

const TOKEN_ADDRESS = "0x58AABe567B6993e22c004AA635B3dC1ba3314C40";

const STAKING_MANAGER_RINKEBY_V2 = "0xd244FBBDd800A07B36dd44DaE061328bBDA9Bb88";

let contract;
let stakingContract;

contract = new web3.eth.Contract(abi, TOKEN_ADDRESS);

const main = async () => {
  try {
    // contract = new web3.eth.Contract(abi, TOKEN_ADDRESS);

    stakingContract = new web3.eth.Contract(
      stakingABI,
      STAKING_MANAGER_RINKEBY_V2
    );

    let tokenBalance = await contract.methods.balanceOf(FROM_ADDRESS).call();

    console.log({ tokenBalance: web3.utils.fromWei(tokenBalance) });

    let allowance = await checkAllowance();

    if (Number(allowance) === 0) {
      giveApproval();
    }

    // listenToAnEvent();
    transfer();
    // transferFrom();
    // getEvents();
    // subscribeToEvent();
  } catch (error) {
    console.log("Error => ", error);
  }
};

main();

const checkAllowance = async () => {
  try {
    let allowance = await contract.methods
      .allowance(FROM_ADDRESS, STAKING_MANAGER_RINKEBY_V2)
      .call();

    console.log("Allowance => ", allowance);
    return allowance;
  } catch (error) {
    console.log("Error => ", error);
  }
};

const giveApproval = async () => {
  console.log("c");
  try {
    let approve = contract.methods.approve(
      stakingContract._address,
      toWei("1")
    );

    // let gasPrices = await getCurrentGasPrices();

    const gas = await approve.estimateGas({ from: FROM_ADDRESS });
    const gasPrice = await web3.eth.getGasPrice();
    let data = approve.encodeABI();

    let txObj = {
      to: TOKEN_ADDRESS,

      gas,
      gasPrice,
      // "nonce": nonce,
      chainId: 4,
      data,
    };

    let tx = await web3.eth.accounts.signTransaction(txObj, PRIVATE_KEY);

    let txId = await web3.eth.sendSignedTransaction(tx.rawTransaction);

    console.log(txId);
  } catch (error) {
    console.log("Error => ", error);
  }
};

const transfer = async () => {
  try {
    let transferFunc = contract.methods.transfer(TO_ADDRESS, toWei("300"));

    // let gasPrices = await getCurrentGasPrices();

    const gas = await transferFunc.estimateGas({ from: FROM_ADDRESS });
    const gasPrice = await web3.eth.getGasPrice();
    let data = transferFunc.encodeABI();

    let txObj = {
      to: TOKEN_ADDRESS,

      gas,
      gasPrice,
      // "nonce": nonce,
      chainId: 4,
      data,
    };

    let tx = await web3.eth.accounts.signTransaction(txObj, PRIVATE_KEY);

    let txId = await web3.eth.sendSignedTransaction(tx.rawTransaction);

    console.log(txId);
  } catch (error) {
    console.log("Error => ", error);
  }
};

const transferFrom = async () => {
  try {
    let transferFunc = contract.methods.transferFrom(
      FROM_ADDRESS,
      TO_ADDRESS,
      toWei("100")
    );

    // let gasPrices = await getCurrentGasPrices();

    const gas = await transferFunc.estimateGas({ from: FROM_ADDRESS });
    const gasPrice = await web3.eth.getGasPrice();
    let data = transferFunc.encodeABI();

    let txObj = {
      to: TOKEN_ADDRESS,

      gas,
      gasPrice,
      // "nonce": nonce,
      chainId: 4,
      data,
    };

    let tx = await web3.eth.accounts.signTransaction(txObj, PRIVATE_KEY);

    let txId = await web3.eth.sendSignedTransaction(tx.rawTransaction);

    console.log(txId);
  } catch (error) {
    console.log("Error => ", error);
  }
};

const getEvents = async () => {
  try {
    let events = await contract.getPastEvents("Approval", {
      // filter: {
      //   value: ["100000000000", "100000000001"], //Only get events where transfer value was 1000 or 1337
      // },
      fromBlock: 9812365,
      toBlock: 9814218,
    });

    console.log("Events => ", events);
  } catch (error) {
    console.log("Error => ", error);
  }
};

const subscribeToEvent = async () => {
  try {
    let events = web3.eth.subscribe("STAKED", {
      address: STAKING_MANAGER_RINKEBY_V2,
    });

    console.log("Events => ", events);
  } catch (error) {
    console.log("Error => ", error);
  }
};

const listenToAnEvent = async () => {
  console.log(contract.events);
  try {
    // contract.events.Transfer({ fromBlock: 0 }).on("data", () => {
    //   console.log("Event data => ", data);
    // });

    let options = {
      address: TOKEN_ADDRESS,
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      ],
    };

    let web3 = new Web3(
      "wss://rinkeby.infura.io/ws/v3/097cf08b81f047458ffc898b8c2537b9"
    );

    let subscription = web3.eth
      .subscribe("logs", options, (err, res) => {
        if (!err) console.log("res => ", res);
        else console.log("err => ", err);
      })
      .on("data", (log) => {
        console.log("Got data => ", log);
      });
  } catch (error) {
    console.log("Error -> ", error);
  }
};
