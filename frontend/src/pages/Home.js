import React, { useState, useEffect } from "react";

import DisplayCampaigns from "../components/DisplayCampaigns";

const Home = ({state}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { signer, contract} = state;
  console.log(signer,contract);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await contract.getCampaigns();
    console.log(data);
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) 
    fetchCampaigns();
     }, [signer, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
