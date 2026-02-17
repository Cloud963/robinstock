'use client';

import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { contracts, tokens } from '@/config/contracts';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();

  // Get all pair addresses
  const pairs = [
    { tokenA: tokens[0], tokenB: tokens[1] },
    { tokenA: tokens[0], tokenB: tokens[2] },
    { tokenA: tokens[1], tokenB: tokens[2] },
  ];

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to view the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-400 mb-2">Total Value Locked</div>
          <div className="text-3xl font-bold">$0.00</div>
          <div className="text-sm text-green-400 mt-1">+0.00%</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-400 mb-2">24h Volume</div>
          <div className="text-3xl font-bold">$0.00</div>
          <div className="text-sm text-green-400 mt-1">+0.00%</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-400 mb-2">Total Pairs</div>
          <div className="text-3xl font-bold">{pairs.length}</div>
        </div>
      </div>

      {/* Liquidity Pools */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Liquidity Pools</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3">Pair</th>
                <th className="pb-3">TVL</th>
                <th className="pb-3">Volume 24h</th>
                <th className="pb-3">APR</th>
              </tr>
            </thead>
            <tbody>
              {pairs.map((pair, index) => (
                <PairRow key={index} pair={pair} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Token Prices */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Token Prices</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tokens.map((token) => (
            <TokenPriceCard key={token.symbol} token={token} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PairRow({ pair }: { pair: { tokenA: any; tokenB: any } }) {
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
    args: [pair.tokenA.address, pair.tokenB.address],
  });

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
    query: { enabled: !!pairAddress && pairAddress !== '0x0000000000000000000000000000000000000000' }
  });

  const tvl = reserves
    ? parseFloat(formatUnits((reserves as any)[0], 18)) + parseFloat(formatUnits((reserves as any)[1], 18))
    : 0;

  return (
    <tr className="border-b border-gray-700">
      <td className="py-4">
        <div className="font-semibold">
          {pair.tokenA.symbol}/{pair.tokenB.symbol}
        </div>
      </td>
      <td className="py-4">${tvl.toFixed(2)}</td>
      <td className="py-4">$0.00</td>
      <td className="py-4 text-green-400">0.00%</td>
    </tr>
  );
}

function TokenPriceCard({ token }: { token: any }) {
  const { data: price } = useReadContract({
    address: contracts.oracle as `0x${string}`,
    abi: [{
      name: 'getPrice',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'token', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }]
    }],
    functionName: 'getPrice',
    args: [token.address]
  });

  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <div className="text-sm text-gray-400 mb-1">{token.symbol}</div>
      <div className="text-2xl font-bold">
        ${price ? formatUnits(price as bigint, 18) : '0.00'}
      </div>
      <div className="text-sm text-gray-400 mt-1">{token.name}</div>
    </div>
  );
}
