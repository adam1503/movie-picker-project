import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT, useGlobalContext } from "./context";
import useFetch from "./useFetch";
import styled from "styled-components";
import Navbar from "./Navbar";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function SingleMovie() {
  const { id } = useParams();

  console.log(id);
  const { isLoading, error, data: movie } = useFetch(`&i=${id}`);
  const { addToWheel, wheelFilms, height, scrollBack } = useGlobalContext();

  // const isLoading = true;

  if (isLoading) {
    return (
      <>
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      </>
    );
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    );
  }

  const { Title, Director, Genre, Plot, Year, Poster, Country, Language } =
    movie;
  //!nested values in API
  //!dont forget that not any movie has all this properties

  let source = "";
  let rating = "";
  if (movie.Ratings[1]) {
    source = movie.Ratings[1].Source;
    rating = movie.Ratings[1].Value;
  } else {
    source = "imdb-Rating";
    rating = movie.imdbRating;
  }

  return (
    <>
      <Wrapper>
        <Navbar />
        <Link to="/" onClick={() => scrollBack()} className="left-btn">
          <BsFillArrowLeftCircleFill />
        </Link>
        <div className={`section-center ${height && "fixed-navbar"}`}>
          <div className="movie-item">
            <div className="poster-title">
              <h1 className="title">{Title}</h1>
              <img src={Poster} alt="film poster" />
            </div>
            <div className="movie-info">
              <h3 className="bold">Director:</h3>
              <h2>{Director}</h2>
              <h3 className="bold">Year:</h3>
              <h4>{Year}</h4>
              <h3 className="bold"> Language:</h3>
              <h4>{Language}</h4>
              <h3 className="bold">Country:</h3>
              <h4>{Country}</h4>
              <h3 className="bold">Plot:</h3>
              <h4>,,{Plot}"</h4>
              <h3 className="bold">Rating:</h3>
              <h4>
                {source} : {rating}
              </h4>
              <button
                onClick={() => addToWheel(id, Poster, Title, Director)}
                className="wheel-btn"
              >
                Add to the wheel
              </button>
            </div>
          </div>
          {/* <button
            onClick={() => addToWheel(id, Poster, Title, Director)}
            className="wheel-btn"
          >
            Add to the wheel
          </button> */}
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  .left-btn {
    position: absolute;
    font-size: 3rem;
    margin-left: 1rem;
    color: #7575fe95;
    :hover {
      color: #7575fe;
    }
  }
  .section-center {
    width: 90vw;
    margin: 0 auto;
  }
  .fixed-navbar {
    margin-top: 5.7rem;
  }
  .movie-item {
    display: grid;
    align-items: center;
    justify-content: center;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    font-weight: 400;
    width: 100%;
    margin: 2rem auto 1rem auto;
  }
  .poster-title {
    width: 90%;
    margin: 0 auto;
    align-items: center;
  }
  .poster-title h1 {
    text-align: center;
    font-size: 2.5rem;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    font-weight: 400;
    color: black;
    margin-bottom: 1.2rem;
  }
  .poster-title img {
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    height: 80%;
    max-height: 450px;
    display: block;
    /* object-fit: cover; */
  }
  .movie-info {
    text-align: center;
    width: 90%;
    margin: 1.5rem auto 0 auto;
    max-width: 600px;
  }
  .bold {
    font-weight: 800;
    font-size: 1.7rem;
    color: #000000ce;
  }

  h2 {
    margin-bottom: 0.5rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .wheel-btn {
    display: block;
    margin: 1rem auto 0 auto;
    border: none;
    font-size: 1.4rem;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    background: #7575fe5f;
    padding: 5px 10px;
    margin-bottom: 1.5rem;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.1s linear;
    :hover {
      background: #7575fe95;
    }
    :active {
      transform: scale(1.1);
    }
  }

  @media screen and (min-width: 500px) {
    .poster-title img {
      max-height: 550px;
    }
  }
  @media screen and (min-width: 1200px) {
    .movie-item {
      grid-template-columns: 400px auto;
      margin: 0 auto;
    }
    .poster-title img {
      max-height: 380px;
    }
    .title {
      font-size: 2rem;
    }
    .bold {
      font-size: 1.5rem;
    }
  }
`;

export default SingleMovie;
