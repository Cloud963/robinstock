'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { contracts, tokens } from '@/config/contracts';

export default function SwapPage() {
  const { address, isConnected } = useAccount();
  const [tokenIn, setTokenIn] = useState(tokens[0]);
  const [tokenOut, setTokenOut] = useState(tokens[1]);
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('0');
  const [loading, setLoading] = useState(false);

  // Get pair address
  const { data: pairAddress } = useReadContract({
    address: contracts.factory,
    abi: [{
      name: 'getPair',
      type: 'function',
      stateMutability: 'view',
      inputs: [
        { name: 'tokenA', type: 'address' },
        { name: 'tokenB', type: 'address' }
      ],
      outputs: [{ name: 'pair', type: 'address' }]
    }],
    functionName: 'getPair',
    args: [tokenIn.address, tokenOut.address],
  });

  // Get reserves
  const { data: reserves } = useReadContract({
    address: pairAddress as `0x${string}`,
    abi: [{
      name: 'getReserves',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [
        { name: 'reserve0', type: 'uint112' },
        { name: 'reserve1', type: 'uint112' },
        { name: 'blockTimestampLast', type: 'uint32' }
      ]
    }],
    functionName: 'getReserves',
    query: { enabled: !!pairAddress }
  });

  // Calculate output amount
  useEffect(() => {
    if (!amountIn || !reserves || !pairAddress) {
      setAmountOut('0');
      return;
    }

    try {
      const amountInBN = parseUnits(amountIn, 18);
      const [reserve0, reserve1] = reserves as [bigint, bigint, number];
      
      // Calculate output with 0.3% fee
      const amountInWithFee = amountInBN * 997n;
      const numerator = amountInWithFee * reserve1;
      const denominator = (reserve0 * 1000n) + amountInWithFee;
      const amountOutBN = numerator / denominator;
      
      setAmountOut(formatUnits(amountOutBN, 18));
    } catch (error) {
      setAmountOut('0');
    }
  }, [amountIn, reserves, pairAddress]);

  // Approve token
  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { isSuccess: isApproved } = useWaitForTransactionReceipt({ hash: approveHash });

  // Swap
  const { writeContract: swap, data: swapHash } = useWriteContract();
  const { isSuccess: isSwapped } = useWaitForTransactionReceipt({ hash: swapHash });

  const handleApprove = async () => {
    if (!amountIn) return;
    
    setLoading(true);
    try {
      await approve({
        address: tokenIn.address as `0x${string}`,
        abi: [{
          name: 'approve',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' }
          ],
          outputs: [{ name: '', type: 'bool' }]
        }],
        functionName: 'approve',
        args: [contracts.router, parseUnits(amountIn, 18)]
      });
    } catch (error) {
      console.error('Approve error:', error);
      setLoading(false);
    }
  };

  const handleSwap = async () => {
    if (!amountIn || !amountOut) return;
    
    setLoading(true);
    try {
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200); // 20 minutes
      const amountOutMin = parseUnits((parseFloat(amountOut) * 0.95).toString(), 18); // 5% slippage
      
      await swap({
        address: contracts.router as `0x${string}`,
        abi: [{
          name: 'swapExactTokensForTokens',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'amountIn', type: 'uint256' },
            { name: 'amountOutMin', type: 'uint256' },
            { name: 'path', type: 'address[]' },
            { name: 'to', type: 'address' },
            { name: 'deadline', type: 'uint256' }
          ],
          outputs: [{ name: 'amounts', type: 'uint256[]' }]
        }],
        functionName: 'swapExactTokensForTokens',
        args: [
          parseUnits(amountIn, 18),
          amountOutMin,
          [tokenIn.address, tokenOut.address],
          address!,
          deadline
        ]
      });
    } catch (error) {
      console.error('Swap error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isApproved || isSwapped) {
      setLoading(false);
      if (isSwapped) {
        setAmountIn('');
        setAmountOut('0');
      }
    }
  }, [isApproved, isSwapped]);

  const switchTokens = () => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmountIn('');
    setAmountOut('0');
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to use the swap feature.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Swap Tokens</h1>
        
        {/* Token In */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">From</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              placeholder="0.0"
              className="flex-1 bg-gray-700 rounded-lg px-4 py-3 text-lg"
            />
            <select
              value={tokenIn.symbol}
              onChange={(e) => setTokenIn(tokens.find(t => t.symbol === e.target.value)!)}
              className="bg-gray-700 rounded-lg px-4 py-3"
            >
              {tokens.map(token => (
                <option key={token.symbol} value={token.symbol}>{token.symbol}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Switch Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={switchTokens}
            className="bg-gray-700 hover:bg-gray-600 rounded-full p-2"
          >
            ↓↑
          </button>
        </div>

        {/* Token Out */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">To</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={amountOut}
              readOnly
              placeholder="0.0"
              className="flex-1 bg-gray-700 rounded-lg px-4 py-3 text-lg"
            />
            <select
              value={tokenOut.symbol}
              onChange={(e) => setTokenOut(tokens.find(t => t.symbol === e.target.value)!)}
              className="bg-gray-700 rounded-lg px-4 py-3"
            >
              {tokens.map(token => (
                <option key={token.symbol} value={token.symbol}>{token.symbol}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Info */}
        {reserves && pairAddress && (
          <div className="mb-6 p-4 bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-400">
              Price: 1 {tokenIn.symbol} = {amountOut && amountIn ? (parseFloat(amountOut) / parseFloat(amountIn)).toFixed(6) : '0'} {tokenOut.symbol}
            </div>
            <div className="text-sm text-gray-400">
              Fee: 0.3%
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {!isApproved && (
            <button
              onClick={handleApprove}
              disabled={loading || !amountIn}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg py-3 font-semibold"
            >
              {loading ? 'Approving...' : 'Approve'}
            </button>
          )}
          
          <button
            onClick={handleSwap}
            disabled={loading || !amountIn || !isApproved}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg py-3 font-semibold"
          >
            {loading ? 'Swapping...' : 'Swap'}
          </button>
        </div>

        {/* Status Messages */}
        {isApproved && !isSwapped && (
          <div className="mt-4 p-3 bg-green-900/30 border border-green-600 rounded-lg text-sm">
            ✓ Approval successful! Now you can swap.
          </div>
        )}
        {isSwapped && (
          <div className="mt-4 p-3 bg-green-900/30 border border-green-600 rounded-lg text-sm">
            ✓ Swap successful!
          </div>
        )}
      </div>
    </div>
  );
}
