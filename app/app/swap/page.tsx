"use client";

import { useState, useEffect } from "react";
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { ArrowDownUp, Settings, ChevronDown, Loader2 } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TOKEN_LIST, CONTRACTS } from "@/config/contracts";

// Mock token data for demo
const DEMO_TOKENS = [
  { symbol: "WETH", name: "Wrapped Ether", balance: "1.5", price: 2500 },
  { symbol: "TSLA", name: "Tesla Token", balance: "10.0", price: 180 },
  { symbol: "AMZN", name: "Amazon Token", balance: "5.0", price: 175 },
  { symbol: "NFLX", name: "Netflix Token", balance: "8.0", price: 450 },
];

export default function SwapPage() {
  const { address, isConnected } = useAccount();
  const [fromToken, setFromToken] = useState(DEMO_TOKENS[0]);
  const [toToken, setToToken] = useState(DEMO_TOKENS[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [showSettings, setShowSettings] = useState(false);
  const [showFromTokenList, setShowFromTokenList] = useState(false);
  const [showToTokenList, setShowToTokenList] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);

  // Calculate output amount based on constant product formula (x * y = k)
  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0) {
      const inputValue = parseFloat(fromAmount) * fromToken.price;
      const outputAmount = inputValue / toToken.price;
      // Apply 0.3% fee
      const outputWithFee = outputAmount * 0.997;
      setToAmount(outputWithFee.toFixed(6));
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken, toToken]);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;
    
    setIsSwapping(true);
    // Simulate swap transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSwapping(false);
    setSwapSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setSwapSuccess(false);
      setFromAmount("");
      setToAmount("");
    }, 3000);
  };

  const selectFromToken = (token: typeof DEMO_TOKENS[0]) => {
    if (token.symbol === toToken.symbol) {
      handleSwapTokens();
    } else {
      setFromToken(token);
    }
    setShowFromTokenList(false);
  };

  const selectToToken = (token: typeof DEMO_TOKENS[0]) => {
    if (token.symbol === fromToken.symbol) {
      handleSwapTokens();
    } else {
      setToToken(token);
    }
    setShowToTokenList(false);
  };

  const priceImpact = fromAmount && parseFloat(fromAmount) > 0 
    ? (parseFloat(fromAmount) * fromToken.price * 0.003 / (parseFloat(fromAmount) * fromToken.price) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Swap</h1>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <h3 className="font-semibold mb-3">Transaction Settings</h3>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Slippage Tolerance</label>
                <div className="flex gap-2 mt-2">
                  {["0.1", "0.5", "1.0"].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippage(value)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        slippage === value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                  <input
                    type="number"
                    value={slippage}
                    onChange={(e) => setSlippage(e.target.value)}
                    className="w-20 px-2 py-1 rounded-lg border dark:border-gray-600 dark:bg-gray-700 text-sm"
                    placeholder="Custom"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Swap Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            {/* From Token */}
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>From</span>
                <span>Balance: {fromToken.balance}</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="relative">
                  <button
                    onClick={() => setShowFromTokenList(!showFromTokenList)}
                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                  >
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {fromToken.symbol[0]}
                    </div>
                    <span className="font-semibold">{fromToken.symbol}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {/* Token Dropdown */}
                  {showFromTokenList && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-xl shadow-lg z-10 overflow-hidden">
                      {DEMO_TOKENS.map((token) => (
                        <button
                          key={token.symbol}
                          onClick={() => selectFromToken(token)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {token.symbol[0]}
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">{token.symbol}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{token.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 text-right text-2xl font-semibold bg-transparent outline-none"
                />
              </div>
              <button
                onClick={() => setFromAmount(fromToken.balance)}
                className="text-xs text-blue-600 hover:text-blue-700 mt-1"
              >
                Max
              </button>
            </div>

            {/* Swap Direction Button */}
            <div className="flex justify-center -my-2 relative z-10">
              <button
                onClick={handleSwapTokens}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-4 border-white dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ArrowDownUp className="h-5 w-5" />
              </button>
            </div>

            {/* To Token */}
            <div className="mt-2">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>To</span>
                <span>Balance: {toToken.balance}</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="relative">
                  <button
                    onClick={() => setShowToTokenList(!showToTokenList)}
                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                  >
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {toToken.symbol[0]}
                    </div>
                    <span className="font-semibold">{toToken.symbol}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {/* Token Dropdown */}
                  {showToTokenList && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-xl shadow-lg z-10 overflow-hidden">
                      {DEMO_TOKENS.map((token) => (
                        <button
                          key={token.symbol}
                          onClick={() => selectToToken(token)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {token.symbol[0]}
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">{token.symbol}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{token.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="number"
                  value={toAmount}
                  readOnly
                  placeholder="0.0"
                  className="flex-1 text-right text-2xl font-semibold bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Price Info */}
            {fromAmount && parseFloat(fromAmount) > 0 && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Rate</span>
                  <span>1 {fromToken.symbol} = {(fromToken.price / toToken.price).toFixed(4)} {toToken.symbol}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Price Impact</span>
                  <span className="text-green-500">&lt;{priceImpact}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Fee (0.3%)</span>
                  <span>${(parseFloat(fromAmount) * fromToken.price * 0.003).toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Swap Button */}
            <div className="mt-6">
              {!isConnected ? (
                <div className="w-full">
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
                </div>
              ) : swapSuccess ? (
                <button
                  disabled
                  className="w-full py-4 bg-green-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  ✓ Swap Successful!
                </button>
              ) : (
                <button
                  onClick={handleSwap}
                  disabled={!fromAmount || parseFloat(fromAmount) <= 0 || isSwapping}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSwapping ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Swapping...
                    </>
                  ) : !fromAmount || parseFloat(fromAmount) <= 0 ? (
                    "Enter an amount"
                  ) : (
                    "Swap"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 Demo Mode</h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              This is a demo of the RobinStock swap interface. Connect your wallet to Arbitrum Sepolia to test with real transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
