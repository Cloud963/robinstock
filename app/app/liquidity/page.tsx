"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Plus, Minus, ChevronDown, Droplets, Loader2 } from "lucide-react";

// Mock token data for demo
const DEMO_TOKENS = [
  { symbol: "WETH", name: "Wrapped Ether", balance: "1.5" },
  { symbol: "TSLA", name: "Tesla Token", balance: "10.0" },
  { symbol: "AMZN", name: "Amazon Token", balance: "5.0" },
  { symbol: "NFLX", name: "Netflix Token", balance: "8.0" },
];

const POOLS = [
  { token0: "WETH", token1: "TSLA", tvl: 125000, apr: 24.5, userLiquidity: 500 },
  { token0: "WETH", token1: "AMZN", tvl: 89000, apr: 18.2, userLiquidity: 0 },
  { token0: "WETH", token1: "NFLX", tvl: 67000, apr: 31.8, userLiquidity: 250 },
];

export default function LiquidityPage() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"add" | "remove">("add");
  const [token0, setToken0] = useState(DEMO_TOKENS[0]);
  const [token1, setToken1] = useState(DEMO_TOKENS[1]);
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddLiquidity = async () => {
    if (!amount0 || !amount1) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setAmount0("");
      setAmount1("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Liquidity</h1>

          {/* Pools Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
            <div className="p-6 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold">Available Pools</h2>
            </div>
            <div className="divide-y dark:divide-gray-700">
              {POOLS.map((pool, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white dark:border-gray-800">
                          {pool.token0[0]}
                        </div>
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white dark:border-gray-800">
                          {pool.token1[0]}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{pool.token0}/{pool.token1}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">TVL: ${pool.tvl.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-500 font-semibold">{pool.apr}% APR</div>
                      {pool.userLiquidity > 0 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">Your LP: ${pool.userLiquidity}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add/Remove Liquidity */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab("add")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === "add"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <Plus className="h-5 w-5" />
                Add Liquidity
              </button>
              <button
                onClick={() => setActiveTab("remove")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === "remove"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <Minus className="h-5 w-5" />
                Remove Liquidity
              </button>
            </div>

            {activeTab === "add" ? (
              <>
                {/* Token 0 Input */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>Token A</span>
                    <span>Balance: {token0.balance}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-600 rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {token0.symbol[0]}
                      </div>
                      <span className="font-semibold">{token0.symbol}</span>
                    </div>
                    <input
                      type="number"
                      value={amount0}
                      onChange={(e) => setAmount0(e.target.value)}
                      placeholder="0.0"
                      className="flex-1 text-right text-2xl font-semibold bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Plus Icon */}
                <div className="flex justify-center my-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Plus className="h-5 w-5" />
                  </div>
                </div>

                {/* Token 1 Input */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>Token B</span>
                    <span>Balance: {token1.balance}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-600 rounded-lg">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {token1.symbol[0]}
                      </div>
                      <span className="font-semibold">{token1.symbol}</span>
                    </div>
                    <input
                      type="number"
                      value={amount1}
                      onChange={(e) => setAmount1(e.target.value)}
                      placeholder="0.0"
                      className="flex-1 text-right text-2xl font-semibold bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Pool Info */}
                {amount0 && amount1 && (
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">Share of Pool</span>
                      <span>0.05%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">LP Tokens</span>
                      <span>~{(parseFloat(amount0) * parseFloat(amount1)).toFixed(4)}</span>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {!isConnected ? (
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <button
                        onClick={openConnectModal}
                        className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Connect Wallet
                      </button>
                    )}
                  </ConnectButton.Custom>
                ) : showSuccess ? (
                  <button
                    disabled
                    className="w-full py-4 bg-green-500 text-white rounded-xl font-semibold"
                  >
                    ✓ Liquidity Added!
                  </button>
                ) : (
                  <button
                    onClick={handleAddLiquidity}
                    disabled={!amount0 || !amount1 || isProcessing}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Adding Liquidity...
                      </>
                    ) : (
                      <>
                        <Droplets className="h-5 w-5" />
                        Add Liquidity
                      </>
                    )}
                  </button>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Droplets className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">Select a pool above to remove liquidity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
