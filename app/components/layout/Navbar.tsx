"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TrendingUp } from "lucide-react";

const navigation = [
  { name: "Swap", href: "/swap" },
  { name: "Liquidity", href: "/liquidity" },
  { name: "Stake", href: "/stake" },
  { name: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-white/5 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-robin-neon" />
            <span className="text-xl font-bold text-white">RobinStock</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-robin-neon/10 text-robin-neon"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Connect Wallet Button */}
          <div>
            <ConnectButton />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-white/5">
        <div className="flex justify-around py-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm rounded-lg ${
                  isActive
                    ? "bg-robin-neon/10 text-robin-neon"
                    : "text-neutral-400"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
