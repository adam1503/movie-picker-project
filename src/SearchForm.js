import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";
import { FcSearch } from "react-icons/fc";
import { useEffect } from "react";

function SearchForm() {
  const { query, setQuery, searchMovie, isLoading } = useGlobalContext();

  const scrollIntoView = () => {
    setTimeout(() => {
      document.getElementById("movies").scrollIntoView();
    }, 300);
  };

  return (
    <Wrapper>
      <form className="search-form" onSubmit={searchMovie}>
        <input
          placeholder="Search for a movie"
          type="text"
          className="form-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="submit-btn"
          onClick={() => scrollIntoView()}
        >
          <FcSearch />
        </button>
      </form>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .search-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .form-input {
    height: 3rem;
    padding: 0 10px;
    border-radius: 10px;
    border: none;
    background: #dcdcff9c;
    font-size: 1.3rem;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    font-weight: 600;
    letter-spacing: 1.3px;
    width: 70%;
    max-width: 400px;
    margin-bottom: 1rem;
  }
  .submit-btn {
    font-size: 2.5rem;
    background: transparent;
    border: none;
    border-radius: 10px;
    padding: 0 10px;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    transition: all 0.1s linear;
    cursor: pointer;
    :hover {
      transform: scale(1.1);
    }
    :active {
      transform: scale(1.3);
    }
  }
`;

export default SearchForm;
