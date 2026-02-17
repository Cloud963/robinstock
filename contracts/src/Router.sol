// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./Factory.sol";
import "./Pair.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @title Router
 * @notice Router for interacting with AMM pairs - handles swaps and liquidity
 * @dev Provides user-friendly interface for Factory and Pair contracts
 */
contract Router {
    using SafeERC20 for IERC20;
    using Math for uint256;

    address public immutable factory;

    constructor(address _factory) {
        factory = _factory;
    }

    /**
     * @notice Add liquidity to a trading pair
     */
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB, uint256 liquidity) {
        require(deadline >= block.timestamp, "Router: EXPIRED");

        address pair = Factory(factory).getPair(tokenA, tokenB);
        if (pair == address(0)) {
            pair = Factory(factory).createPair(tokenA, tokenB);
        }

        (amountA, amountB) = _calculateLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin
        );

        IERC20(tokenA).safeTransferFrom(msg.sender, pair, amountA);
        IERC20(tokenB).safeTransferFrom(msg.sender, pair, amountB);
        liquidity = Pair(pair).mint(to);
    }

    /**
     * @notice Remove liquidity from a trading pair
     */
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB) {
        require(deadline >= block.timestamp, "Router: EXPIRED");

        address pair = Factory(factory).getPair(tokenA, tokenB);
        require(pair != address(0), "Router: PAIR_NOT_FOUND");

        IERC20(pair).safeTransferFrom(msg.sender, pair, liquidity);
        (uint256 amount0, uint256 amount1) = Pair(pair).burn(to);

        (address token0,) = _sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
        require(amountA >= amountAMin, "Router: INSUFFICIENT_A_AMOUNT");
        require(amountB >= amountBMin, "Router: INSUFFICIENT_B_AMOUNT");
    }

    /**
     * @notice Swap exact tokens for tokens
     */
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        require(deadline >= block.timestamp, "Router: EXPIRED");
        amounts = _getAmountsOut(amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, "Router: INSUFFICIENT_OUTPUT_AMOUNT");

        IERC20(path[0]).safeTransferFrom(
            msg.sender,
            Factory(factory).getPair(path[0], path[1]),
            amounts[0]
        );
        _swap(amounts, path, to);
    }

    /**
     * @notice Swap tokens for exact tokens
     */
    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        require(deadline >= block.timestamp, "Router: EXPIRED");
        amounts = _getAmountsIn(amountOut, path);
        require(amounts[0] <= amountInMax, "Router: EXCESSIVE_INPUT_AMOUNT");

        IERC20(path[0]).safeTransferFrom(
            msg.sender,
            Factory(factory).getPair(path[0], path[1]),
            amounts[0]
        );
        _swap(amounts, path, to);
    }

    /**
     * @notice Get amounts out for a given input
     */
    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts)
    {
        return _getAmountsOut(amountIn, path);
    }

    /**
     * @notice Get amounts in for a given output
     */
    function getAmountsIn(uint256 amountOut, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts)
    {
        return _getAmountsIn(amountOut, path);
    }

    // Internal functions

    function _calculateLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin
    ) internal view returns (uint256 amountA, uint256 amountB) {
        address pair = Factory(factory).getPair(tokenA, tokenB);
        if (pair == address(0)) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            (uint112 reserve0, uint112 reserve1,) = Pair(pair).getReserves();
            (address token0,) = _sortTokens(tokenA, tokenB);
            (uint256 reserveA, uint256 reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);

            if (reserveA == 0 && reserveB == 0) {
                (amountA, amountB) = (amountADesired, amountBDesired);
            } else {
                uint256 amountBOptimal = _quote(amountADesired, reserveA, reserveB);
                if (amountBOptimal <= amountBDesired) {
                    require(amountBOptimal >= amountBMin, "Router: INSUFFICIENT_B_AMOUNT");
                    (amountA, amountB) = (amountADesired, amountBOptimal);
                } else {
                    uint256 amountAOptimal = _quote(amountBDesired, reserveB, reserveA);
                    require(amountAOptimal <= amountADesired && amountAOptimal >= amountAMin, "Router: INSUFFICIENT_A_AMOUNT");
                    (amountA, amountB) = (amountAOptimal, amountBDesired);
                }
            }
        }
    }

    function _swap(uint256[] memory amounts, address[] memory path, address _to) internal {
        for (uint256 i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = _sortTokens(input, output);
            uint256 amountOut = amounts[i + 1];
            (uint256 amount0Out, uint256 amount1Out) = input == token0 ? (uint256(0), amountOut) : (amountOut, uint256(0));
            address to = i < path.length - 2 ? Factory(factory).getPair(output, path[i + 2]) : _to;
            Pair(Factory(factory).getPair(input, output)).swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }

    function _getAmountsOut(uint256 amountIn, address[] memory path) internal view returns (uint256[] memory amounts) {
        require(path.length >= 2, "Router: INVALID_PATH");
        amounts = new uint256[](path.length);
        amounts[0] = amountIn;
        for (uint256 i; i < path.length - 1; i++) {
            (uint112 reserveIn, uint112 reserveOut) = _getReserves(path[i], path[i + 1]);
            amounts[i + 1] = _getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    function _getAmountsIn(uint256 amountOut, address[] memory path) internal view returns (uint256[] memory amounts) {
        require(path.length >= 2, "Router: INVALID_PATH");
        amounts = new uint256[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint256 i = path.length - 1; i > 0; i--) {
            (uint112 reserveIn, uint112 reserveOut) = _getReserves(path[i - 1], path[i]);
            amounts[i - 1] = _getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }

    function _getReserves(address tokenA, address tokenB) internal view returns (uint112 reserveA, uint112 reserveB) {
        (address token0,) = _sortTokens(tokenA, tokenB);
        address pair = Factory(factory).getPair(tokenA, tokenB);
        require(pair != address(0), "Router: PAIR_NOT_FOUND");
        (uint112 reserve0, uint112 reserve1,) = Pair(pair).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }

    function _getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) internal pure returns (uint256 amountOut) {
        require(amountIn > 0, "Router: INSUFFICIENT_INPUT_AMOUNT");
        require(reserveIn > 0 && reserveOut > 0, "Router: INSUFFICIENT_LIQUIDITY");
        uint256 amountInWithFee = amountIn * 997;
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * 1000) + amountInWithFee;
        amountOut = numerator / denominator;
    }

    function _getAmountIn(uint256 amountOut, uint256 reserveIn, uint256 reserveOut) internal pure returns (uint256 amountIn) {
        require(amountOut > 0, "Router: INSUFFICIENT_OUTPUT_AMOUNT");
        require(reserveIn > 0 && reserveOut > 0, "Router: INSUFFICIENT_LIQUIDITY");
        uint256 numerator = reserveIn * amountOut * 1000;
        uint256 denominator = (reserveOut - amountOut) * 997;
        amountIn = (numerator / denominator) + 1;
    }

    function _quote(uint256 amountA, uint256 reserveA, uint256 reserveB) internal pure returns (uint256 amountB) {
        require(amountA > 0, "Router: INSUFFICIENT_AMOUNT");
        require(reserveA > 0 && reserveB > 0, "Router: INSUFFICIENT_LIQUIDITY");
        amountB = (amountA * reserveB) / reserveA;
    }

    function _sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, "Router: IDENTICAL_ADDRESSES");
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), "Router: ZERO_ADDRESS");
    }
}
