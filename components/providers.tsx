import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { hyperliquid } from "wagmi/chains";
import { http } from "viem";

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [hyperliquid],
  transports: {
    [hyperliquid.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        loginMethods: ["wallet"],
        appearance: {
          theme: "light",
          accentColor: "#50D2C1", // Mint green
          showWalletLoginFirst: true,
        },
        supportedChains: [hyperliquid],
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
} 