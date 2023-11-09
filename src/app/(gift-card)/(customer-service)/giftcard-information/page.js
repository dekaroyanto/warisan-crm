"use client";
import React from "react";

import { Input, Button } from "@nextui-org/react";

const giftCardInfo = () => {
  return (
    <div className="md:container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Gift Card Information
      </h1>
      <div className="w-full h-max py-5 px-14 mb-5">
        <div className="flex mb-4">
          <h1 className="self-center text-right font-medium mr-4 float-right">
            Card Number:
          </h1>

          <div>
            <Input
              aria-label="Card Number"
              placeholder="Card Number"
              labelPlacement="outside"
              className="col-span-2"
              type="number"
              isClearable
              size="sm"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-max bg-[#e0e0e0] rounded-xl py-5 px-14 mb-5">
        <Button color="primary">View</Button>
      </div>
    </div>
  );
};

export default giftCardInfo;
