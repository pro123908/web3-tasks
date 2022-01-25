const Web3 = require("web3");

const TOKEN_ADDRESS = "0x58AABe567B6993e22c004AA635B3dC1ba3314C40";

const { abi } = require("./ABI.json");

const web3 = new Web3(
  "https://rinkeby.infura.io/v3/097cf08b81f047458ffc898b8c2537b9"
);

const getTxStatus = () => {
  web3.eth.getTransactionReceipt(
    "0xd1194a5982a6e94044666608b1949a62702c6949afaf7a75a737064c365dddb9",
    (e, res) => {
      if (!e) console.log("Result => ", res.logs[0].topics);
      else console.log("Error => ", e);
    }
  );
};

const getTxTransferDetails = async () => {
  let tx = await web3.eth.getTransactionReceipt(
    "0x8b805ec8f2d3575c8163b98021c6722b28cdb8453ff3b2579c896db0b67b9a91"
  );

  //   console.log("tx => ", tx.logs[0].data.replace(/^(0x)0+(0?.*)$/, "$1$2"));

  let value = web3.utils.fromWei(parseInt(tx.logs[0].data, 16).toString());

  console.log(
    "transferValue => ",

    value
    // web3.utils.fromWei(web3.utils.toBN("0x1043561a8829300000").toString())
  );
};

// getTxTransferDetails();
getTxStatus();
