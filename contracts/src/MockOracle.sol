// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MockOracle
 * @dev Simple mock oracle for displaying reference prices (NOT used for swap execution)
 */
contract MockOracle is Ownable {
    mapping(address => uint256) private prices;
    mapping(address => uint256) private lastUpdate;

    event PriceUpdated(address indexed token, uint256 price, uint256 timestamp);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Set price for a token (only owner)
     */
    function setPrice(address token, uint256 price) external onlyOwner {
        require(token != address(0), "Invalid token");
        require(price > 0, "Invalid price");
        prices[token] = price;
        lastUpdate[token] = block.timestamp;
        emit PriceUpdated(token, price, block.timestamp);
    }

    /**
     * @dev Batch set prices
     */
    function setPrices(address[] calldata tokens, uint256[] calldata _prices) external onlyOwner {
        require(tokens.length == _prices.length, "Length mismatch");
        for (uint256 i = 0; i < tokens.length; i++) {
            require(tokens[i] != address(0), "Invalid token");
            require(_prices[i] > 0, "Invalid price");
            prices[tokens[i]] = _prices[i];
            lastUpdate[tokens[i]] = block.timestamp;
            emit PriceUpdated(tokens[i], _prices[i], block.timestamp);
        }
    }

    /**
     * @dev Get price for a token
     */
    function getPrice(address token) external view returns (uint256) {
        return prices[token];
    }

    /**
     * @dev Get price with last update time
     */
    function getPriceWithTimestamp(address token) external view returns (uint256 price, uint256 timestamp) {
        return (prices[token], lastUpdate[token]);
    }
}