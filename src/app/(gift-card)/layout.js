import Header from "@/components/header";
import Dropdown from "@/components/dropdown";
import { ToastContainer, toast } from "react-toastify";

export const metadata = {
  title: "CRM - Gift Card",
  description: "Generated by create next app",
};

export default function GiftCardLayout({ children }) {
  return (
    <section>
      <ToastContainer position="top-center" />

      <div className="sticky top-0 z-50">
        <Header />
        <Dropdown />
      </div>
      {children}
    </section>
  );
}
