import React, { useEffect } from "react";
import { useGlobalContext } from "./context";
import Wheel from "./Wheel";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSearchAlt, BiCameraMovie } from "react-icons/bi";
import { useState } from "react";

const MoviePicker = () => {
  const [reminder, setReminder] = useState(false);
  const [changeColor, setChangeColor] = useState(false);

  const {
    wheelFilms,
    index,
    randomMovie,
    showWheel,
    deleteMovie,
    showPickedMovies,
    showRandomMovie,
    setShowRandomMovie,
    backToHome,
    height,
  } = useGlobalContext();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setReminder(true);
      setTimeout(() => {
        setReminder(false);
      }, 1000);
    }, 800);
  }, [wheelFilms]);
  useEffect(() => {
    setTimeout(() => {
      setChangeColor(true);
      setTimeout(() => {
        setChangeColor(false);
      }, 300);
    }, 800);
  }, [wheelFilms]);

  // const { poster, title } = wheelFilms[index];

  return (
    <Wrapper>
      <Navbar />
      {/* picked movies */}
      <div className={`section-center ${height && "fixed-navbar"}`}>
        {wheelFilms.length >= 3 ? (
          <Link to="/movie-wheel" onClick={randomMovie}>
            <button className="click-btn">Click for the random movie!</button>
          </Link>
        ) : (
          <>
            <Link to="/">
              <button className="left-btn">
                <BsFillArrowLeftCircleFill />
              </button>
            </Link>
            <h5 className={`${reminder && "reminder"}`}>
              Choose at least 3 movies to activate the random wheel.
            </h5>
            {wheelFilms.length < 1 && (
              <BiCameraMovie
                className={`camera ${changeColor && "change-color"}`}
              />
            )}
          </>
        )}
        <div className={`movies ${wheelFilms.length > 1 && "grid"}`}>
          {wheelFilms.map((movie) => {
            const { id, poster, title, director } = movie;
            return (
              <>
                <div className="movie-item">
                  <h2>{title}</h2>
                  <div className="poster" key={id}>
                    <img src={poster} alt="film poster" className="image" />
                    <button onClick={() => deleteMovie(id)}>
                      <AiOutlineDelete />
                    </button>
                    <Link to={`/movies/${id}`} className="link-btn">
                      <BiSearchAlt />
                    </Link>
                  </div>
                  <div className="underline"></div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .section-center {
    width: 90vw;
    margin: 0 auto;
  }
  .fixed-navbar {
    margin-top: 4.5rem;
  }
  .left-btn {
    font-size: 3rem;
    color: #7575fe95;
    margin-top: 0.5rem;
    animation: bounce 0.7s ease-in-out infinite;
    background: transparent;
    border: none;
    cursor: pointer;
    :hover {
      color: #7575fe;
    }
  }
  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  h5 {
    font-family: "Fira Sans Extra Condensed", sans-serif;
    text-align: center;
    display: flex;
    justify-content: center;
    /* margin: 1rem 0; */
    color: #000000ce;
    font-size: 1.7rem;
  }
  .reminder {
    animation: shuuuh 0.5s ease-out;
  }
  @keyframes shuuuh {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
      color: #4444f5;
    }
    100% {
      transform: scale(1);
    }
  }
  .camera {
    font-size: 15rem;
    display: block;
    margin: 0 auto;
    color: #7575fe95;
    transition: all 0.1s linear;
  }
  .change-color {
    color: #7575fee0;
  }

  .click-btn {
    font-size: 1.7rem;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    animation: bounce 1s ease-in-out infinite;
    display: block;
    margin: 0 auto;
    margin-top: 1rem;
    cursor: pointer;
    background: #7575fe5f;
    border: none;
    border-radius: 15px;
    padding: 5px 10px;
    :hover {
      background: #7575fe95;
    }
  }
  .movies {
    margin: 1rem auto;
  }

  .movie-item {
    max-width: 400px;
    display: grid;
    gap: 0.5rem;
    text-align: center;
    margin: 0 auto;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    /* border: 1px solid #0000009d; */
    /* border-radius: 20px; */
    padding-top: 10px;
  }
  .movie-item h2 {
    color: black;
  }
  .poster {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    :hover img {
      opacity: 0.5;
    }
    :hover .link-btn {
      opacity: 1;
    }
  }

  .link-btn {
    position: absolute;
    font-size: 4rem;
    opacity: 0;
    color: #000000ce;
    transition: all 0.1s linear;
    cursor: pointer;

    :hover {
      transform: scale(1.1);
    }
  }

  .poster img {
    border-radius: 10px;
    width: 100%;
  }
  .poster button {
    font-size: 2.3rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #0000009d;
    :hover {
      color: black;
    }
  }
  .underline {
    width: 50%;
    max-width: 200px;
    height: 3px;
    border-radius: 10px;
    margin: 0.5rem auto 2rem auto;
    background: #7575fee0;
  }
  @media screen and (min-width: 1000px) {
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .movie-item {
      margin: 0 auto;
    }
  }
`;

export default MoviePicker;
