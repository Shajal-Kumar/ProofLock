require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: "0.8.0",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545", // Localhost network URL
            accounts: [`0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e`] // Replace with your local accounts if needed
        },
        polygon: {
            url: "https://polygon-mainnet.infura.io/v3/78f81435a2394e5aa6b1fe28b5799c24",
            accounts: [`0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e`]
        }
    }
};

//did:polygonid:polygon:mumbai:2qHKLU7E2hfEecifr8x1Pt8HfJvH7JBQbbZ7gdY7hk