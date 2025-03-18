import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="layoutContainer">
      {/* <Sidebar /> */}
      <div className="mainContent">
        {/* <Navbar /> */}
        <div className="pageContent">{children}</div>
      </div>
    </div>
  );
}