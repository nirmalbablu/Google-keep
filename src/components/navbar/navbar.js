import React, { useRef, useState } from "react";
import Icon from "../Icons/icons";
import Keep from "../../Assets/keep.png";
import { NavbarWrapper } from "./navbarstyles";

const Navbar = () => {
  const [showClose, setshowClose] = useState(false);
  return (
    <NavbarWrapper>
      <div className="nav-title-wrapper">
        <Icon name="bar" />
        <img src={Keep} alt="keep-icon" />
        <span>Keep</span>
        <div className="search-wrapper">
          <Icon name="search" />
          <input onChange={e => setshowClose(e.target.value ? true : false)} />
          {showClose && <Icon name="close" />}
        </div>
      </div>
      <div className="icons-wrapper">
        <Icon name="undo" />
        <Icon name="list" />
        <Icon name="settings" />
        <Icon name="redo" />
        <Icon name="user" />
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
