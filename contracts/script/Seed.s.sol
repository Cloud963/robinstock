// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MockERC20.sol";
import "../src/AMMFactory.sol";
import "../src/AMMRouter.sol";

contract SeedScript is Script {
    function run() external {
        // Load addresses from environment or previous deployment
        address factoryAddr = vm.envAddress("FACTORY_ADDRESS");
        address routerAddr = vm.envAddress("ROUTER_ADDRESS");
        address tslaAddr = vm.envAddress("TSLA_ADDRESS");
        address wethAddr = vm.envAddress("WETH_ADDRESS");

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        MockERC20 tsla = MockERC20(tslaAddr);
        MockERC20 weth = MockERC20(wethAddr);
        AMMRouter router = AMMRouter(routerAddr);

        // Mint tokens for liquidity
        uint256 tslaAmount = 1000 * 1e18;
        uint256 wethAmount = 10 * 1e18;

        tsla.mint(msg.sender, tslaAmount);
        weth.mint(msg.sender, wethAmount);

        // Approve router
        tsla.approve(routerAddr, tslaAmount);
        weth.approve(routerAddr, wethAmount);

        // Add liquidity
        router.addLiquidity(
            address(tsla),
            address(weth),
            tslaAmount,
            wethAmount,
            0,
            0,
            msg.sender,
            block.timestamp + 300
        );

        console.log("Liquidity added successfully!");
        console.log("TSLA:", tslaAmount);
        console.log("WETH:", wethAmount);

        // Do a test swap
        uint256 swapAmount = 10 * 1e18;
        tsla.mint(msg.sender, swapAmount);
        tsla.approve(routerAddr, swapAmount);

        address[] memory path = new address[](2);
        path[0] = address(tsla);
        path[1] = address(weth);

        router.swapExactTokensForTokens(
            swapAmount,
            0,
            path,
            msg.sender,
            block.timestamp + 300
        );

        console.log("Test swap completed!");

        vm.stopBroadcast();
    }
}