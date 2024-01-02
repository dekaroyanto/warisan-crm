export const columns = [
  { label: "MO NUMBER", key: "mo_number" },
  { label: "MO DATE", key: "mo_date" },
  { label: "PO NUMBER", key: "po_number" },
  { label: "PO DATE", key: "po_date" },
  { label: "SUPLIER", key: "suplier" },
  { label: "STATUS", key: "status" },
  { label: "ACTIONS", key: "action" },
];

export const statusList = [
  { label: "ALL", value: "ALL", key: "ALL" },
  { label: "APPROVED", value: "APPROVED" },
  { label: "BARCODING", value: "BARCODING" },
  { label: "DRAFT", value: "DRAFT" },
  { label: "FOR APPROVAL", value: "FOR APPROVAL" },
  { label: "FULL", value: "FULL" },
  { label: "GENERATED", value: "GENERATED" },
  { label: "PARTIAL", value: "PARTIAL" },
];

export const criteriaList = [
  { label: "MO NUMBER", value: "mo_number" },
  { label: "PO NUMBER", value: "po_number" },
];

export const supplierList = [
  { label: "ID030 - Carefour", value: "ID030 - Carefour" },
  { label: "ID020 - Transmart", value: "ID020 - Transmart" },
  { label: "ID010 - Trans Snow", value: "ID010 - Trans Snow" },
];

export const cardType = [
  { label: "Choose Card..", value: "" },
  { label: "Voucher 500.000", value: "500000" },
  { label: "Voucher 200.000", value: "200000" },
  { label: "Voucher 100.000", value: "100000" },
];
