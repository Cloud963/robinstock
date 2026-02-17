'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { contracts } from '@/config/contracts';

export default function StakePage() {
  const { address, isConnected } = useAccount();
  const [stakeAmount, setStakeAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Get staked balance
  const { data: stakedBalance } = useReadContract({
    address: contracts.staking as `0x${string}`,
    abi: [{
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }]
    }],
    functionName: 'balanceOf',
    args: [address!],
    query: { enabled: !!address }
  });

  // Get earned rewards
  const { data: earnedRewards } = useReadContract({
    address: contracts.staking as `0x${string}`,
    abi: [{
      name: 'earned',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }]
    }],
    functionName: 'earned',
    args: [address!],
    query: { enabled: !!address }
  });

  // Get reward rate
  const { data: rewardRate } = useReadContract({
    address: contracts.staking as `0x${string}`,
    abi: [{
      name: 'rewardRate',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'uint256' }]
    }],
    functionName: 'rewardRate'
  });

  // Approve LP token
  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { isSuccess: isApproved } = useWaitForTransactionReceipt({ hash: approveHash });

  // Stake
  const { writeContract: stake, data: stakeHash } = useWriteContract();
  const { isSuccess: isStaked } = useWaitForTransactionReceipt({ hash: stakeHash });

  // Withdraw
  const { writeContract: withdraw, data: withdrawHash } = useWriteContract();
  const { isSuccess: isWithdrawn } = useWaitForTransactionReceipt({ hash: withdrawHash });

  // Claim rewards
  const { writeContract: claim, data: claimHash } = useWriteContract();
  const { isSuccess: isClaimed } = useWaitForTransactionReceipt({ hash: claimHash });

  const handleApprove = async () => {
    if (!stakeAmount) return;
    setLoading(true);
    try {
      await approve({
        address: contracts.lpToken as `0x${string}`,
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
        args: [contracts.staking, parseUnits(stakeAmount, 18)]
      });
    } catch (error) {
      console.error('Approve error:', error);
      setLoading(false);
    }
  };

  const handleStake = async () => {
    if (!stakeAmount) return;
    setLoading(true);
    try {
      await stake({
        address: contracts.staking as `0x${string}`,
        abi: [{
          name: 'stake',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [{ name: 'amount', type: 'uint256' }],
          outputs: []
        }],
        functionName: 'stake',
        args: [parseUnits(stakeAmount, 18)]
      });
    } catch (error) {
      console.error('Stake error:', error);
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!stakedBalance) return;
    setLoading(true);
    try {
      await withdraw({
        address: contracts.staking as `0x${string}`,
        abi: [{
          name: 'withdraw',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [{ name: 'amount', type: 'uint256' }],
          outputs: []
        }],
        functionName: 'withdraw',
        args: [stakedBalance as bigint]
      });
    } catch (error) {
      console.error('Withdraw error:', error);
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    setLoading(true);
    try {
      await claim({
        address: contracts.staking as `0x${string}`,
        abi: [{
          name: 'getReward',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [],
          outputs: []
        }],
        functionName: 'getReward'
      });
    } catch (error) {
      console.error('Claim error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isApproved || isStaked || isWithdrawn || isClaimed) {
      setLoading(false);
      if (isStaked) {
        setStakeAmount('');
      }
    }
  }, [isApproved, isStaked, isWithdrawn, isClaimed]);

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to stake LP tokens.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Stake LP Tokens</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Stats Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-400">Staked Balance</div>
                <div className="text-2xl font-bold">
                  {stakedBalance ? formatUnits(stakedBalance as bigint, 18) : '0.0'} LP
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Earned Rewards</div>
                <div className="text-2xl font-bold text-green-400">
                  {earnedRewards ? formatUnits(earnedRewards as bigint, 18) : '0.0'} RBS
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Reward Rate</div>
                <div className="text-lg">
                  {rewardRate ? formatUnits(rewardRate as bigint, 18) : '0.0'} RBS/sec
                </div>
              </div>
            </div>
          </div>

          {/* Stake Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Stake LP Tokens</h2>
            <div className="mb-4">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="Amount to stake"
                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-lg"
              />
            </div>
            <div className="space-y-3">
              {!isApproved && (
                <button
                  onClick={handleApprove}
                  disabled={loading || !stakeAmount}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg py-3 font-semibold"
                >
                  {loading ? 'Approving...' : 'Approve LP'}
                </button>
              )}
              <button
                onClick={handleStake}
                disabled={loading || !stakeAmount || !isApproved}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg py-3 font-semibold"
              >
                {loading ? 'Staking...' : 'Stake'}
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={handleWithdraw}
              disabled={loading || !stakedBalance || stakedBalance === 0n}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg py-3 font-semibold"
            >
              {loading ? 'Withdrawing...' : 'Withdraw All'}
            </button>
            <button
              onClick={handleClaim}
              disabled={loading || !earnedRewards || earnedRewards === 0n}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg py-3 font-semibold"
            >
              {loading ? 'Claiming...' : 'Claim Rewards'}
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {(isStaked || isWithdrawn || isClaimed) && (
          <div className="mt-4 p-3 bg-green-900/30 border border-green-600 rounded-lg text-sm">
            ✓ Transaction successful!
          </div>
        )}
      </div>
    </div>
  );
}
