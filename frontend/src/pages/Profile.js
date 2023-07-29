import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components/Index";

const Profile = ({ state }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { contract } = state;
  const { account } = state;

  const getUserCampaign = async () =>
   {
    const allCampaigns = await contract.getCampaigns();
    console.log(allCampaigns);
    console.log(typeof allCampaigns);
    console.log(allCampaigns.length);
    console.log(allCampaigns[0].owner.toLowerCase());
    console.log(account);

    const filteredCampaigns = [];

    for (let i = 0 ; i < allCampaigns.length ; i++)
     {
      let text1 = allCampaigns[i].owner.toLowerCase();
      let text2 = account;
      let result = text1.localeCompare(text2);
      if (result === 0) {
        filteredCampaigns.push(allCampaigns[i])
      }
    }
    
    console.log(filteredCampaigns);
    return filteredCampaigns;
    
  };

  const fetchCampaigns = async () => 
  {
    setIsLoading(true);
    const data = await getUserCampaign();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => 
  {
    if (contract) fetchCampaigns();
  }, [account, contract]);

  return (
    <DisplayCampaigns
      title="My Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
