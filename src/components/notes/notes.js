import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Icon from "../Icons/icons";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const NoteBox = styled.div`
  min-width: 18rem;
  border: 1px solid rgb(128, 128, 128, 0.3);
  background-color: ${props => (props.color ? props.color : "white")};
  border-radius: 5px;
  box-shadow: 3px 4px 5px 2px grey;
  display: flex;
  flex-direction: column;
  height: max-content;
  padding: 10px;
  .note-icons {
    display: flex;
    justify-content: space-between;
  }
  input {
    border: none;
    outline: none;
  }
`;
const DropdownMenuStyle = styled(DropdownMenu)`
  display: ${props => (props.open ? "flex" : "none")};
  flex-direction: column;
  border: 1px solid rgb(128, 128, 128, 0.3);
  border-radius: 5px;
  padding: 5px;
  background-color: white;
`;
const DropdownItemStyle = styled(DropdownItem)`
  border: none;
  padding: 8px;
  background-color: white;

  :hover {
    background-color: grey;
    border-radius: 5px;
    color: white;
  }
`;
const StyleModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
`;
const Notes = ({
  title = "Title",
  description = "description",
  color = "white",
  id = "",
  setRefetch = () => {}
}) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const deleteNote = useCallback(
    async (type = "delete") => {
      let data =
        type === "delete"
          ? {
              isDeleted: true
            }
          : {
              isArchived: true
            };
      try {
        let result = await Axios.patch(`/tasks/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(result);
        setRefetch(prev => !prev);
      } catch (e) {
        console.error(e);
      }
    },
    [id, setRefetch]
  );
  return (
    <>
      <NoteBox color={color} onClick={() => setShowModal(true)}>
        <input defaultValue={title} />
        <input defaultValue={description} />
        <div className="note-icons">
          <Icon name="alert" />
          <Icon name="invite" />
          <Icon name="atom" />
          <Icon name="image" />
          <Icon name="archive" onClick={() => deleteNote("archive")} />

          <Dropdown isOpen={open} toggle={() => setOpen(prev => !prev)}>
            <DropdownToggle>
              <Icon name="moreV" />
            </DropdownToggle>
            <DropdownMenuStyle open={open}>
              <DropdownItemStyle onClick={() => deleteNote()}>
                Delete Note
              </DropdownItemStyle>
              <DropdownItemStyle>Add Drawing</DropdownItemStyle>
              <DropdownItemStyle>Make a copy</DropdownItemStyle>
              <DropdownItemStyle>Show checkboxes</DropdownItemStyle>
              <DropdownItemStyle>Copy to Google docs</DropdownItemStyle>
            </DropdownMenuStyle>
          </Dropdown>
        </div>
      </NoteBox>
      {/* <StyleModal isOpen={showModal} toggle={() => setShowModal(false)}>
        <NoteBox color={color}>
          <input defaultValue={title} />
          <input defaultValue={description} />
          <div className="note-icons">
            <Icon name="alert" />
            <Icon />
            <Icon />
            <Icon name="image" />
            <Icon name="archive" onClick={() => deleteNote("archive")} />

            <Dropdown isOpen={open} toggle={() => setOpen(prev => !prev)}>
              <DropdownToggle>
                <Icon name="moreV" />
              </DropdownToggle>
              <DropdownMenuStyle open={open}>
                <DropdownItemStyle onClick={deleteNote}>
                  Delete Note
                </DropdownItemStyle>
                <DropdownItemStyle>Add Drawing</DropdownItemStyle>
                <DropdownItemStyle>Make a copy</DropdownItemStyle>
                <DropdownItemStyle>Show checkboxes</DropdownItemStyle>
                <DropdownItemStyle>Copy to Google docs</DropdownItemStyle>
              </DropdownMenuStyle>
            </Dropdown>
          </div>
        </NoteBox>
      </StyleModal> */}
    </>
  );
};

export default Notes;
