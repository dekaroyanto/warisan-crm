import React, { useEffect, useState } from "react";
import { Container } from "@nextui-org/react";

const DateTimeComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const getCurrentDateTime = () => {
      const options = {
        // weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };

      const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
      const formattedDateTime = dateTimeFormat.format(new Date());

      setCurrentDateTime(formattedDateTime);
    };

    getCurrentDateTime();

    // No need for setInterval, as we're updating only once when the component mounts

    // Cleanup on component unmount
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  return <>Fetch Date: {currentDateTime}</>;
};

export default DateTimeComponent;
