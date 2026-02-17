import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Droplets, Coins, Github, FileText, Code } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Subtle line pattern background - Robinhood style */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-4xl">
            {/* Main Headline */}
            <h1 className="text-7xl md:text-8xl font-bold text-white tracking-tight leading-[1.05] mb-8">
              Trade tokenized stocks on-chain
            </h1>

            {/* Subtitle */}
            <p className="text-2xl text-neutral-400 max-w-2xl mb-12 leading-relaxed">
              Decentralized AMM for real-world assets. Swap, earn, and stake—all trustless.
            </p>

            {/* CTAs */}
            <div className="flex gap-4">
              <Link
                href="/swap"
                className="inline-flex items-center gap-2 px-8 py-4 bg-robin-neon text-black rounded-full font-semibold hover:bg-[#00E006] transition-colors duration-200"
              >
                Launch App
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-colors duration-200"
              >
                View Demo
              </Link>
            </div>

            {/* Subtle sparkline decoration */}
            <div className="mt-16 opacity-20">
              <svg width="400" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 30 L50 25 L100 35 L150 20 L200 28 L250 15 L300 25 L350 18 L400 22" stroke="#00C805" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-20">
            <h2 className="text-5xl font-bold text-white mb-4">How it works</h2>
            <p className="text-xl text-neutral-400">Three steps to start trading</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <StepCard
              number="01"
              icon={<TrendingUp className="h-10 w-10 stroke-[1.5]" />}
              title="Swap"
              description="Exchange tokenized stocks instantly using our AMM. No order books, no waiting."
            />
            <StepCard
              number="02"
              icon={<Droplets className="h-10 w-10 stroke-[1.5]" />}
              title="Provide liquidity"
              description="Add liquidity to trading pairs and earn fees from every swap transaction."
            />
            <StepCard
              number="03"
              icon={<Coins className="h-10 w-10 stroke-[1.5]" />}
              title="Stake LP"
              description="Stake your LP tokens to earn additional RBS rewards and boost your returns."
            />
          </div>
        </div>
      </section>

      {/* Why RobinStock Section */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-20">
            <h2 className="text-5xl font-bold text-white mb-4">Why RobinStock</h2>
            <p className="text-xl text-neutral-400">Built for the future of finance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8 stroke-[1.5]" />}
              title="AMM trading"
              description="Constant product formula ensures fair pricing and instant swaps without order books."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 stroke-[1.5]" />}
              title="Transparent & verifiable"
              description="Built with OpenZeppelin standards. All contracts are open-source and verifiable on-chain."
            />
            <FeatureCard
              icon={<Coins className="h-8 w-8 stroke-[1.5]" />}
              title="Incentives"
              description="Earn trading fees as a liquidity provider and stake LP tokens for additional RBS rewards."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-robin-neon" />
                <span className="text-white font-bold text-xl">RobinStock</span>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Decentralized trading platform for tokenized real-world assets on Arbitrum.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <div className="flex flex-col gap-3 text-sm">
                <Link href="/swap" className="text-neutral-400 hover:text-robin-neon transition-colors">Swap</Link>
                <Link href="/liquidity" className="text-neutral-400 hover:text-robin-neon transition-colors">Liquidity</Link>
                <Link href="/stake" className="text-neutral-400 hover:text-robin-neon transition-colors">Stake</Link>
                <Link href="/dashboard" className="text-neutral-400 hover:text-robin-neon transition-colors">Dashboard</Link>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <div className="flex flex-col gap-3 text-sm">
                <a href="https://github.com/Cloude963/robinstock" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-robin-neon transition-colors inline-flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a href="#" className="text-neutral-400 hover:text-robin-neon transition-colors inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documentation
                </a>
                <a href="#" className="text-neutral-400 hover:text-robin-neon transition-colors inline-flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Contracts
                </a>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="pt-8 border-t border-white/5">
            <p className="text-neutral-600 text-sm text-center">
              Testnet demo. No real stocks custody in this prototype. For educational and demonstration purposes only.
            </p>
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
    <div className="group">
      <div className="mb-6">
        <div className="text-7xl font-bold text-white/5 mb-4">{number}</div>
        <div className="text-white mb-4">{icon}</div>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-neutral-400 leading-relaxed">{description}</p>
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
    <div className="group p-8 border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-300 bg-white/[0.01]">
      <div className="text-white mb-6">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-neutral-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
