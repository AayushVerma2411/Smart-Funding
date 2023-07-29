import React from "react";
import { useState, useEffect } from "react";
import abi from "./contract/CrowdFunding.json";
import Sidebar from "./components/Sidebar";
import { Navbar } from "./components/Index";
import { Route, Routes } from "react-router-dom";
import CreateCampaign from "./pages/CreateCampaign";
import Home from "./pages/Home";
import CampaignDetails from "./pages/CampaignDetails";
import Profile from "./pages/Profile";

const { ethers } = require("ethers");

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    account: null,
  });
  //const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x46e08AE9f0d32d08dE3702809F16338B8b5dD693";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          const account = accounts[0];

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          //setAccount(account);
          setState({ provider, signer, contract, account });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  console.log(state);

  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar state={state} />

        <Routes>
          <Route path="/" element={<Home state={state} />} />
          <Route path="/profile" element={<Profile state={state} />} />
          <Route
            path="/create-campaign"
            element={<CreateCampaign state={state} />}
          />
          <Route
            path="/campaign-details/:id"
            element={<CampaignDetails state={state} />}
          />
         
        </Routes>
      </div>
    </div>
  );
}

export default App;
