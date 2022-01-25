const { default: axios } = require("axios");
const Web3 = require("web3");

const web3 = new Web3(
  "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213"
);

const fromWei = (val) => {
  return web3.utils.fromWei(val);
};

const toWei = (val) => {
  return web3.utils.toWei(val);
};

const getCurrentGasPrices = async () => {
  let response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
  };

  console.log("\r\n");
  console.log(`Current ETH Gas Prices (in GWEI):`);
  console.log("\r\n");
  console.log(`Low: ${prices.low} (transaction completes in < 30 minutes)`);
  console.log(
    `Standard: ${prices.medium} (transaction completes in < 5 minutes)`
  );
  console.log(`Fast: ${prices.high} (transaction completes in < 2 minutes)`);
  console.log("\r\n");

  return prices;
};

module.exports = { toWei, fromWei, getCurrentGasPrices };
