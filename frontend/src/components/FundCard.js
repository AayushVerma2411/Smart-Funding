import React from "react";

import { useNavigate } from "react-router-dom";

import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";
import bigInt from "big-integer";

const FundCard = ({ campaign }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // console.log(campaign);
    // console.log(555555555555555555)
    // console.log(campaign.title);
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  const hex_to_int = (hexString) => {
    const parsedNumber = parseInt(hexString, 32);

    // Step 2: Convert the parsed number to a BigInt object
    const bigNumber = bigInt(parsedNumber);
    // console.log(bigNumber);

    // Step 3: Convert the BigInt object to a regular integer (Number)
    const integerValue = Number(bigNumber);
    // console.log(integerValue)
    return integerValue;
  };
  const hex_to_int_date = (hexString) => {
    const parsedNumber = parseInt(hexString, 10);

    // Step 2: Convert the parsed number to a BigInt object
    const bigNumber = bigInt(parsedNumber);
    // console.log(bigNumber);

    // Step 3: Convert the BigInt object to a regular integer (Number)
    const integerValue = Number(bigNumber);
    // console.log(integerValue)
    return integerValue;
  };

  const owner = campaign.owner;
  const image = campaign.image;
  const title = campaign.title;
  const description = campaign.description;

  const amountCollected = hex_to_int(campaign.amountCollected);

  const target = hex_to_int(campaign.target);
  const deadline = hex_to_int_date(campaign.deadline);
  console.log(deadline);
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleNavigate}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        {/* <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            Education
          </p>
        </div> */}

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
