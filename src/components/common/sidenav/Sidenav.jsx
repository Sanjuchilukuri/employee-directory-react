import React from "react";
import tezoLogo from "../../../assets/tezoLogo.svg";
import sidebarIcon from "../../../assets/sidebar-icon.svg";
import tezoMinimizedLogo from "../../../assets/tezologo-minimize.svg";
import Navigation from "./navigation/Navigation";
import Update from "./update/Update";
import "./Sidenav.scss";
import { useState } from "react";

function Sidenav() {
  const [collapse, setCollapse] = useState(false);

  return (
    <aside
      className={collapse ? "siderbar-collapse sidebar" : "sidebar"}
      id="aside"
    >
      <div className="logo">
        <img
          id="companyLogo"
          src={collapse ? tezoMinimizedLogo : tezoLogo}
          alt="Logo-image"
        />
        <img
          id="sidebarIcon"
          src={sidebarIcon}
          alt="sidebar icon"
          onClick={() => setCollapse(!collapse)}
        />
      </div>
      <div className="sidenav-content">
        <Navigation title={collapse ? "ROLE" : "ROLE/USER MANAGEMENT"} />
        <Update />
      </div>
    </aside>
  );
}

export default Sidenav;
