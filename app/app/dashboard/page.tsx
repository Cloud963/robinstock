"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TrendingUp, TrendingDown, Wallet, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";

// Mock data for demo
const PORTFOLIO_DATA = {
  totalValue: 12450.00,
  change24h: 3.45,
  positions: [
    { symbol: "TSLA", name: "Tesla Token", amount: 10, value: 1800, change: 5.2 },
    { symbol: "AMZN", name: "Amazon Token", amount: 5, value: 875, change: -1.3 },
    { symbol: "NFLX", name: "Netflix Token", amount: 8, value: 3600, change: 2.8 },
    { symbol: "WETH", name: "Wrapped Ether", amount: 2.5, value: 6250, change: 4.1 },
  ],
  recentTrades: [
    { type: "buy", from: "WETH", to: "TSLA", amount: "0.5", time: "2 hours ago" },
    { type: "sell", from: "NFLX", to: "WETH", amount: "2", time: "5 hours ago" },
    { type: "buy", from: "WETH", to: "AMZN", amount: "0.3", time: "1 day ago" },
  ],
};

export default function DashboardPage() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4 text-center">
          <Wallet className="h-16 w-16 mx-auto mb-6 text-neutral-600" />
          <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-neutral-400 mb-8">
            Connect your wallet to view your portfolio and trading history.
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-400">Total Portfolio Value</span>
              <Wallet className="h-5 w-5 text-robin-neon" />
            </div>
            <div className="text-3xl font-bold text-white">${PORTFOLIO_DATA.totalValue.toLocaleString()}</div>
            <div className={`flex items-center mt-2 ${PORTFOLIO_DATA.change24h >= 0 ? 'text-robin-neon' : 'text-red-500'}`}>
              {PORTFOLIO_DATA.change24h >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              <span>{Math.abs(PORTFOLIO_DATA.change24h)}% (24h)</span>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-400">Total Positions</span>
              <BarChart3 className="h-5 w-5 text-robin-neon" />
            </div>
            <div className="text-3xl font-bold text-white">{PORTFOLIO_DATA.positions.length}</div>
            <div className="text-neutral-400 mt-2">Active tokens</div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-400">24h Trades</span>
              <TrendingUp className="h-5 w-5 text-robin-neon" />
            </div>
            <div className="text-3xl font-bold text-white">{PORTFOLIO_DATA.recentTrades.length}</div>
            <div className="text-neutral-400 mt-2">Transactions</div>
          </div>
        </div>

        {/* Positions */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl mb-8">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-xl font-bold text-white">Your Positions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-300">Token</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-neutral-300">Amount</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-neutral-300">Value</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-neutral-300">24h Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {PORTFOLIO_DATA.positions.map((position) => (
                  <tr key={position.symbol} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-robin-neon rounded-full flex items-center justify-center text-black font-bold">
                          {position.symbol[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{position.symbol}</div>
                          <div className="text-sm text-neutral-400">{position.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-white">{position.amount}</td>
                    <td className="px-6 py-4 text-right font-medium text-white">${position.value.toLocaleString()}</td>
                    <td className={`px-6 py-4 text-right font-medium ${position.change >= 0 ? 'text-robin-neon' : 'text-red-500'}`}>
                      {position.change >= 0 ? '+' : ''}{position.change}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-xl font-bold text-white">Recent Trades</h2>
          </div>
          <div className="divide-y divide-neutral-800">
            {PORTFOLIO_DATA.recentTrades.map((trade, index) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${trade.type === 'buy' ? 'bg-robin-neon/10' : 'bg-red-500/10'}`}>
                    {trade.type === 'buy' ? (
                      <TrendingUp className="h-5 w-5 text-robin-neon" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold capitalize text-white">{trade.type} {trade.to}</div>
                    <div className="text-sm text-neutral-400">{trade.from} → {trade.to}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-white">{trade.amount} {trade.from}</div>
                  <div className="text-sm text-neutral-400">{trade.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
