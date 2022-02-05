import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Link,
  Route
} from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/navbar/navbar";
import Notes from "../../components/notes/notes";
import { Notes as NotesPage } from "../Notes/Notes";
import Sidepanel from "../../components/sidepanel/sidepanel";
import TaskInputBar from "../../components/TaskInputBar/taskinputbar";
import Trash from "../trash/trash";
import Archive from "../archive/archive";
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
        <Switch>
          <Route exact path="/notes" component={NotesPage} />
          <Route exact path="/trash" component={Trash} />
          <Route exact path="/archive" component={Archive} />
          <Route exact path="/*">
            Not found <Link to="/notes"> click here </Link> to go notes page
          </Route>
        </Switch>
        {/* <NotesPage /> */}
      </Container>
    </>
  );
};

export default Dashboard;
