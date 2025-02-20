import Link from "next/link";
import { IconType } from "react-icons";
import {
  FaWallet,
  FaExchangeAlt,
  FaAddressBook,
  FaBan,
  FaUserShield,
  FaCode,
  FaLock,
  FaPaperPlane,
  FaRandom,
  FaUsers,
} from "react-icons/fa";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  path: string;
}

const tools: Tool[] = [
  {
    id: "wallet-profile",
    name: "Wallet Profile",
    description: "View detailed information about any wallet",
    icon: FaWallet,
    path: "/tools/wallet-profile",
  },
  {
    id: "send-token",
    name: "Send Tokens",
    description: "Send tokens (FT/NFT) to any address",
    icon: FaPaperPlane,
    path: "/tools/send-token",
  },
  {
    id: "wallet-migrator",
    name: "Wallet Migrator",
    description: "Migrate tokens between wallets",
    icon: FaRandom,
    path: "/tools/wallet-migrator",
  },
  {
    id: "batch-send",
    name: "Batch Send",
    description: "Send tokens to multiple addresses at once",
    icon: FaUsers,
    path: "/tools/batch-send",
  },
  {
    id: "swap-bridge",
    name: "Swap & Bridge",
    description: "Swap tokens and bridge assets",
    icon: FaExchangeAlt,
    path: "/tools/swap-bridge",
  },
  {
    id: "address-book",
    name: "Address Book",
    description: "Manage your frequently used addresses",
    icon: FaAddressBook,
    path: "/tools/address-book",
  },
  {
    id: "revoke",
    name: "Token Approvals",
    description: "View and revoke token approvals",
    icon: FaBan,
    path: "/tools/revoke",
  },
  {
    id: "multisig",
    name: "MultiSafe",
    description: "Create and manage multisig wallets",
    icon: FaUserShield,
    path: "/tools/multisig",
  },
  {
    id: "contract",
    name: "Contract Interaction",
    description: "Interact with smart contracts",
    icon: FaCode,
    path: "/tools/contract",
  },
  {
    id: "vesting",
    name: "Token Vesting",
    description: "Create and manage token vesting schedules",
    icon: FaLock,
    path: "/tools/vesting",
  },
];

export function ToolGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tools.map((tool) => (
        <Link
          key={tool.id}
          href={tool.path}
          className="group flex flex-col rounded-lg border border-gray-200 p-4 transition-all hover:border-primary hover:shadow-md dark:border-gray-800"
        >
          <div className="mb-2 flex items-center gap-2">
            <tool.icon className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">{tool.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{tool.description}</p>
        </Link>
      ))}
    </div>
  );
} 