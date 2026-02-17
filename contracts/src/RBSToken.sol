// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RBSToken
 * @dev RobinStock reward token
 */
contract RBSToken is ERC20, Ownable {
    constructor() ERC20("RobinStock Token", "RBS") Ownable(msg.sender) {
        // Mint initial supply to owner
        _mint(msg.sender, 1000000 * 10**decimals());
    }

    /**
     * @dev Mint new tokens (only owner - for staking rewards)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}