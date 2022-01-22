import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Icon from "../Icons/icons";
import Axios from "axios";
const TaskBarWrapper = styled.div`
  width: 40rem;
  height: 3rem;
  padding: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
  box-shadow: 7px 11px 9px 3px grey;
  input {
    width: 100%;
    padding: 5px;
    border: none;
    outline: none;
  }
  .icons {
    display: flex;
    gap: 25px;
  }
`;
const MoreAddTaskBar = styled.div`
  width: 40rem;
  height: max-content;
  padding: 18px 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  box-shadow: 7px 11px 9px 3px grey;
  .inline-item {
    display: flex;
    width: 100%;
    align-items: center;
  }
  input {
    width: 100%;
    padding: 5px;
    border: none;
    outline: none;
  }
  .inline-icon-button {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .more-inline-icons {
    width: auto;
    display: flex;
    gap: 15px;
  }
`;
const TaskInputBar = ({ setRefetch = () => {} }) => {
  const [addTask, setAddTask] = useState(false);
  const titleRef = useRef();
  const DescriptionRef = useRef();
  const handleAddNote = useCallback(async () => {
    const { value } = titleRef.current;
    const { value: DescValue } = DescriptionRef.current;

    let data = {
      title: value,
      description: DescValue,
      color: "white"
    };
    let result = await Axios.post("/tasks", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")} `
      }
    });
    setRefetch(prev => !prev);
    console.log(result);
  }, [setRefetch]);

  return (
    <>
      {!addTask ? (
        <TaskBarWrapper onClick={() => setAddTask(prev => !prev)}>
          <input placeholder="Take a note..." />
          <div className="icons">
            <Icon name="checkBox" />
            <Icon name="edit" />
            <Icon name="image" />
          </div>
        </TaskBarWrapper>
      ) : (
        <MoreAddTaskBar>
          <div className="inline-item">
            <input placeholder="Title" ref={titleRef} />
            <Icon name="pin" />
          </div>
          <input placeholder="Take a note..." ref={DescriptionRef} />
          <div className="inline-icon-button">
            <div className="more-inline-icons">
              <Icon />
              <Icon />
              <Icon />
              <Icon name="image" />
              <Icon name="archive" />
              <Icon name="moreV" />
              <Icon name="undo" />
              <Icon name="redo" />
            </div>
            <span
              onClick={() => {
                titleRef.current.value &&
                  DescriptionRef.current.value &&
                  handleAddNote();
                setAddTask(!addTask);
              }}
            >
              Close
            </span>
          </div>
        </MoreAddTaskBar>
      )}
    </>
  );
};

export default TaskInputBar;