const { default: axios } = require("axios");
const Web3 = require("web3");
const { getCurrentGasPrices } = require("./utils");

const web3 = new Web3(
  "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213"
);

const PRIVATE_KEY =
  "d82f8cda76580b8dd167544ba2d69fcb6dfc93fea17074e55ffd5767155aebcc";

const FROM_ADDRESS = "0x1C168A080e935656Ca40B8D35A3762bc1899033B";

const TO_ADDRESS = "0x6c210CC01E6D6374574d55F0aF75247Cff141385";

const main = async () => {
  try {
    let senderBalance = await web3.eth.getBalance(FROM_ADDRESS);

    let recipientBalance = await web3.eth.getBalance(TO_ADDRESS);

    console.log({
      senderBalance: web3.utils.fromWei(senderBalance),
      recipientBalance: web3.utils.fromWei(recipientBalance),
    });
    let gasPrices = await getCurrentGasPrices();

    let txObj = {
      to: TO_ADDRESS,
      value: web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
      gas: 21000,
      gasPrice: gasPrices.low * 1000000000,
      // "nonce": nonce,
      chainId: 4,
    };

    let tx = await web3.eth.accounts.signTransaction(txObj, PRIVATE_KEY);

    let txId = await web3.eth.sendSignedTransaction(tx.rawTransaction);

    console.log(txId);

    senderBalance = await web3.eth.getBalance(FROM_ADDRESS);

    recipientBalance = await web3.eth.getBalance(TO_ADDRESS);

    console.log({
      senderBalance: web3.utils.fromWei(senderBalance),
      recipientBalance: web3.utils.fromWei(recipientBalance),
    });
  } catch (error) {
    console.log("Error => ", error);
  }
};

main();
