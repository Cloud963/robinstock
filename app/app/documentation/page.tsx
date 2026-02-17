"use client";

import Link from "next/link";
import { FileText, Book, Code, Shield, Coins, Droplets, TrendingUp, ExternalLink } from "lucide-react";

const DOCS = [
  {
    title: "Getting Started",
    description: "Learn how to connect your wallet and start trading tokenized stocks on RobinStock.",
    icon: Book,
    href: "https://github.com/Cloude963/robinstock/blob/main/docs/getting-started.md",
  },
  {
    title: "How Swaps Work",
    description: "Understand the AMM mechanism and how token swaps are executed on the platform.",
    icon: TrendingUp,
    href: "https://github.com/Cloude963/robinstock/blob/main/docs/swaps.md",
  },
  {
    title: "Providing Liquidity",
    description: "Learn how to add liquidity to pools and earn trading fees from every transaction.",
    icon: Droplets,
    href: "https://github.com/Cloude963/robinstock/blob/main/docs/liquidity.md",
  },
  {
    title: "Staking Rewards",
    description: "Discover how to stake LP tokens and earn RBS governance token rewards.",
    icon: Coins,
    href: "https://github.com/Cloude963/robinstock/blob/main/docs/staking.md",
  },
  {
    title: "Smart Contracts",
    description: "Technical documentation for all deployed smart contracts on Arbitrum.",
    icon: Code,
    href: "https://github.com/Cloude963/robinstock/blob/main/docs/contracts.md",
  },
  {
    title: "Security",
    description: "Learn about our security practices and how we protect user funds.",
    icon: Shield,
    href: "https://github.com/Cloude963/robinstock/blob/main/docs/security.md",
  },
];

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
            <p className="text-xl text-neutral-400">
              Everything you need to know about using RobinStock DEX.
            </p>
          </div>

          {/* Documentation Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {DOCS.map((doc, index) => (
              <a
                key={index}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-robin-neon/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-robin-neon/10 rounded-xl group-hover:bg-robin-neon/20 transition-colors">
                    <doc.icon className="h-6 w-6 text-robin-neon" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-robin-neon transition-colors">
                        {doc.title}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-neutral-500 group-hover:text-robin-neon transition-colors" />
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="https://github.com/Cloude963/robinstock"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <Code className="h-5 w-5 text-robin-neon" />
                <span className="text-white">GitHub Repository</span>
              </a>
              <Link
                href="/contracts"
                className="flex items-center gap-3 p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <FileText className="h-5 w-5 text-robin-neon" />
                <span className="text-white">Contract Addresses</span>
              </Link>
              <a
                href="https://sepolia.arbiscan.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                <ExternalLink className="h-5 w-5 text-robin-neon" />
                <span className="text-white">Arbiscan Explorer</span>
              </a>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
            <h3 className="font-semibold text-robin-neon mb-2">📚 Need Help?</h3>
            <p className="text-sm text-neutral-400">
              If you have questions or need assistance, please open an issue on our GitHub repository or reach out to the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
