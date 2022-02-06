import React, { useContext } from "react";
import { NotesContainer, NotesList } from "../Notes/Notes";
import NoteBox from "../../components/notes/notes";
import { useQuery } from "@apollo/client";
import { getAllTasks } from "../../graphql";
import { context } from "../Dashboard/dashboard";
import Notesloading from "../../components/loading/notes";

const Trash = () => {
  const { data, loading, error } = useQuery(getAllTasks);
  const { search } = useContext(context);

  return (
    <NotesContainer>
      {
        <NotesList>
          {loading ? (
            <Notesloading />
          ) : (
            data.tasks
              .filter(val => {
                return val?.isDeleted;
              })
              .filter(
                val =>
                  val.title.includes(search) || val.description.includes(search)
              )
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
              })
          )}
        </NotesList>
      }
    </NotesContainer>
  );
};

export default Trash;
