"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink, Code, FileText } from "lucide-react";

const CONTRACTS = [
  {
    name: "Factory",
    description: "Creates and manages AMM trading pairs",
    address: "0x1234...5678",
    fullAddress: "0x1234567890abcdef1234567890abcdef12345678",
    verified: true,
  },
  {
    name: "Router",
    description: "Handles swaps and liquidity operations",
    address: "0xabcd...ef01",
    fullAddress: "0xabcdef0123456789abcdef0123456789abcdef01",
    verified: true,
  },
  {
    name: "USDC Token",
    description: "Mock USDC stablecoin for testing",
    address: "0x2345...6789",
    fullAddress: "0x234567890abcdef1234567890abcdef123456789",
    verified: true,
  },
  {
    name: "TSLA Token",
    description: "Tokenized Tesla stock",
    address: "0x3456...789a",
    fullAddress: "0x34567890abcdef1234567890abcdef1234567890a",
    verified: true,
  },
  {
    name: "AMZN Token",
    description: "Tokenized Amazon stock",
    address: "0x4567...89ab",
    fullAddress: "0x4567890abcdef1234567890abcdef1234567890ab",
    verified: true,
  },
  {
    name: "NFLX Token",
    description: "Tokenized Netflix stock",
    address: "0x5678...9abc",
    fullAddress: "0x567890abcdef1234567890abcdef1234567890abc",
    verified: true,
  },
  {
    name: "Price Oracle",
    description: "Provides price feeds for tokenized assets",
    address: "0x6789...abcd",
    fullAddress: "0x67890abcdef1234567890abcdef1234567890abcd",
    verified: true,
  },
  {
    name: "Staking Rewards",
    description: "Manages LP token staking and RBS rewards",
    address: "0x789a...bcde",
    fullAddress: "0x7890abcdef1234567890abcdef1234567890abcde",
    verified: true,
  },
];

export default function ContractsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (address: string, index: number) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Smart Contracts</h1>
            <p className="text-xl text-neutral-400">
              All RobinStock contracts deployed on Arbitrum Sepolia testnet.
            </p>
          </div>

          {/* Network Info */}
          <div className="mb-8 p-4 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-robin-neon rounded-full animate-pulse"></div>
              <span className="text-white font-medium">Arbitrum Sepolia Testnet</span>
            </div>
            <a
              href="https://sepolia.arbiscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-robin-neon hover:text-robin-neon/80 flex items-center gap-2 text-sm"
            >
              View on Arbiscan
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Contracts List */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-neutral-800">
              <h2 className="text-xl font-bold text-white">Deployed Contracts</h2>
            </div>
            <div className="divide-y divide-neutral-800">
              {CONTRACTS.map((contract, index) => (
                <div key={index} className="p-6 hover:bg-neutral-800/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-robin-neon/10 rounded-xl">
                        <Code className="h-6 w-6 text-robin-neon" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">{contract.name}</h3>
                          {contract.verified && (
                            <span className="px-2 py-0.5 bg-robin-neon/10 text-robin-neon text-xs rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400 mb-2">{contract.description}</p>
                        <code className="text-sm text-neutral-300 bg-neutral-800 px-2 py-1 rounded font-mono">
                          {contract.address}
                        </code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(contract.fullAddress, index)}
                        className="p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors text-neutral-400 hover:text-white"
                        title="Copy address"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-5 w-5 text-robin-neon" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                      <a
                        href={`https://sepolia.arbiscan.io/address/${contract.fullAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors text-neutral-400 hover:text-white"
                        title="View on Arbiscan"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Source Code Link */}
          <div className="mt-8 p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-robin-neon/10 rounded-xl">
                <FileText className="h-6 w-6 text-robin-neon" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Source Code</h3>
                <p className="text-sm text-neutral-400">
                  All smart contracts are open-source and available on GitHub.
                </p>
              </div>
              <a
                href="https://github.com/Cloude963/robinstock/tree/main/contracts"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-robin-neon text-black rounded-lg font-semibold hover:bg-robin-neon/90 transition-colors flex items-center gap-2"
              >
                View on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
            <h3 className="font-semibold text-robin-neon mb-2">⚠️ Testnet Only</h3>
            <p className="text-sm text-neutral-400">
              These contracts are deployed on Arbitrum Sepolia testnet for demonstration purposes. Do not send real funds to these addresses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
