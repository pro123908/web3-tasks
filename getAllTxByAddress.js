const Web3 = require("web3");

const web3 = new Web3(
  "https://rinkeby.infura.io/v3/097cf08b81f047458ffc898b8c2537b9"
);

const getAllTxsByUser = async (account) => {
  var n = await web3.eth.getBlockNumber();

  var txs = [];

  console.log("n => ", n);
  for (var i = 9250648; i <= 9250951; i++) {
    var block = await web3.eth.getBlock(i, true);
    console.log(i);
    // if (block.from.toLowerCase() === account.toLowerCase()) {
    //   txs.push(block);
    // }

    for (var j = 0; j < block.transactions.length; j++) {
      if (block.transactions[j]?.from?.toLowerCase() == account.toLowerCase()) {
        // console.log(block.transactions[j]);
        txs.push(block.transactions[j]);
      }
    }
  }

  console.log("Tx => ", txs);
};

getAllTxsByUser("0x1C168A080e935656Ca40B8D35A3762bc1899033B");
