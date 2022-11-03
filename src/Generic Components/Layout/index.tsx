import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./index.scss";

export default function Layout() {
  return (
    <div>
      <Sidebar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}
