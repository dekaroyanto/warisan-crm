export const dummyData = [
  {
    id: 1,
    last_update_date: "31-10-2023",
    order_date: "31-10-2023",
    company: "HRD HO",
    store: "10007",
    payment_amount: "0",
    sales_order_amount: "500.000",
    type: "INTERNAL ORDER",
    status: "FOR ACTIVATION",
  },
  {
    id: 2,
    last_update_date: "31-10-2023",
    order_date: "31-10-2023",
    company: "HRD HO",
    store: "10007",
    payment_amount: "0",
    sales_order_amount: "500.000",
    type: "INTERNAL ORDER",
    status: "SOLD",
  },
  {
    id: 3,
    last_update_date: "31-10-2023",
    order_date: "31-10-2023",
    company: "HRD HO",
    store: "10007",
    payment_amount: "0",
    sales_order_amount: "500.000",
    type: "INTERNAL ORDER",
    status: "APPROVED",
  },

  {
    id: 4,
    last_update_date: "1-11-2023",
    order_date: "1-11-2023",
    company: "HRD HO",
    store: "10007",
    payment_amount: "0",
    sales_order_amount: "500.000",
    type: "INTERNAL ORDER",
    status: "ALLOCATED",
  },
];

export const columns = [
  {
    key: "id",
    label: "SALES ORDER ID",
  },
  {
    key: "last_update_date",
    label: "LAST UPDATE DATE",
  },
  {
    key: "order_date",
    label: "ORDER DATE",
  },
  {
    key: "company",
    label: "COMPANY",
  },
  {
    key: "store",
    label: "STORE",
  },
  {
    key: "payment_amount",
    label: "PAYMENT AMOUNT",
  },
  {
    key: "sales_order_amount",
    label: "SALES ORDER AMOUNT",
  },
  {
    key: "type",
    label: "TYPE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export const fieldList = [
  { label: "Company", value: "company" },
  { label: "Contact Person", value: "contact_person" },
  { label: "Sales Order No", value: "sales_order_no" },
];

export const statusList = [
  { label: "APPROVED", value: "APPROVED" },
  { label: "For Approval", value: "For Approval" },
  { label: "Draft", value: "Draft" },
  { label: "Allocated", value: "Allocated" },
  { label: "Partially Alllocated", value: "Partially Allocated" },
  { label: "For Pickup", value: "For Pickup" },
  { label: "Payment Approval", value: "Payment Approval" },
  { label: "For Activation", value: "For Activation" },
  { label: "Sold", value: "Sold" },
  { label: "Canceled", value: "canceled" },
];

export const typeList = [
  { label: "B2B Sales", value: "B2B Sales" },
  { label: "B2B Advance Sales", value: "B2B Advance Sales" },
  { label: "Yearly Discount", value: "Yearly Discount" },
  { label: "Internal Order", value: "Internal Order" },
  { label: "Replacement", value: "Replacement" },
  { label: "Voucher", value: "Voucher" },
];

export const typeForm = [
  { label: "B2B Sales", value: "b2b_sales" },
  { label: "Internal Order", value: "internal_order" },
  { label: "Replacement", value: "replacement" },
];
