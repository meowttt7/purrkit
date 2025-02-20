import { usePrivy } from "@privy-io/react-auth";

export function AuthButton() {
  const { login, logout, authenticated, user } = usePrivy();

  if (!authenticated) {
    return (
      <button
        onClick={login}
        className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
      >
        Connect Wallet
      </button>
    );
  }

  const address = user?.wallet?.address;
  return (
    <button
      onClick={logout}
      className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
    >
      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connected"}
    </button>
  );
} 