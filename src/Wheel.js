import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import { useState } from "react";

function Wheel() {
  const { wheelFilms, index, showWheel, backToHome } = useGlobalContext();
  const { poster, title } = wheelFilms[index];

  const [numThree, setNumThree] = useState(false);
  const [numTwo, setNumTwo] = useState(false);
  const [numOne, setNumOne] = useState(false);

  useState(() => {
    setNumThree(true);
    setTimeout(() => {
      setNumThree(false);
      setNumTwo(true);
    }, 1000);
  }, []);
  useState(() => {
    setTimeout(() => {
      setNumTwo(false);
      setNumOne(true);
    }, 2000);
  }, []);
  useState(() => {
    setTimeout(() => {
      setNumOne(false);
    }, 3000);
  }, []);

  return (
    <Wrapper>
      <div className="section-center">
        {!showWheel && (
          <>
            <h2 className="title">Your random picked movie:</h2>
            <div className="underline"></div>
          </>
        )}
        {showWheel && (
          <>
            <div className="numbers">
              {numThree && <h1>3</h1>}
              {numTwo && <h1>2</h1>}
              {numOne && <h1>1</h1>}
            </div>
            <div className="circle-background">
              <div className="circle-container">
                <div id="container">
                  <div className="circle1"></div>
                  <div className="circle2"></div>
                  <div className="circle3"></div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className={`movie-container ${!showWheel && "show-movie"}`}>
          <div className="movie-info">
            <h2>{title}</h2>
            <img src={poster} alt="poster" className="poster" />
          </div>
          <a
            href={`https://ev01.to/search/${title.split(" ").join("-")}`}
            target="_blank"
            className="watch-btn"
          >
            Watch online
          </a>
          <Link to="/" onClick={backToHome} className="link">
            Back to the Movie-Wheel-Picker
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .section-center {
    height: 100%;
    width: 100%;
    position: absolute;
    /* background: #dcdcff9c; */
    background: white;
    font-family: "Fira Sans Extra Condensed", sans-serif;
  }
  .title {
    text-align: center;
    font-size: 2.8rem;
    margin: 0.5rem 1rem 0.5rem 1rem;
    font-weight: 600;
    color: black;
  }
  .underline {
    width: 50%;
    max-width: 200px;
    height: 3px;
    border-radius: 10px;
    margin: 0 auto;
    background: #7575fee0;
  }

  .movie-container {
    width: 95%;
    margin: 1.5rem auto;
    display: none;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .show-movie {
    display: grid;
  }
  .movie-info {
    width: 100%;
    margin: 0 auto;
  }
  .movie-info h2 {
    margin-bottom: 1rem;
    font-size: 2.5rem;
  }
  .poster {
    width: 300px;
    height: 300px;
    /* object-fit: cover; */
    display: block;
    border-radius: 15px;
    box-shadow: 0px 0px 9px 5px rgba(117, 117, 254, 0.75);
  }
  .watch-btn {
    border: 1px solid black;
    border-radius: 10px;
    color: black;
    font-size: 1.7rem;
    width: 10rem;
    display: block;
    margin: 1.5rem auto 1rem auto;
    background: #dcdcff9c;
    cursor: pointer;
    transition: all 0.1s linear;
    :hover {
      background: #7575fe95;
    }
  }
  .link {
    font-size: 1.2rem;
    :hover {
      color: black;
    }
  }

  .numbers {
    text-align: center;
    font-family: "Fira Sans Extra Condensed", sans-serif;
  }
  .numbers h1 {
    font-size: 8rem;
    font-weight: 300;
  }
  //wheel
  .circle-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 90vw;
    height: 300px;
    z-index: 5;
  }
  #container {
    /* position: absolute;
    left: 45%; */
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 300px;
    width: 300px;
    border-radius: 50%;
    background: #272727;
  }
  .circle1 {
    position: relative;
    top: 0px;
    width: 0px;
    height: 0px;
    border-right: 150px solid transparent;
    border-top: 150px solid #1ba7f2;
    border-left: 150px solid transparent;
    border-bottom: 150px solid transparent;
    border-top-left-radius: 150px;
    border-top-right-radius: 150px;
    transform: rotate(320deg);

    animation: spin1 0.5s infinite linear;
    -webkit-animation: spin1 0.5s infinite linear;
  }
  .circle2 {
    position: absolute;
    top: 0px;
    width: 0px;
    height: 0px;
    border-right: 150px solid transparent;
    border-top: 150px solid #1ba7f2;
    border-left: 150px solid transparent;
    border-bottom: 150px solid transparent;
    border-top-left-radius: 150px;
    border-top-right-radius: 150px;
    transform: rotate(80deg);

    animation: spin2 0.5s infinite linear;
    -webkit-animation: spin2 0.5s infinite linear;
  }
  .circle3 {
    position: absolute;
    top: 0px;
    width: 0px;
    height: 0px;
    border-right: 150px solid transparent;
    border-top: 150px solid #1ba7f2;
    border-left: 150px solid transparent;
    border-bottom: 150px solid transparent;
    border-top-left-radius: 150px;
    border-top-right-radius: 150px;
    transform: rotate(200deg);

    animation: spin3 0.5s infinite linear;
    -webkit-animation: spin3 0.5s infinite linear;
  }
  /* animations */

  @keyframes spin1 {
    0% {
      -moz-transform: rotate(320deg);
      -webkit-transform: rotate(320deg);
      -o-transform: rotate(320deg);
      -ms-transform: rotate(320deg);
    }
    100% {
      -moz-transform: rotate(680deg);
      -webkit-transform: rotate(680deg);
      -o-transform: rotate(680deg);
      -ms-transform: rotate(680deg);
    }
  }
  @-webkit-keyframes spin1 {
    0% {
      -moz-transform: rotate(320deg);
      -webkit-transform: rotate(320deg);
      -o-transform: rotate(320deg);
      -ms-transform: rotate(320deg);
    }
    100% {
      -moz-transform: rotate(680deg);
      -webkit-transform: rotate(680deg);
      -o-transform: rotate(680deg);
      -ms-transform: rotate(680deg);
    }
  }
  @keyframes spin2 {
    0% {
      -moz-transform: rotate(80deg);
      -webkit-transform: rotate(80deg);
      -o-transform: rotate(80deg);
      -ms-transform: rotate(80deg);
    }
    100% {
      -moz-transform: rotate(440deg);
      -webkit-transform: rotate(440deg);
      -o-transform: rotate(440deg);
      -ms-transform: rotate(440deg);
    }
  }
  @-webkit-keyframes spin2 {
    0% {
      -moz-transform: rotate(80deg);
      -webkit-transform: rotate(80deg);
      -o-transform: rotate(80deg);
      -ms-transform: rotate(80deg);
    }
    100% {
      -moz-transform: rotate(440deg);
      -webkit-transform: rotate(440deg);
      -o-transform: rotate(440deg);
      -ms-transform: rotate(440deg);
    }
  }
  @keyframes spin3 {
    0% {
      -moz-transform: rotate(200deg);
      -webkit-transform: rotate(200deg);
      -o-transform: rotate(200deg);
      -ms-transform: rotate(200deg);
    }
    100% {
      -moz-transform: rotate(560deg);
      -webkit-transform: rotate(560deg);
      -o-transform: rotate(560deg);
      -ms-transform: rotate(560deg);
    }
  }
  @-webkit-keyframes spin3 {
    0% {
      -moz-transform: rotate(200deg);
      -webkit-transform: rotate(200deg);
      -o-transform: rotate(200deg);
      -ms-transform: rotate(200deg);
    }
    100% {
      -moz-transform: rotate(560deg);
      -webkit-transform: rotate(560deg);
      -o-transform: rotate(560deg);
      -ms-transform: rotate(560deg);
    }
  }
`;

export default Wheel;
