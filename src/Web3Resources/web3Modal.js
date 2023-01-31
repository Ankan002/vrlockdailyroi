import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			rpc: {
				7630: "https://mainnet-rpc.vrblocksscan.io"
                // 97 : "https://data-seed-prebsc-1-s1.binance.org:8545/"
			}
		}
	},
	binancechainwallet: {
		package: true
	}
}

let web3Modal;
if (typeof window !== 'undefined') {
	web3Modal = new Web3Modal({
		network: "mainnet",
		cacheProvider: true,
		disableInjectedProvider: true,
		providerOptions
	});
}

export default web3Modal;
