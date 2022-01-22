import styled from "styled-components";

export const NavbarWrapper = styled.div`
  width: auto;
  max-height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px;
  // box-shadow: 0 10px 10px 5px grey;
  border-bottom: 1px solid grey;
  .nav-title-wrapper {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    align-items: center;
  }
  .search-wrapper {
    width: 35rem;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 8px;
    border: 2px solid grey;
    border-radius: 5px;
    margin-left: 40px;
  }
  .search-wrapper > input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 18px;
  }
  .search-wrapper > input:focus {
    border: none;
    outline: none;
  }

  .icons-wrapper {
    margin-left: auto;
    display: flex;
    justify-content: flex-start;
    gap: 25px;
    align-items: center;
  }
`;
