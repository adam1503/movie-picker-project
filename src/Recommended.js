import React, { useEffect } from "react";
import data from "./moviesData";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";

const getLocalStorage = () => {
  let index = localStorage.getItem("index");
  if (index) {
    return JSON.parse(localStorage.getItem("index"));
  } else {
    return [];
  }
};

const Recommended = () => {
  // !local storage has and empty default value - thus, we have an error!!
  const [index, setIndex] = useState(0);
  const { addToWheel } = useGlobalContext();

  //!local storage
  useEffect(() => {
    localStorage.setItem("index", JSON.stringify(index));
  }, [index]);

  // useEffect(() => {
  //   const lastIndex = data.length - 1;
  //   if (index < 0) {
  //     setIndex(lastIndex);
  //   }
  //   if (index > lastIndex) {
  //     setIndex(0);
  //   }
  // }, [index, data]);

  //!if we dont have this checkpoint, for a split of second, our index goes beyond the array length and we get an error
  const checkNum = (num) => {
    if (num < 0) {
      return data.length - 1;
    } else if (num > data.length - 1) {
      return 0;
    } else {
      return num;
    }
  };

  // useEffect(() => {
  //   let slider = setInterval(() => {
  //     setIndex(index + 1);
  //   }, 2000);
  //   return () => clearInterval(slider);
  // }, [index]);

  return (
    <Wrapper>
      <Navbar />
      <div className="section-center">
        {data.map((item, itemIndex) => {
          const { id, poster } = item;
          let position = "nextSlide";
          if (itemIndex === index) {
            position = "activeSlide";
          }
          if (
            itemIndex === index - 1 ||
            (index === 0 && itemIndex === data.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <>
              <article className={position} key={id}>
                <img src={poster} alt="photo" className="photo" />
              </article>
              <div className="movie-info">
                <h2>{data[index].title}</h2>
                <h3>{data[index].director}</h3>
              </div>
              <div className="options">
                <Link to={`/movies/${data[index].id}`} className="btn link">
                  View Details
                </Link>
                <button
                  className="btn"
                  onClick={() =>
                    addToWheel(
                      data[index].id,
                      data[index].poster,
                      data[index].title
                    )
                  }
                >
                  Add to wheel
                </button>
              </div>
            </>
          );
        })}
        <button className="prev" onClick={() => setIndex(checkNum(index - 1))}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button className="next" onClick={() => setIndex(checkNum(index + 1))}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .section-center {
    margin: 1rem auto;
    width: 90vw;
    height: 500px;
    max-width: 700px;
    text-align: center;
    position: relative;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    overflow: hidden;
  }

  .photo {
    width: 450px;
    height: 450px;
    position: relative;
    outline: 1px solid #0000009d;
    border-radius: 15px;
  }

  article {
    position: absolute;
    top: 2rem;
    /* bottom: 0; */
    left: 0;
    /* margin: 0 auto; */
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.2s linear;
  }

  .movie-info {
    position: absolute;
    /* border: 1px solid black; */
    border-radius: 15px;
    background: #ebebfd71;
    width: 15rem;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 5px 0;
    z-index: 10;
  }
  .movie-info h2 {
    font-weight: 300;
  }
  .movie-info h2 {
  }
  .options {
    position: absolute;
    bottom: 2.6rem;
    width: 420px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .btn {
    background: #ebebfd71;
    border: 1px solid black;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    font-size: 1rem;
    border-radius: 8px;
    padding: 2px 5px;
    cursor: pointer;
    :hover {
      background: white;
    }
  }
  .link {
    color: black;
  }
  .options button {
    transition: all 0.1s linear;
    :active {
      transform: scale(1.1);
    }
  }

  article.activeSlide {
    opacity: 1;

    transform: translateX(0);
  }
  article.lastSlide {
    transform: translateX(-100%);
  }
  article.nextSlide {
    transform: translateX(100%);
  }

  .prev,
  .next {
    position: absolute;
    top: 200px;
    display: grid;
    place-items: center;
    border-color: transparent;
    font-size: 2.5rem;
    background: transparent;
    cursor: pointer;
    color: #7575fe95;
    transition: all 0.1s linear;

    :hover {
      color: #7575fee0;
    }
    :active {
      transform: scale(1.2);
    }
  }
  .prev {
    left: 0.5rem;
  }
  .next {
    right: 0.5rem;
  }
  @media screen and (max-width: 500px) {
    .photo {
      width: 300px;
    }
    .options {
      width: 280px;
    }
  }
  @media screen and (min-height: 600px) {
    .section-center {
      height: 500px;
    }
    article {
      top: 3rem;
    }
    .options {
      bottom: 1rem;
    }
    .prev,
    .next {
      top: 220px;
    }
  }
  @media screen and (min-height: 800px) {
    .section-center {
      height: 560px;
    }
    article {
      top: 6.5rem;
    }
    .options {
      bottom: 1rem;
    }
    .prev,
    .next {
      top: 280px;
    }
  }
`;

export default Recommended;
