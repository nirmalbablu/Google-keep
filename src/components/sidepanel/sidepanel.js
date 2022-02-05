import React from "react";
import styled from "styled-components";
import Icon from "../Icons/icons";

const SidePanelWrapper = styled.div`
  width: 14rem;
  height: calc(100vh - 3rem);
  box-shadow: 7px 11px 9px 3px grey;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
  .menu-item {
    display: flex;
    width: 100%;
    min-height: 3rem;
    justify-content: flex-start;
    align-items: center;
  }
  .menu-active {
    background-color: #feefc3;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  .icon {
    min-width: 3rem;
    padding-left: 10px;
  }
  //   .item-name {
  //   }
`;
const menuItems = [
  {
    name: "Notes",
    icon: "note",
    changeurl: "/notes"
  },
  {
    name: "Reminders",
    icon: "alert"
  },
  {
    name: "Edit labels",
    icon: "edit"
  },
  {
    name: "Archive",
    icon: "archive"
  },
  {
    name: "Trash",
    icon: "delete"
  }
];

const Sidepanel = () => {
  return (
    <SidePanelWrapper>
      {menuItems.map(({ name, icon }, index) => {
        return (
          <div
            className={`menu-item  ${name === "Notes" ? "menu-active" : ""}`}
            key={index}
            onClick={() => (window.location.href = name.toLocaleLowerCase())}
          >
            <div className="icon">
              <Icon name={icon} />
            </div>
            <div className="item-name">{name}</div>
          </div>
        );
      })}
    </SidePanelWrapper>
  );
};

export default Sidepanel;
