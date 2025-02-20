# 🐱 PurrKit

PurrKit is a comprehensive toolkit for Hyperliquid EVM users, providing a collection of essential tools for managing wallets, tokens, and smart contract interactions.

## 🛠️ Features

- **🔍 Wallet Profile**
  - View detailed wallet information
  - Track token balances and transactions
  - Monitor wallet activity

- **💸 Send Tokens**
  - Send FT/NFT tokens to any address
  - Support for all ERC20/ERC721/ERC1155 tokens
  - Gas estimation and transaction preview

- **👥 Batch Send (Multisender)**
  - Send tokens to multiple addresses in one transaction
  - CSV upload support
  - Bulk transaction preview and gas estimation

- **📚 Address Book**
  - Save and manage frequently used addresses
  - Label and categorize addresses
  - Quick access during transactions

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Privy account for wallet integration

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/purrkit.git
cd purrkit
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.development` file in the root directory:
```env
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_HYPERLIQUID_RPC_URL=your_rpc_url
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Web3**: 
  - [Wagmi](https://wagmi.sh/) - React Hooks for Ethereum
  - [Privy](https://privy.io/) - Wallet and Authentication
  - [Viem](https://viem.sh/) - Ethereum Interactions
- **UI Components**: 
  - [Radix UI](https://www.radix-ui.com/)
  - [Headless UI](https://headlessui.com/)

## 🌈 Color Scheme

The project uses a custom green-focused color palette:

- **Dark Green** (`#0F1A1F`) - Page/component backgrounds
- **Mint Green** (`#50D2C1`) - Primary actions, highlights
- **Black** (`#04060C`) - Text over mint green
- **White** (`#F6FEFD`) - Text over dark backgrounds
- **Grey** (`#949E9C`) - Secondary text
- **Light Grey** (`#3B4241`) - Borders, separators
- **Dark Grey** (`#222428`) - Secondary backgrounds

## 📁 Project Structure

```
purrkit/
├── app/                # Next.js app directory
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   └── tools/         # Tool pages
├── components/        # Reusable components
├── styles/           # Global styles
└── public/           # Static assets
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_PRIVY_APP_ID` | Privy App ID for wallet integration | Yes |
| `NEXT_PUBLIC_HYPERLIQUID_RPC_URL` | Hyperliquid RPC URL | Yes |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Smold.app](https://smold.app/) - Inspiration for the project
- [Hyperliquid](https://hyperliquid.xyz/) - EVM Infrastructure
