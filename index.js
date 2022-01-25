const Web3 = require("web3");

const { abi } = require("./ABI.json");

const web3 = new Web3(
  "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213"
);

const contract = new web3.eth.Contract(
  abi,
  "0x58AABe567B6993e22c004AA635B3dC1ba3314C40"
);

const PRIVATE_KEY =
  "d82f8cda76580b8dd167544ba2d69fcb6dfc93fea17074e55ffd5767155aebcc";

const FROM_ADDRESS = "0x1C168A080e935656Ca40B8D35A3762bc1899033B";

const TO_ADDRESS = "0x6c210CC01E6D6374574d55F0aF75247Cff141385";

web3.eth.defaultAccount = FROM_ADDRESS;

(async () => {
  let balance = await web3.eth.getBalance(FROM_ADDRESS);

  let count = await web3.eth.getTransactionCount(FROM_ADDRESS);

  let account = await web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);

  let tx = await web3.eth.accounts.signTransaction(
    {
      to: TO_ADDRESS,
      value: web3.utils.toWei("1"),
      gas: 2000000,
    },
    PRIVATE_KEY
  );
  console.log(web3.utils.fromWei(balance));
  console.log(count);
  console.log(account);
  console.log(tx);
  console.log(contract._address);

  // await web3.eth.accounts.sendRawTransaction(tx);
})();
