export default function SendTokenPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-custom-white">Send Tokens</h1>
        <p className="text-custom-grey">Send tokens (FT/NFT) to any address</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-custom-light-grey p-4">
          <h2 className="mb-4 text-lg font-semibold text-custom-white">Token Selection</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-custom-grey">Token Type</label>
              <select className="w-full rounded-lg bg-custom-light-grey px-4 py-2 text-custom-white">
                <option value="ft">Fungible Token (FT)</option>
                <option value="nft">Non-Fungible Token (NFT)</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-custom-grey">Select Token</label>
              <input
                type="text"
                placeholder="Search tokens..."
                className="w-full rounded-lg bg-custom-light-grey px-4 py-2 text-custom-white placeholder:text-custom-grey"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-custom-light-grey p-4">
          <h2 className="mb-4 text-lg font-semibold text-custom-white">Recipient</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-custom-grey">Recipient Address</label>
              <input
                type="text"
                placeholder="Enter recipient address"
                className="w-full rounded-lg bg-custom-light-grey px-4 py-2 text-custom-white placeholder:text-custom-grey"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-custom-grey">Amount</label>
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full rounded-lg bg-custom-light-grey px-4 py-2 text-custom-white placeholder:text-custom-grey"
              />
            </div>
          </div>
        </div>

        <button className="w-full rounded-lg bg-custom-mint px-6 py-3 font-medium text-custom-black hover:opacity-90">
          Send Token
        </button>
      </div>
    </div>
  );
} 