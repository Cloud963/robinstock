// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title StockToken
 * @notice ERC20 token representing tokenized real-world stocks
 * @dev Each instance represents a specific stock (e.g., TSLA, AMZN, AAPL)
 */
contract StockToken is ERC20, Ownable {
    uint8 private _decimals;
    string public stockSymbol;
    
    event Minted(address indexed to, uint256 amount);
    event Burned(address indexed from, uint256 amount);

    /**
     * @param name Token name (e.g., "Tokenized Tesla")
     * @param symbol Token symbol (e.g., "TSLA")
     * @param stockSym Real stock symbol for reference
     * @param decimals_ Token decimals (default 18)
     */
    constructor(
        string memory name,
        string memory symbol,
        string memory stockSym,
        uint8 decimals_
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _decimals = decimals_;
        stockSymbol = stockSym;
    }

    /**
     * @notice Returns the number of decimals
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    /**
     * @notice Mint new tokens (only owner)
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit Minted(to, amount);
    }

    /**
     * @notice Burn tokens from an address (only owner)
     * @param from Address to burn from
     * @param amount Amount to burn
     */
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
        emit Burned(from, amount);
    }

    /**
     * @notice Burn own tokens
     * @param amount Amount to burn
     */
    function burnSelf(uint256 amount) external {
        _burn(msg.sender, amount);
        emit Burned(msg.sender, amount);
    }
}
