import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TaskInputBar from "../../components/TaskInputBar/taskinputbar";
import NoteBox from "../../components/notes/notes";
import Axios from "axios";
import {  useQuery } from '@apollo/client';
import { getAllTasks } from "../../graphql";

export const NotesContainer = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const AddTaskWrapper = styled.div`
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NotesList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 20px;
  flex-wrap: wrap;
  gap: 20px;
`;
export const Notes = () => {
  const{data, loading,error}=useQuery(getAllTasks);
 
  return (
    <NotesContainer>
      <AddTaskWrapper>
        <TaskInputBar  />
      </AddTaskWrapper>
      {data && (
        <NotesList>
          {data.tasks
            .filter(val => {
              return val?.isDeleted === false;
            })
            .filter(val => !val?.isArchived)
            .map((note, index) => {
              return (
                <NoteBox
                  title={note.title}
                  description={note.description}
                  color={note?.color}
                  key={note?._id || index}
                  id={note?._id}
                />
              );
            })}
        </NotesList>
      )}
    </NotesContainer>
  );
};
