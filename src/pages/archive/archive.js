import React, { useEffect, useState } from "react";
import { NotesContainer, NotesList } from "../Notes/Notes";
import NoteBox from "../../components/notes/notes";

import Axios from "axios";

const Archive = () => {
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
      {notes && (
        <NotesList>
          {notes
            .filter(val => {
              return !val?.isDeleted;
            })
            .filter(val => val?.isArchived)
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

export default Archive;
