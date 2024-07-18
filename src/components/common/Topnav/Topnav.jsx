import {React, useState} from "react";
import "./Topnav.scss";
import language from "../../../assets/language.png";
import mode from "../../../assets/mode.png";
import theme from "../../../assets/theme.png";
import notification from "../../../assets/notification.png";
import admin from "../../../assets/admin.png";

function Topnav() {
  // const [hideLogout, setHideLogout] = useState(true);
  return (
    <header>
      <div className="header-search-bar">
        <input
          type="text"
          id="searchBar"
          // onkeyup="utilsObj.updateSearchFilter(event)"
          placeholder="Search (ctrl+/)"
        />
      </div>
      <div className="header-icons">
        <img src={language} alt="language image" />
        <img src={mode} alt="view image" />
        <img src={theme} alt="theme image" />
        <img src={notification} alt="notofications image" />
        <div className="user-info-wrapper">
          <img src={admin} alt="admin image" />
          <div className="user-info">
            <p>John Abraham</p>
            <p className="role">Admin</p>
          </div>
          <i className="fa-solid fa-chevron-down down-arrow" />
          {/* onClick={ () => setHideLogout(!hideLogout)} */}
          {/* <div className = {hideLogout ? 'hide':'show logout'}>LogOut</div> */}
        </div>
      </div>
    </header>
  );
}

export default Topnav;
