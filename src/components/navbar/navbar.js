import React, { useContext, useRef, useState } from "react";
import Icon from "../Icons/icons";
import Keep from "../../Assets/keep.png";
import { NavbarWrapper } from "./navbarstyles";
import { context } from "../../pages/Dashboard/dashboard";

const Navbar = () => {
  const { search, setSearch } = useContext(context);
  const searchRef = useRef();
  return (
    <NavbarWrapper>
      <div className="nav-title-wrapper">
        <Icon name="bar" />
        <img src={Keep} alt="keep-icon" />
        <span>Keep</span>
        <div className="search-wrapper">
          <Icon name="search" />
          <input
            ref={searchRef}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Escape") {
                setSearch("");
                searchRef.current.focus();
              }
            }}
            value={search}
          />
          {search && (
            <Icon
              name="close"
              onClick={() => {
                setSearch("");
                searchRef.current.focus();
              }}
            />
          )}
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
