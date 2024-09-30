import { useState } from "react";
import { injectedWalletProvider } from "../hooks/WalletHook";

const WalletScreener = () => {

    const { account, balance, network, error, connectWallet, fetchBalance } =
      injectedWalletProvider();
    const [address, setAddress] = useState("");

    const handleInputChange = (e) => {
        setAddress(e.target.value);
    };

    const handleFetchBalance = () => {
        if (address) {
            fetchBalance(address);
        }
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white relative p-6">
        <h1 className="text-3xl font-bold mb-6">Wallet Screener</h1>

        {!account ? (
          <button
            onClick={connectWallet}
            className="bg-red-700 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-600 transition duration-200 mb-6"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
            <p className="text-gray-100 text-lg font-semibold mb-2">
              Connected Account:{" "}
              <span className="text-white font-normal">{account}</span>
            </p>
            <p className="text-gray-100 text-lg font-semibold mb-2">
              Network:{" "}
              <span className="text-white font-normal">
                {network
                  ? `${network.name} (${network.chainId})`
                  : "Unknown network"}
              </span>
            </p>
            <p className="text-gray-100 text-lg font-semibold">
              Balance:{" "}
              <span className="text-white font-normal">
                {balance ? `${balance} ETH` : "Loading..."}
              </span>
            </p>
          </div>
        )}

        {error && (
          <p className="text-red-500 font-medium mb-4">
            Error Message: {error}
          </p>
        )}

        <div className="flex flex-col bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-gray-100 text-2xl font-semibold mb-4">
            Check Address Balance
          </h2>
          <input
            type="text"
            value={address}
            onChange={handleInputChange}
            placeholder="Enter your address"
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleFetchBalance}
            className="bg-red-700 text-white font-bold py-2 px-4 w-full rounded-lg hover:bg-red-600 transition duration-200"
          >
            Get Balance
          </button>
        </div>
      </div>
    );
}

export default WalletScreener