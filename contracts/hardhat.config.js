require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: ['0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e'],
    },
  },
};



//did:polygonid:polygon:mumbai:2qHKLU7E2hfEecifr8x1Pt8HfJvH7JBQbbZ7gdY7hk