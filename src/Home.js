import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import Movies from "./Movies";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useGlobalContext } from "./context";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

function Home() {
  const { movieName, height } = useGlobalContext();
  const [arrowTop, setArrowTop] = useState(false);

  window.addEventListener("scroll", () => {
    const windowScroll = window.scrollY;
    if (windowScroll > 700) {
      setArrowTop(true);
    } else {
      setArrowTop(false);
    }
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <div className={`section-center ${height && "fixed-navbar"}`}>
        <div className="description">
          <h2>
            Do you sometimes find it difficult to choose a movie from your
            'watch later' list?
          </h2>
          <h3>
            Here, just choose the movies you are eager to watch and, by{" "}
            <u>turning the wheel-picker</u>, a random movie will be chosen for
            you!
          </h3>
        </div>
        <SearchForm />
      </div>
      {/* </div> */}
      {movieName && <Movies />}
      {arrowTop && (
        <div className="arrow-top" onClick={() => window.scroll(0, 0)}>
          <BsFillArrowUpCircleFill />
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .container {
    /* height: 100vh; */
  }

  .section-center {
    width: 90vw;
    height: calc(100vh - 4rem);
    max-width: 650px;
    margin: 0rem auto;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .fixed-navbar {
    margin-top: 4rem;
  }
  .section-center h2,
  h3 {
    font-family: "Fira Sans Extra Condensed", sans-serif;
    text-align: center;
    letter-spacing: 0.8px;
  }
  .section-center h2 {
    margin-bottom: 1rem;
  }
  .arrow-top {
    position: fixed;
    font-size: 2.8rem;
    right: 1.5rem;
    bottom: 1.5rem;
    cursor: pointer;
    color: #7b7bf4c4;
    transition: all 0.1s linear;
    :hover {
      color: #7b7bf4;
    }
    :active {
      transform: scale(1.2);
    }
  }

  @media screen and (max-width: 500px) {
    .section-center h2 {
      font-size: 1.7rem;
    }
    .section-center h3 {
      font-size: 1rem;
      width: 80%;
      margin: 1rem auto;
    }
  }

  @media screen and (min-height: 550px) {
    .section-center h2 {
      font-size: 2.3rem;
    }
    .section-center h3 {
      font-size: 1.4rem;
    }
  }

  @media screen and (min-width: 800px) {
    .section-center h2 {
      font-size: 2.6rem;
    }
    .section-center h3 {
      font-size: 1.8rem;
    }
  }
`;

export default Home;
