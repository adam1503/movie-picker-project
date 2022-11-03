import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

function Movies() {
  const {
    movies,
    isLoading,
    addToWheel,
    movieName,
    singleMovieId,
    setSingleMovieId,
  } = useGlobalContext();

  return (
    <Wrapper>
      <div className="meta-container" id="movies">
        <hr />
        {isLoading ? (
          <>
            <div className="loading-container">
              <div className="loading"></div>
            </div>
          </>
        ) : (
          <>
            <div className="container">
              <section className="movies">
                {movies.map((movie) => {
                  const {
                    imdbID: id,
                    Poster: poster,
                    Title: title,
                    Year: year,
                  } = movie;
                  return (
                    <>
                      {/* <Link to={`/movies/${id}`} key={id} className="movie">
                        <img
                          src={poster === "N/A" ? url : poster}
                          alt={title}
                          className="photo"
                        />
                        <div className="movie-info">
                          <h4 className="title">{title}</h4>
                          <p>{year}</p>
                        </div>
                      </Link> */}
                      <div className="info">
                        <h3>{title}</h3>
                        <h4>{year}</h4>
                      </div>
                      <div key={id} id={id} className="movie">
                        <img
                          src={poster === "N/A" ? url : poster}
                          alt={title}
                          className="photo"
                        />
                        <div className="movie-info">
                          <h3 className="title">{title}</h3>
                          <p>{year}</p>
                        </div>
                      </div>
                      <div className="details-wheel">
                        <Link
                          to={`/movies/${id}`}
                          onClick={() => setSingleMovieId(id)}
                          className="link"
                        >
                          Details
                        </Link>
                        <button onClick={() => addToWheel(id, poster, title)}>
                          Add to the wheel
                        </button>
                      </div>
                      <div className="underline"></div>
                    </>
                  );
                })}
              </section>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .container {
    /* width: 100%; */
    /* height: 100%; */
    padding-top: 3.9rem;
    /* background: #dcdcff56; */
    /* border-top-left-radius: 15px;
    border-top-right-radius: 15px; */
  }
  .movies {
    display: grid;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* max-width: 1100px; */
    margin: 0 auto;
  }
  .info {
    display: none;
    text-align: center;
    margin-bottom: 10px;
  }
  .info h3 {
    font-size: 2rem;
  }
  .info h4 {
    font-weight: 400;
  }
  .movie {
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    width: 90%;
    /* width: 500px; */
    height: 100%;
    max-height: 550px;
    margin: 0 auto;
    &:hover .movie-info {
      transform: translateY(0);
    }
  }
  .photo {
    width: 100%;
    display: block;
    object-fit: cover;
  }
  .movie-info {
    position: absolute;
    bottom: 0;
    left: 0;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    letter-spacing: 0.8px;
    width: 100%;
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.6);
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    transform: translateY(100%);
    transition: all 0.3s linear;
  }
  .title {
    color: white;
    font-size: 2rem;
    font-weight: 400;
  }
  p {
    font-size: 1.5rem;
    text-align: center;
    color: white;
    margin: 0;
    font-weight: 600;
  }
  h5 {
    color: white;
  }
  .details-wheel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 85%;
    margin: 0.7rem auto;
  }
  .link {
    font-size: 1.3rem;
    color: #7575fee0;
    text-decoration: none;
    :hover {
      /* text-decoration: underline; */
      color: #7575fe;
    }
  }
  .details-wheel button {
    border: none;
    font-size: 1rem;
    background: #7575fe5f;
    padding: 5px 10px;
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
  .underline {
    width: 50%;
    height: 3px;
    border-radius: 10px;
    margin: 0.5rem auto 2rem auto;
    background: #7575fee0;
  }

  @media screen and (max-width: 450px) {
    .movie:hover .movie-info {
      transform: translateY(100%);
    }
    .info {
      display: grid;
    }
  }
  @media screen and (min-width: 500px) {
    .movie {
      width: 400px;
    }
  }
  @media screen and (min-width: 500px) {
    .movie {
      width: 500px;
    }
  }
`;

export default Movies;
