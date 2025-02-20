export default function MultisenderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-custom-white">Batch Send</h1>
        <p className="text-custom-grey">Send tokens to multiple addresses at once</p>
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
          <h2 className="mb-4 text-lg font-semibold text-custom-white">Recipients</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-custom-grey">Upload CSV</label>
              <div className="flex gap-4">
                <input
                  type="file"
                  accept=".csv"
                  className="flex-1 rounded-lg bg-custom-light-grey px-4 py-2 text-custom-white file:mr-4 file:rounded-lg file:border-0 file:bg-custom-mint file:px-4 file:py-2 file:text-custom-black"
                />
                <button className="rounded-lg bg-custom-mint px-4 py-2 font-medium text-custom-black hover:opacity-90">
                  Download Template
                </button>
              </div>
              <p className="mt-2 text-xs text-custom-grey">
                CSV format: address,amount (one entry per line)
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm text-custom-grey">Recipients List</label>
              <textarea
                placeholder="Or paste addresses and amounts here..."
                className="h-32 w-full rounded-lg bg-custom-light-grey px-4 py-2 text-custom-white placeholder:text-custom-grey"
              />
            </div>
          </div>
        </div>

        <button className="w-full rounded-lg bg-custom-mint px-6 py-3 font-medium text-custom-black hover:opacity-90">
          Send to All
        </button>
      </div>
    </div>
  );
} 