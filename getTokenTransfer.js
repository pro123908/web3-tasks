const Web3 = require("web3");

const TOKEN_ADDRESS = "0x58AABe567B6993e22c004AA635B3dC1ba3314C40";

const { abi } = require("./ABI.json");

const web3 = new Web3(
  "https://rinkeby.infura.io/v3/097cf08b81f047458ffc898b8c2537b9"
);

contract = new web3.eth.Contract(abi, TOKEN_ADDRESS);

const getEvents = async () => {
  try {
    let events = await contract.getPastEvents("Transfer", {
      // filter: {
      //   value: ["100000000000", "100000000001"], //Only get events where transfer value was 1000 or 1337
      // },
      fromBlock: 9164950,
      toBlock: 9955815,
    });

    console.log("Events => ", events.length);
  } catch (error) {
    console.log("Error => ", error);
  }
};

getEvents();
