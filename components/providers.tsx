import { PrivyProvider } from "@privy-io/react-auth";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, WagmiProvider } from "wagmi";
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
          accentColor: "#FF69B4", // Pink color for PurrKit
          showWalletLoginFirst: true,
        },
        supportedChains: [hyperliquid],
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <PrivyWagmiConnector>{children}</PrivyWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
} 