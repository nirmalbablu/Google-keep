import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/navbar/navbar";
import Notes from "../../components/notes/notes";
import { Notes as NotesPage } from "../Notes/Notes";
import Sidepanel from "../../components/sidepanel/sidepanel";
import TaskInputBar from "../../components/TaskInputBar/taskinputbar";
const Container = styled.div`
  width: auto;
  height: calc(100vh - 3rem);
  display: flex;
`;
const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Sidepanel />
        <NotesPage />
      </Container>
    </>
  );
};

export default Dashboard;
