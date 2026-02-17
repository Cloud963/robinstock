import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Droplets, Coins } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Subtle grain texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      
      {/* Subtle grid overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" 
           style={{
             backgroundImage: 'linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)',
             backgroundSize: '80px 80px'
           }}>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
              <span className="text-sm text-teal-300 font-medium">Live on Arbitrum Sepolia</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Trade Tokenized Stocks
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                On-Chain
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Decentralized stock trading powered by AMM. Swap, provide liquidity, and earn rewards.
            </p>

            {/* CTAs */}
            <div className="flex gap-4 justify-center pt-4">
              <Link
                href="/swap"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
              >
                Launch App
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white rounded-xl font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Three simple steps to start trading</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              icon={<TrendingUp className="h-8 w-8" />}
              title="Swap"
              description="Exchange tokenized stocks instantly using our AMM. No order books, no waiting."
            />
            <StepCard
              number="02"
              icon={<Droplets className="h-8 w-8" />}
              title="Liquidity"
              description="Provide liquidity to trading pairs and earn fees from every swap transaction."
            />
            <StepCard
              number="03"
              icon={<Coins className="h-8 w-8" />}
              title="Stake"
              description="Stake your LP tokens to earn additional RBS rewards and boost your returns."
            />
          </div>
        </div>
      </section>

      {/* Why RobinStock Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why RobinStock</h2>
            <p className="text-gray-400 text-lg">Built for the future of finance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<TrendingUp className="h-7 w-7" />}
              title="AMM Trading"
              description="Constant product formula ensures fair pricing and instant swaps without order books."
            />
            <FeatureCard
              icon={<Shield className="h-7 w-7" />}
              title="Best Practices"
              description="Built with OpenZeppelin standards and industry best-practice patterns for security."
            />
            <FeatureCard
              icon={<Coins className="h-7 w-7" />}
              title="Earn Rewards"
              description="Stake LP tokens to earn RBS rewards and participate in protocol growth."
            />
          </div>
        </div>
      </section>

      {/* Testnet Status Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/30 mb-6">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
              <span className="text-sm text-teal-300 font-medium">Testnet Demo</span>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Explore?</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Connect your wallet to Arbitrum Sepolia and start trading with test tokens.
            </p>
            
            <Link
              href="/swap"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
            >
              Seed Liquidity
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-teal-400" />
              <span className="text-white font-semibold">RobinStock</span>
            </div>
            
            <p className="text-gray-500 text-sm text-center">
              Testnet demo. No real stocks custody in this prototype.
            </p>
            
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/swap" className="hover:text-teal-400 transition-colors">Swap</Link>
              <Link href="/liquidity" className="hover:text-teal-400 transition-colors">Liquidity</Link>
              <Link href="/stake" className="hover:text-teal-400 transition-colors">Stake</Link>
              <Link href="/dashboard" className="hover:text-teal-400 transition-colors">Dashboard</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StepCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative p-8 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-teal-500/30 transition-all duration-300">
        <div className="text-5xl font-bold text-white/5 mb-4">{number}</div>
        <div className="text-teal-400 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
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
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative p-8 bg-white/[0.02] border border-white/10 rounded-xl hover:border-teal-500/30 transition-all duration-300">
        <div className="text-teal-400 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
      </div>
    </div>
  );
}
