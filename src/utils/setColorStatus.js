import { Chip } from "@nextui-org/react";

export default function setColorStatus(e) {
  // e = status data
  let color = "";

  if (e == "APPROVED" || e == "FULL") {
    color = "bg-[#007A61]";
  } else if (e == "SUBMITTED" || e == "FOR APPROVAL" || e == "PARTIAL") {
    color = "bg-[#F78022]";
  } else if (e == "DRAFT") {
    color = "bg-[#5B7282]";
  } else if (e == "REJECTED") {
    color = "bg-[#CF1E30]";
  } else if (e == "DEACTIVATED") {
    color = "bg-[#CF1E30]";
  } else if (e == "BARCODING" || e == "GENERATED") {
    color = "bg-[#1D4ED8]";
  }

  return (
    <Chip
      className="capitalize"
      size="sm"
      variant="light"
      classNames={{
        base: color,
        content: "text-white font-medium text-xs",
      }}
    >
      {e}
    </Chip>
  );
}
