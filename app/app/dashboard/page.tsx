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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <Wallet className="h-16 w-16 mx-auto mb-6 text-gray-400" />
          <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Connect your wallet to view your portfolio and trading history.
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 dark:text-gray-400">Total Portfolio Value</span>
              <Wallet className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold">${PORTFOLIO_DATA.totalValue.toLocaleString()}</div>
            <div className={`flex items-center mt-2 ${PORTFOLIO_DATA.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {PORTFOLIO_DATA.change24h >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              <span>{Math.abs(PORTFOLIO_DATA.change24h)}% (24h)</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 dark:text-gray-400">Total Positions</span>
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold">{PORTFOLIO_DATA.positions.length}</div>
            <div className="text-gray-500 dark:text-gray-400 mt-2">Active tokens</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 dark:text-gray-400">24h Trades</span>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold">{PORTFOLIO_DATA.recentTrades.length}</div>
            <div className="text-gray-500 dark:text-gray-400 mt-2">Transactions</div>
          </div>
        </div>

        {/* Positions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
          <div className="p-6 border-b dark:border-gray-700">
            <h2 className="text-xl font-bold">Your Positions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Token</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Value</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">24h Change</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {PORTFOLIO_DATA.positions.map((position) => (
                  <tr key={position.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {position.symbol[0]}
                        </div>
                        <div>
                          <div className="font-semibold">{position.symbol}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{position.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">{position.amount}</td>
                    <td className="px-6 py-4 text-right font-medium">${position.value.toLocaleString()}</td>
                    <td className={`px-6 py-4 text-right font-medium ${position.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {position.change >= 0 ? '+' : ''}{position.change}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="p-6 border-b dark:border-gray-700">
            <h2 className="text-xl font-bold">Recent Trades</h2>
          </div>
          <div className="divide-y dark:divide-gray-700">
            {PORTFOLIO_DATA.recentTrades.map((trade, index) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${trade.type === 'buy' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                    {trade.type === 'buy' ? (
                      <TrendingUp className={`h-5 w-5 ${trade.type === 'buy' ? 'text-green-600' : 'text-red-600'}`} />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold capitalize">{trade.type} {trade.to}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{trade.from} → {trade.to}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{trade.amount} {trade.from}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{trade.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
