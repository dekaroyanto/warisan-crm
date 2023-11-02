import { Chip } from "@nextui-org/react";

export default function setColorStatus(e) {
  // e = status data
  let color = "";

  if (
    e == "APPROVED" ||
    e == "VERIFIED" ||
    e == "FULL" ||
    e == "TRANSFERRED OUT"
  ) {
    color = "bg-[#007A61]";
  } else if (
    e == "SUBMITTED" ||
    e == "FOR APPROVAL" ||
    e == "FIRST APPROVAL" ||
    e == "SECOND APPROVAL" ||
    e == "PARTIAL" ||
    e == "FOR TRANSFER OUT"
  ) {
    color = "bg-[#F78022]";
  } else if (e == "DRAFT" || e == "INCOMPLETE") {
    color = "bg-[#5B7282]";
  } else if (e == "REJECTED") {
    color = "bg-[#CF1E30]";
  } else if (e == "DEACTIVATED") {
    color = "bg-[#CF1E30]";
  } else if (e == "BARCODING" || e == "GENERATED" || e == "IN TRANSIT") {
    color = "bg-[#1D4ED8]";
  }

  return (
    <Chip
      className="capitalize"
      size="sm"
      variant="light"
      classNames={{
        base: color,
        content: "text-white font-medium text-xs w-max",
      }}
    >
      {e}
    </Chip>
  );
}
