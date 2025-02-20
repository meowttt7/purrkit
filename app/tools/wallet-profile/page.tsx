export default function WalletProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-custom-white">Wallet Profile</h1>
        <p className="text-custom-grey">View detailed information about any wallet</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter wallet address"
            className="flex-1 rounded-lg bg-custom-light-grey px-4 py-2 text-custom-white placeholder:text-custom-grey"
          />
          <button className="rounded-lg bg-custom-mint px-6 py-2 font-medium text-custom-black hover:opacity-90">
            Search
          </button>
        </div>
        
        {/* Results will be added here */}
        <div className="rounded-lg border border-custom-light-grey p-4">
          <p className="text-custom-grey">Enter a wallet address to view its details</p>
        </div>
      </div>
    </div>
  );
} 