import React from "react";
import styled from "styled-components";

export const notesloading = (count = 10) => {
  let arr = [];
  for (let index = 0; index < count; index++) {
    arr.push(
      <NotesloadingBox key={index}>
        <div className="input skeleton"></div>
        <div className="input skeleton"></div>

        <div className="loading-icons">
          <div className="box skeleton"></div>
          <div className="box skeleton"></div>
          <div className="box skeleton"></div>
          <div className="box skeleton"></div>
          <div className="box skeleton"></div>
          <div className="box skeleton"></div>
        </div>
      </NotesloadingBox>
    );
  }
  return arr;
};

const NotesloadingBox = styled.div`
  min-width: 18rem;
  border: 1px solid rgb(128, 128, 128, 0.3);
  background-color: white;
  border-radius: 5px;
  box-shadow: 3px 4px 5px 2px grey;
  display: flex;
  flex-direction: column;
  height: max-content;
  padding: 10px;
  .input {
    width: 100%;
    height: 1rem;
    border: none;
    background-color: grey;
    margin-bottom: 8px;
  }
  .input:nth-child(2n) {
    width: 80% !important;
  }
  .loading-icons {
    display: flex;
    gap: 31px;
  }
  .box {
    width: 13px;
    height: 11px;
  }
  .skeleton {
    opacity: 0.7;
    animation: skeleton-loading 1s linear infinite alternate;
  }
  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 70%);
    }

    100% {
      background-color: hsl(200, 20%, 95%);
    }
  }
`;

const Notesloading = ({ count = 10 }) => {
  return notesloading(count);
};

export default Notesloading;
