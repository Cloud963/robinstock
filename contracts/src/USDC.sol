// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title USDC
 * @notice Mock USDC stablecoin for testing and demo purposes
 * @dev This is a simplified version for testnet use only
 */
contract USDC is ERC20, Ownable {
    /**
     * @param initialSupply Initial supply to mint to deployer
     */
    constructor(uint256 initialSupply) ERC20("USD Coin", "USDC") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    /**
     * @notice Returns 6 decimals (standard for USDC)
     */
    function decimals() public pure override returns (uint8) {
        return 6;
    }

    /**
     * @notice Mint new USDC (only owner)
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @notice Faucet function for testnet - anyone can mint small amounts
     * @dev Limited to 1000 USDC per call for demo purposes
     */
    function faucet() external {
        uint256 amount = 1000 * 10**6; // 1000 USDC
        _mint(msg.sender, amount);
    }
}
