import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Icon from "../Icons/icons";
import Axios from "axios";
import { useMutation } from "@apollo/client";
import { addTask as addNote, getAllTasks } from "../../graphql";
import produce from "immer";
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
const TaskInputBar = () => {
  const [addTask, setAddTask] = useState(false);
  const titleRef = useRef();
  const DescriptionRef = useRef();
  const [addtask] = useMutation(addNote);

  const handleAddNote = useCallback(async () => {
    const { value } = titleRef.current;
    const { value: DescValue } = DescriptionRef.current;

    let data = {
      title: value,
      description: DescValue,
      color: "white",
    };
    addtask({
      variables: {
        body: data,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addTask: {
          __typename: "Task",
          _id: Math.random(),
          title: data.title,
          description: data.description,
          labels: [],
          createdAt: "dcdcdcd",
          color: "white",
        },
      },
      update: (store, { data: { addTask } }) => {
       const data = store.readQuery({
         query:getAllTasks
       })
       console.log(data);
       const tmpdata = {
        __typename: addTask.__typename,
        _id: addTask._id,
        title: addTask.title,
        description: addTask.description,
        createdAt: addTask.createdAt,
        color: addTask.color,
        completed:addTask.completed || false,
        isDeleted:addTask.isDeleted || false,
        isArchived:addTask.isArchived || false,
        isPinned:false,
       }

       const newData = produce(data,draftState =>{
         draftState.tasks.push(tmpdata)
       })
        store.writeQuery({
        query:getAllTasks,
        data:newData
      })
      },
    });

    // let result = await Axios.post("/tasks", data, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")} `
    //   }
    // });
  }, [addtask]);

  return (
    <>
      {!addTask ? (
        <TaskBarWrapper onClick={() => setAddTask((prev) => !prev)}>
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
