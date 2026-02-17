"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Coins, Lock, Unlock, TrendingUp, Loader2, Gift } from "lucide-react";

// Mock staking data
const STAKING_POOLS = [
  {
    name: "WETH/TSLA LP",
    apr: 45.5,
    tvl: 250000,
    userStaked: 500,
    rewards: 12.5,
    lockPeriod: "No lock",
  },
  {
    name: "WETH/AMZN LP",
    apr: 38.2,
    tvl: 180000,
    userStaked: 0,
    rewards: 0,
    lockPeriod: "No lock",
  },
  {
    name: "WETH/NFLX LP",
    apr: 52.8,
    tvl: 120000,
    userStaked: 250,
    rewards: 8.3,
    lockPeriod: "No lock",
  },
  {
    name: "RBS Single Stake",
    apr: 25.0,
    tvl: 500000,
    userStaked: 1000,
    rewards: 25.0,
    lockPeriod: "30 days",
  },
];

export default function StakePage() {
  const { isConnected } = useAccount();
  const [selectedPool, setSelectedPool] = useState<number | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const totalStaked = STAKING_POOLS.reduce((acc, pool) => acc + pool.userStaked, 0);
  const totalRewards = STAKING_POOLS.reduce((acc, pool) => acc + pool.rewards, 0);

  const handleStake = async () => {
    if (!stakeAmount) return;
    setIsStaking(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsStaking(false);
    setStakeAmount("");
    setSelectedPool(null);
  };

  const handleClaimAll = async () => {
    setIsClaiming(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsClaiming(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Stake & Earn</h1>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 dark:text-gray-400">Total Staked</span>
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-3xl font-bold">${totalStaked.toLocaleString()}</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 dark:text-gray-400">Pending Rewards</span>
                <Gift className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-500">{totalRewards.toFixed(2)} RBS</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              {isConnected ? (
                <button
                  onClick={handleClaimAll}
                  disabled={totalRewards === 0 || isClaiming}
                  className="w-full h-full flex flex-col items-center justify-center gap-2 text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                >
                  {isClaiming ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : (
                    <Coins className="h-8 w-8" />
                  )}
                  <span className="font-semibold">{isClaiming ? "Claiming..." : "Claim All Rewards"}</span>
                </button>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <ConnectButton />
                </div>
              )}
            </div>
          </div>

          {/* Staking Pools */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="p-6 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold">Staking Pools</h2>
            </div>
            <div className="divide-y dark:divide-gray-700">
              {STAKING_POOLS.map((pool, index) => (
                <div key={index} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                        <Coins className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{pool.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          TVL: ${pool.tvl.toLocaleString()} • {pool.lockPeriod}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">{pool.apr}%</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">APR</div>
                      </div>

                      {pool.userStaked > 0 && (
                        <div className="text-center">
                          <div className="text-lg font-semibold">${pool.userStaked}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Staked</div>
                        </div>
                      )}

                      {pool.rewards > 0 && (
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-500">{pool.rewards} RBS</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Rewards</div>
                        </div>
                      )}

                      <button
                        onClick={() => setSelectedPool(selectedPool === index ? null : index)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {pool.userStaked > 0 ? "Manage" : "Stake"}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Stake Form */}
                  {selectedPool === index && (
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">Amount to Stake</label>
                          <input
                            type="number"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            placeholder="0.0"
                            className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex gap-2 items-end">
                          {!isConnected ? (
                            <ConnectButton />
                          ) : (
                            <>
                              <button
                                onClick={handleStake}
                                disabled={!stakeAmount || isStaking}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
                              >
                                {isStaking ? (
                                  <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Staking...
                                  </>
                                ) : (
                                  <>
                                    <Lock className="h-5 w-5" />
                                    Stake
                                  </>
                                )}
                              </button>
                              {pool.userStaked > 0 && (
                                <button className="px-6 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2">
                                  <Unlock className="h-5 w-5" />
                                  Unstake
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💰 Earn RBS Rewards</h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Stake your LP tokens to earn RBS governance tokens. The longer you stake, the more rewards you earn!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
