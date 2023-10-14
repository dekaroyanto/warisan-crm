import Header from "/src/components/header";
import Dropdown from "../../components/dropdown";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <div className="sticky top-0 w-full">
        <Header />
        <Dropdown />
      </div>
      {children}
    </section>
  );
}
