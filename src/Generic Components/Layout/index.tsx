import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import "./index.scss";

export default function Layout() {
  return (
    <div className="page-container">
      <Sidebar />
      <Topbar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}
