import { AuthButton } from "@/components/auth-button";

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-custom-dark-green">
      <header className="border-b border-custom-light-grey">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <a href="/" className="text-xl font-bold text-custom-mint">
            PurrKit
          </a>
          <AuthButton />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-custom-dark-grey p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 