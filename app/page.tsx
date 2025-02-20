import { AuthButton } from "@/components/auth-button";
import { ToolGrid } from "@/components/tool-grid";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="mb-2 text-4xl font-bold">PurrKit</h1>
        <p className="mb-4 text-lg text-muted-foreground">
          A collection of useful tools for Hyperliquid EVM users
        </p>
        <AuthButton />
      </div>
      <ToolGrid />
    </main>
  );
} 