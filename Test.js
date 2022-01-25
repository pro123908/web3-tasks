const Web3 = require("web3");

const TOKEN_ADDRESS = "0x58AABe567B6993e22c004AA635B3dC1ba3314C40";

const { abi } = require("./ABI.json");

const web3 = new Web3("https://rpc-mainnet.matic.network");

const test = async () => {
  let contract = new web3.eth.Contract(
    abi,
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  );

  //   console.log("contract =< ", contract);

  //   contract.methods
  //     .balanceOf("0xEc0B81a2689dA3C89d91057adDd3a50ea07CDE0e")
  //     .call();

  const balance = await web3.eth.getBalance(
    "0xEc0B81a2689dA3C89d91057adDd3a50ea07CDE0e"
  );

  console.log("balance => ", balance);
};

test();
