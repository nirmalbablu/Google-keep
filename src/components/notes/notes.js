import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Icon from "../Icons/icons";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { useMutation } from "@apollo/client";
import { updateTask } from "../../graphql";
import Model from "../Model/model";

const ModalNote = styled.div`
  width: 40%;
  height: 30%;
  background-color: white;
`;

const NoteBox = styled.div`
  min-width: 18rem;

  // max-width: 18rem;
  border: 1px solid rgb(128, 128, 128, 0.3);
  background-color: ${props => (props.color ? props.color : "white")};
  border-radius: 5px;
  box-shadow: 3px 4px 5px 2px grey;
  display: flex;
  flex-direction: column;
  gap: 7px;
  height: max-content;
  opacity: 0.8;
  padding: 10px;
  .note-icons {
    display: flex;
    justify-content: space-between;
  }
  .inputs:first-child {
    width: 95%;
  }
  .inputs {
    border: none;
    outline: none;
    font-size: 16px;
    word-break: break-all;
  }
  .wrap {
    display: flex;
  }
  :hover {
    opacity: 1;
    box-shadow: 3px 4px 5px 2px rgba(0, 0, 0, 0.7);
  }
`;

const ModalNoteBox = styled(NoteBox)`
  width: 100% !important;
  height: 100% !important;
  // background-color: red;
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

const Notes = ({
  title = "Title",
  description = "description",
  color = "white",
  id = "",
  isPinned = false
}) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [updatetask] = useMutation(updateTask);
  const deleteNote = useCallback(
    async (type = "delete") => {
      let data =
        type === "delete"
          ? {
              isDeleted: true
            }
          : type === "pinned"
          ? {
              isPinned: !isPinned
            }
          : {
              isArchived: true
            };

      updatetask({
        variables: {
          id,
          body: data
        },
        optimisticResponse: {
          __typename: "Mutation",
          updateTask: {
            __typename: "Task",
            _id: Math.random(),
            isDeleted: data?.isDeleted || false,
            isArchived: data?.isArchived || false,
            isPinned: data?.isPinned || false
          }
        },
        update: (store, { data: { updateTask } }) => {
          if (updateTask.isDeleted) {
            store.modify({
              id: store.identify({ id: id, __typename: "Task" }),
              fields: {
                isDeleted() {
                  return updateTask.isDeleted;
                }
              }
            });
          } else if (updateTask.isArchived) {
            store.modify({
              id: store.identify({ id: id, __typename: "Task" }),
              fields: {
                isArchived() {
                  return updateTask.isArchived;
                }
              }
            });
          } else {
            store.modify({
              id: store.identify({ id: id, __typename: "Task" }),
              fields: {
                isPinned() {
                  return updateTask.isPinned;
                }
              }
            });
          }
        }
      });
    },
    [id, updatetask]
  );
  return (
    <>
      <NoteBox color={color} onClick={() => setOpenModal(true)}>
        <div className="wrap">
          <div className="inputs">{title}</div>
          <Icon
            name="pin"
            toolTipText={isPinned ? "Unpin" : "Pin"}
            color={isPinned ? "black" : "grey"}
            onClick={() => deleteNote("pinned")}
          />
        </div>
        <div className="inputs">{description}</div>
        <div className="note-icons">
          <Icon name="alert" />
          <Icon name="invite" />
          <Icon name="atom" />
          <Icon name="image" />
          <Icon name="archive" onClick={() => deleteNote("archive")} />

          <Dropdown isOpen={open} toggle={() => setOpen(prev => !prev)}>
            <DropdownToggle>
              <Icon name="moreV" toolTipText="more" />
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
      <Model isOpen={openModal} setIsOpen={setOpenModal}>
        <ModalNote onClick={e => e.stopPropagation()}>
          <ModalNoteBox color={color} onClick={() => setOpenModal(true)}>
            <div className="wrap">
              <div className="inputs" contentEditable>
                {title}
              </div>
              <Icon
                name="pin"
                toolTipText={isPinned ? "Unpin" : "Pin"}
                color={isPinned ? "black" : "grey"}
                onClick={() => deleteNote("pinned")}
              />
            </div>
            <div className="inputs" contentEditable>
              {description}
            </div>
            <div className="note-icons">
              <Icon name="alert" />
              <Icon name="invite" />
              <Icon name="atom" />
              <Icon name="image" />
              <Icon name="archive" onClick={() => deleteNote("archive")} />

              <Dropdown isOpen={open} toggle={() => setOpen(prev => !prev)}>
                <DropdownToggle>
                  <Icon name="moreV" toolTipText="more" />
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
          </ModalNoteBox>
        </ModalNote>
      </Model>
    </>
  );
};

export default Notes;
