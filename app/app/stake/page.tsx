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
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Stake & Earn</h1>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-400">Total Staked</span>
                <Lock className="h-5 w-5 text-robin-neon" />
              </div>
              <div className="text-3xl font-bold text-white">${totalStaked.toLocaleString()}</div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-400">Pending Rewards</span>
                <Gift className="h-5 w-5 text-robin-neon" />
              </div>
              <div className="text-3xl font-bold text-robin-neon">{totalRewards.toFixed(2)} RBS</div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              {isConnected ? (
                <button
                  onClick={handleClaimAll}
                  disabled={totalRewards === 0 || isClaiming}
                  className="w-full h-full flex flex-col items-center justify-center gap-2 text-robin-neon hover:text-robin-neon/80 disabled:text-neutral-600"
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
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl">
            <div className="p-6 border-b border-neutral-800">
              <h2 className="text-xl font-bold text-white">Staking Pools</h2>
            </div>
            <div className="divide-y divide-neutral-800">
              {STAKING_POOLS.map((pool, index) => (
                <div key={index} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-robin-neon/10 rounded-xl">
                        <Coins className="h-6 w-6 text-robin-neon" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-white">{pool.name}</div>
                        <div className="text-sm text-neutral-400">
                          TVL: ${pool.tvl.toLocaleString()} • {pool.lockPeriod}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-robin-neon">{pool.apr}%</div>
                        <div className="text-sm text-neutral-400">APR</div>
                      </div>

                      {pool.userStaked > 0 && (
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">${pool.userStaked}</div>
                          <div className="text-sm text-neutral-400">Staked</div>
                        </div>
                      )}

                      {pool.rewards > 0 && (
                        <div className="text-center">
                          <div className="text-lg font-semibold text-robin-neon">{pool.rewards} RBS</div>
                          <div className="text-sm text-neutral-400">Rewards</div>
                        </div>
                      )}

                      <button
                        onClick={() => setSelectedPool(selectedPool === index ? null : index)}
                        className="px-4 py-2 bg-robin-neon text-black rounded-lg hover:bg-robin-neon/90 transition-colors font-semibold"
                      >
                        {pool.userStaked > 0 ? "Manage" : "Stake"}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Stake Form */}
                  {selectedPool === index && (
                    <div className="mt-6 p-4 bg-neutral-800 rounded-xl">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <label className="text-sm text-neutral-400 mb-2 block">Amount to Stake</label>
                          <input
                            type="number"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            placeholder="0.0"
                            className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-900 text-white outline-none focus:ring-2 focus:ring-robin-neon"
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
                                className="px-6 py-3 bg-robin-neon text-black rounded-lg hover:bg-robin-neon/90 transition-colors disabled:bg-neutral-700 disabled:text-neutral-500 flex items-center gap-2 font-semibold"
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
                                <button className="px-6 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors flex items-center gap-2">
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
          <div className="mt-6 p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
            <h3 className="font-semibold text-robin-neon mb-2">💰 Earn RBS Rewards</h3>
            <p className="text-sm text-neutral-400">
              Stake your LP tokens to earn RBS governance tokens. The longer you stake, the more rewards you earn!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
