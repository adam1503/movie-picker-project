import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import { GiCartwheel } from "react-icons/gi";
import { useGlobalContext } from "./context";

function Navbar() {
  const {
    showRandomMovie,
    loadingNavbar,
    height,
    setHeight,
    wheelFilms,
    transform,
  } = useGlobalContext();

  const event = window.addEventListener("scroll", () => {
    const windowScroll = window.scrollY;
    if (windowScroll > 95) {
      setHeight(true);
    } else {
      setHeight(false);
    }
  });

  return (
    <>
      <Wrapper>
        <div className={`container ${height && "fixed-nav"}`}>
          <Link to="/" className="icon" onClick={() => window.scroll(0, 0)}>
            <BiCameraMovie />
          </Link>
          <Link to="/movie-picker" className="link highlight">
            Wheel Picker
            {wheelFilms.length > 0 && (
              <h1 className={`${transform && "transform"}`}>
                {wheelFilms.length}
              </h1>
            )}
          </Link>
          <Link to="/movie-recommendation" className="link">
            Movie recommendation
          </Link>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #7575fee0;
    margin: 0 auto;
    width: 100%;
    height: 4rem;
    z-index: 5;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .fixed-nav {
    top: 0;
    position: fixed;
  }

  .icon {
    font-size: 2.7rem;
    color: #000000;
    :active {
      color: #ffffff9e;
    }
  }

  .link {
    font-family: "Fira Sans Extra Condensed", sans-serif;
    font-size: 1.3rem;
    font-weight: 400;
    color: #000000;
    position: relative;
    z-index: 3;
    transition: all 0.1s linear;
    :active {
      color: #ffffff9e;
    }
  }
  .highlight {
    font-weight: 600;
  }
  .link h1 {
    font-size: 1.2rem;
    position: absolute;
    border-radius: 50%;
    padding: 0 8px;
    color: black;
    background: #d6d6ff;
    top: -3px;
    right: -18px;
    z-index: -1;
  }

  .transform {
    animation: scale 0.3s ease-out;
  }
  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
      background: white;
    }
    100% {
      transform: scale(1);
    }
  }

  .title {
    text-align: center;
    font-weight: 300;
  }
  h4 {
    text-align: center;
    font-weight: 300;
  }

  @media screen and (min-width: 400px) {
    .link {
      font-size: 1.6rem;
    }
  }

  @media screen and (min-width: 600px) {
    .container {
      justify-content: space-around;
    }
    .link {
      font-size: 1.8rem;
    }
  }

  @media screen and (min-width: 1000px) {
    .link {
      font-size: 2rem;
    }
    .icon {
      font-size: 3rem;
    }
  }
`;

export default Navbar;
