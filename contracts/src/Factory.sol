// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Pair.sol";

/**
 * @title Factory
 * @notice Creates and manages trading pairs for tokenized stocks
 * @dev Implements a Uniswap V2-style factory pattern
 */
contract Factory {
    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    event PairCreated(address indexed token0, address indexed token1, address pair, uint256);

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    /**
     * @notice Returns the total number of pairs created
     */
    function allPairsLength() external view returns (uint256) {
        return allPairs.length;
    }

    /**
     * @notice Creates a new trading pair
     * @param tokenA First token address
     * @param tokenB Second token address
     * @return pair Address of the created pair
     */
    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, "Factory: IDENTICAL_ADDRESSES");
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), "Factory: ZERO_ADDRESS");
        require(getPair[token0][token1] == address(0), "Factory: PAIR_EXISTS");
        
        bytes memory bytecode = type(Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        
        Pair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair;
        allPairs.push(pair);
        
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    /**
     * @notice Sets the fee recipient address
     * @param _feeTo New fee recipient address
     */
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, "Factory: FORBIDDEN");
        feeTo = _feeTo;
    }

    /**
     * @notice Sets the fee setter address
     * @param _feeToSetter New fee setter address
     */
    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, "Factory: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }
}
