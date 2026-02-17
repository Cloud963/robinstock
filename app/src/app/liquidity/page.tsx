'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { contracts, tokens } from '@/config/contracts';

export default function LiquidityPage() {
  const { address, isConnected } = useAccount();
  const [tokenA, setTokenA] = useState(tokens[0]);
  const [tokenB, setTokenB] = useState(tokens[1]);
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'add' | 'remove'>('add');

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
    args: [tokenA.address, tokenB.address],
  });

  // Get LP balance
  const { data: lpBalance } = useReadContract({
    address: pairAddress as `0x${string}`,
    abi: [{
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }]
    }],
    functionName: 'balanceOf',
    args: [address!],
    query: { enabled: !!pairAddress && !!address }
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

  // Approve tokens
  const { writeContract: approveA, data: approveAHash } = useWriteContract();
  const { writeContract: approveB, data: approveBHash } = useWriteContract();
  const { isSuccess: isApprovedA } = useWaitForTransactionReceipt({ hash: approveAHash });
  const { isSuccess: isApprovedB } = useWaitForTransactionReceipt({ hash: approveBHash });

  // Add/Remove liquidity
  const { writeContract: manageLiquidity, data: liquidityHash } = useWriteContract();
  const { isSuccess: isLiquiditySuccess } = useWaitForTransactionReceipt({ hash: liquidityHash });

  const handleApproveA = async () => {
    if (!amountA) return;
    setLoading(true);
    try {
      await approveA({
        address: tokenA.address as `0x${string}`,
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
        args: [contracts.router, parseUnits(amountA, 18)]
      });
    } catch (error) {
      console.error('Approve A error:', error);
      setLoading(false);
    }
  };

  const handleApproveB = async () => {
    if (!amountB) return;
    setLoading(true);
    try {
      await approveB({
        address: tokenB.address as `0x${string}`,
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
        args: [contracts.router, parseUnits(amountB, 18)]
      });
    } catch (error) {
      console.error('Approve B error:', error);
      setLoading(false);
    }
  };

  const handleAddLiquidity = async () => {
    if (!amountA || !amountB) return;
    setLoading(true);
    try {
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200);
      const amountAMin = parseUnits((parseFloat(amountA) * 0.95).toString(), 18);
      const amountBMin = parseUnits((parseFloat(amountB) * 0.95).toString(), 18);

      await manageLiquidity({
        address: contracts.router as `0x${string}`,
        abi: [{
          name: 'addLiquidity',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'tokenA', type: 'address' },
            { name: 'tokenB', type: 'address' },
            { name: 'amountADesired', type: 'uint256' },
            { name: 'amountBDesired', type: 'uint256' },
            { name: 'amountAMin', type: 'uint256' },
            { name: 'amountBMin', type: 'uint256' },
            { name: 'to', type: 'address' },
            { name: 'deadline', type: 'uint256' }
          ],
          outputs: [
            { name: 'amountA', type: 'uint256' },
            { name: 'amountB', type: 'uint256' },
            { name: 'liquidity', type: 'uint256' }
          ]
        }],
        functionName: 'addLiquidity',
        args: [
          tokenA.address,
          tokenB.address,
          parseUnits(amountA, 18),
          parseUnits(amountB, 18),
          amountAMin,
          amountBMin,
          address!,
          deadline
        ]
      });
    } catch (error) {
      console.error('Add liquidity error:', error);
      setLoading(false);
    }
  };

  const handleRemoveLiquidity = async () => {
    if (!lpBalance) return;
    setLoading(true);
    try {
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200);
      const liquidity = lpBalance as bigint;

      await manageLiquidity({
        address: contracts.router as `0x${string}`,
        abi: [{
          name: 'removeLiquidity',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'tokenA', type: 'address' },
            { name: 'tokenB', type: 'address' },
            { name: 'liquidity', type: 'uint256' },
            { name: 'amountAMin', type: 'uint256' },
            { name: 'amountBMin', type: 'uint256' },
            { name: 'to', type: 'address' },
            { name: 'deadline', type: 'uint256' }
          ],
          outputs: [
            { name: 'amountA', type: 'uint256' },
            { name: 'amountB', type: 'uint256' }
          ]
        }],
        functionName: 'removeLiquidity',
        args: [
          tokenA.address,
          tokenB.address,
          liquidity,
          0n,
          0n,
          address!,
          deadline
        ]
      });
    } catch (error) {
      console.error('Remove liquidity error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isApprovedA || isApprovedB || isLiquiditySuccess) {
      setLoading(false);
      if (isLiquiditySuccess) {
        setAmountA('');
        setAmountB('');
      }
    }
  }, [isApprovedA, isApprovedB, isLiquiditySuccess]);

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to manage liquidity.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Liquidity</h1>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('add')}
            className={`flex-1 py-2 rounded-lg font-semibold ${
              mode === 'add' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            Add Liquidity
          </button>
          <button
            onClick={() => setMode('remove')}
            className={`flex-1 py-2 rounded-lg font-semibold ${
              mode === 'remove' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            Remove Liquidity
          </button>
        </div>

        {mode === 'add' ? (
          <>
            {/* Token A */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Token A</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amountA}
                  onChange={(e) => setAmountA(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 bg-gray-700 rounded-lg px-4 py-3 text-lg"
                />
                <select
                  value={tokenA.symbol}
                  onChange={(e) => setTokenA(tokens.find(t => t.symbol === e.target.value)!)}
                  className="bg-gray-700 rounded-lg px-4 py-3"
                >
                  {tokens.map(token => (
                    <option key={token.symbol} value={token.symbol}>{token.symbol}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Token B */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Token B</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amountB}
                  onChange={(e) => setAmountB(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 bg-gray-700 rounded-lg px-4 py-3 text-lg"
                />
                <select
                  value={tokenB.symbol}
                  onChange={(e) => setTokenB(tokens.find(t => t.symbol === e.target.value)!)}
                  className="bg-gray-700 rounded-lg px-4 py-3"
                >
                  {tokens.map(token => (
                    <option key={token.symbol} value={token.symbol}>{token.symbol}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isApprovedA && (
                <button
                  onClick={handleApproveA}
                  disabled={loading || !amountA}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg py-3 font-semibold"
                >
                  {loading ? 'Approving...' : `Approve ${tokenA.symbol}`}
                </button>
              )}
              {!isApprovedB && (
                <button
                  onClick={handleApproveB}
                  disabled={loading || !amountB}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg py-3 font-semibold"
                >
                  {loading ? 'Approving...' : `Approve ${tokenB.symbol}`}
                </button>
              )}
              <button
                onClick={handleAddLiquidity}
                disabled={loading || !amountA || !amountB || !isApprovedA || !isApprovedB}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg py-3 font-semibold"
              >
                {loading ? 'Adding...' : 'Add Liquidity'}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* LP Balance */}
            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Your LP Balance</div>
              <div className="text-2xl font-bold">
                {lpBalance ? formatUnits(lpBalance as bigint, 18) : '0.0'}
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemoveLiquidity}
              disabled={loading || !lpBalance || lpBalance === 0n}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg py-3 font-semibold"
            >
              {loading ? 'Removing...' : 'Remove All Liquidity'}
            </button>
          </>
        )}

        {/* Status Messages */}
        {isLiquiditySuccess && (
          <div className="mt-4 p-3 bg-green-900/30 border border-green-600 rounded-lg text-sm">
            ✓ Transaction successful!
          </div>
        )}
      </div>
    </div>
  );
}
