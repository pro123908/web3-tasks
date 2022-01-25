const Web3 = require("web3");

const TOKEN_ADDRESS = "0x58AABe567B6993e22c004AA635B3dC1ba3314C40";

const { abi } = require("./ABI.json");

const web3 = new Web3(
  "https://rinkeby.infura.io/v3/097cf08b81f047458ffc898b8c2537b9"
);

let contract = new web3.eth.Contract(abi, TOKEN_ADDRESS);

const listenToAnEvent = async () => {
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

    web3.eth
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

listenToAnEvent();
