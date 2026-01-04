import { createPublicClient, createWalletClient, custom, http } from "viem";
import { QIE_TESTNET } from "@/config/contract";

export const publicClient = createPublicClient({
  chain: {
    id: 1983,
    name: "QIE Testnet",
    nativeCurrency: {
      name: "QIE",
      symbol: "QIE",
      decimals: 18,
    },
    rpcUrls: {
      default: { http: [QIE_TESTNET.rpcUrl] },
    },
  },
  transport: http(QIE_TESTNET.rpcUrl),
});

export const getWalletClient = () => {
  // ✅ Safe runtime guard
  if (typeof window === "undefined") {
    throw new Error("Wallet client can only be used in the browser");
  }

  if (!window.ethereum) {
    throw new Error("Ethereum provider not found");
  }

  return createWalletClient({
    chain: publicClient.chain,
    transport: custom(window.ethereum),
  });
};
