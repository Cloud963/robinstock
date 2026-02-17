import Link from "next/link";
import { ArrowRight, TrendingUp, Lock, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Trade Tokenized Stocks
              <br />
              Decentralized & Trustless
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              RobinStock brings traditional stock trading to DeFi. Swap, provide liquidity, and earn rewards on Arbitrum.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/swap"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Trading
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/liquidity"
                className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
              >
                Provide Liquidity
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why RobinStock?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8 text-blue-600" />}
              title="AMM Trading"
              description="Constant product formula ensures fair pricing and instant swaps without order books."
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8 text-blue-600" />}
              title="Secure & Audited"
              description="Built with OpenZeppelin contracts and best practices for maximum security."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-blue-600" />}
              title="Earn Rewards"
              description="Stake your LP tokens to earn RBS rewards and participate in protocol growth."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <StatCard title="Total Value Locked" value="$0" />
            <StatCard title="24h Volume" value="$0" />
            <StatCard title="Total Trades" value="0" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-xl mb-8 opacity-90">
            Connect your wallet and start trading tokenized stocks in seconds.
          </p>
          <Link
            href="/swap"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Launch App
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className="text-gray-600 dark:text-gray-400">{title}</div>
    </div>
  );
}
