// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MockERC20.sol";
import "../src/AMMFactory.sol";
import "../src/AMMRouter.sol";
import "../src/RBSToken.sol";
import "../src/StakingRewards.sol";
import "../src/MockOracle.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy mock tokens for testing
        MockERC20 tsla = new MockERC20("Tesla Token", "TSLA", 18);
        MockERC20 amzn = new MockERC20("Amazon Token", "AMZN", 18);
        MockERC20 nflx = new MockERC20("Netflix Token", "NFLX", 18);
        MockERC20 weth = new MockERC20("Wrapped ETH", "WETH", 18);

        console.log("Mock Tokens Deployed:");
        console.log("TSLA:", address(tsla));
        console.log("AMZN:", address(amzn));
        console.log("NFLX:", address(nflx));
        console.log("WETH:", address(weth));

        // Deploy AMM contracts
        AMMFactory factory = new AMMFactory();
        console.log("Factory:", address(factory));

        AMMRouter router = new AMMRouter(address(factory));
        console.log("Router:", address(router));

        // Deploy RBS reward token
        RBSToken rbsToken = new RBSToken();
        console.log("RBS Token:", address(rbsToken));

        // Create first pair
        address pair = factory.createPair(address(tsla), address(weth));
        console.log("TSLA-WETH Pair:", pair);

        // Deploy staking contract
        StakingRewards staking = new StakingRewards(
            pair,
            address(rbsToken),
            1e18 // 1 RBS per second
        );
        console.log("Staking:", address(staking));

        // Deploy mock oracle
        MockOracle oracle = new MockOracle();
        console.log("Oracle:", address(oracle));

        // Set initial prices in oracle
        address[] memory tokens = new address[](4);
        tokens[0] = address(tsla);
        tokens[1] = address(amzn);
        tokens[2] = address(nflx);
        tokens[3] = address(weth);

        uint256[] memory prices = new uint256[](4);
        prices[0] = 250 * 1e18; // $250
        prices[1] = 180 * 1e18; // $180
        prices[2] = 650 * 1e18; // $650
        prices[3] = 3500 * 1e18; // $3500

        oracle.setPrices(tokens, prices);

        // Transfer RBS tokens to staking contract for rewards
        rbsToken.transfer(address(staking), 100000 * 1e18);

        console.log("\n=== Deployment Complete ===");
        console.log("Save these addresses for frontend config");

        vm.stopBroadcast();
    }
}