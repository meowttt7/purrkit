export default function AddressBookPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-custom-white">Address Book</h1>
        <p className="text-custom-grey">Manage your frequently used addresses</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search addresses..."
            className="flex-1 rounded-lg bg-custom-light-grey px-4 py-2 text-custom-white placeholder:text-custom-grey"
          />
          <button className="rounded-lg bg-custom-mint px-6 py-2 font-medium text-custom-black hover:opacity-90">
            Add New
          </button>
        </div>

        <div className="rounded-lg border border-custom-light-grey p-4">
          <div className="space-y-4">
            {/* Sample address entry */}
            <div className="flex items-center justify-between rounded-lg bg-custom-light-grey p-4">
              <div>
                <h3 className="font-medium text-custom-white">Personal Wallet</h3>
                <p className="text-sm text-custom-grey">0x1234...5678</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg bg-custom-mint px-4 py-2 text-sm font-medium text-custom-black hover:opacity-90">
                  Edit
                </button>
                <button className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:opacity-90">
                  Delete
                </button>
              </div>
            </div>

            {/* Empty state */}
            <div className="text-center text-custom-grey">
              <p>No addresses saved yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 