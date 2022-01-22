import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TaskInputBar from "../../components/TaskInputBar/taskinputbar";
import NoteBox from "../../components/notes/notes";
import Axios from "axios";

const NotesContainer = styled.div`
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

const NotesList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 20px;
  flex-wrap: wrap;
  gap: 20px;
`;
export const Notes = () => {
  const [notes, setNotes] = useState(null);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        let result = await Axios.get("/tasks?skip=0&limit=100", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setNotes(result.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [refetch]);
  return (
    <NotesContainer>
      <AddTaskWrapper>
        <TaskInputBar setRefetch={setRefetch} />
      </AddTaskWrapper>
      {notes && (
        <NotesList>
          {console.log(notes)}
          {notes
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
                  setRefetch={setRefetch}
                />
              );
            })}
        </NotesList>
      )}
    </NotesContainer>
  );
};
