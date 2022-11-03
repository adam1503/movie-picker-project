import React, { useContext, useState, useReducer, useEffect } from "react";
import useFetch from "./useFetch";
import reducer from "./reducer";

const getLocalStorage = () => {
  let wheelFilms = localStorage.getItem("wheelFilms");
  if (wheelFilms) {
    return JSON.parse(localStorage.getItem("wheelFilms"));
  } else {
    return [];
  }
};

const initialState = {
  wheelFilms: getLocalStorage(),
  RMCopy: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getLocalStorage = () => {
    let index = localStorage.getItem("index");
    if (index) {
      return JSON.parse(localStorage.getItem("index"));
    } else {
      return [];
    }
  };
  const getLocalStorage1 = () => {
    let showPickedMovies = localStorage.getItem("showPickedMovies");
    if (showPickedMovies) {
      return JSON.parse(localStorage.getItem("showPickedMovies"));
    } else {
      return [];
    }
  };

  const [query, setQuery] = useState("");

  const [movieName, setMovieName] = useState("");
  const { isLoading, error, data: movies } = useFetch(`&s=${movieName}`);

  const [index, setIndex] = useState(getLocalStorage());
  const [showWheel, setShowWheel] = useState(false);
  const [showPickedMovies, setShowPickedMovies] = useState(true);
  const [showRandomMovie, setShowRandomMovie] = useState(false);
  const [loadingNavbar, setLoadingNavbar] = useState(false);

  // !for the scroll back when returning from singleMovie
  const [singleMovieId, setSingleMovieId] = useState("");

  const scrollBack = () => {
    setTimeout(() => {
      document.getElementById(singleMovieId).scrollIntoView();
    }, 100);
  };

  // !for the navbar fixed function
  const [height, setHeight] = useState(false);

  //!for the fixed number
  const [transform, setTransform] = useState(false);

  const addToWheel = (id, poster, title, director) => {
    setTransform(true);
    setTimeout(() => {
      setTransform(false);
    }, 600);
    dispatch({
      type: "ADD_TO_WHEEL",
      payload: { id, poster, title, director },
    });
  };

  const deleteMovie = (id) => {
    dispatch({ type: "DELETE_MOVIE", payload: id });
  };

  useEffect(() => {
    localStorage.setItem("wheelFilms", JSON.stringify(state.wheelFilms));
  }, [state.wheelFilms]);

  useEffect(() => {
    localStorage.setItem("index", JSON.stringify(index));
    localStorage.setItem("showPickedMovies", JSON.stringify(showPickedMovies));
  }, [index, showPickedMovies, showRandomMovie]);

  const searchMovie = (e) => {
    e.preventDefault();
    if (query) {
      setMovieName(query);
      setQuery("");
    } else {
      return movieName;
    }
  };

  const checkNum = (num) => {
    if (num > state.wheelFilms.length - 1) {
      return 0;
    }
    if (num < 0) {
      return state.wheelFilms.length - 1;
    }
    return num;
  };

  const backToHome = () => {
    setShowRandomMovie(false);
    // setShowPickedMovies(true);
    dispatch({ type: "DELETE_WHEEL" });
  };

  const randomMovie = () => {
    let randomNum = Math.floor(Math.random() * state.wheelFilms.length);
    if (randomNum === index) {
      randomNum = index + 1;
    }
    setIndex(checkNum(randomNum));
    // setShowPickedMovies(false);
    setShowWheel(true);
    setLoadingNavbar(true);

    const timeOut = setTimeout(() => {
      setShowWheel(false);
      setShowRandomMovie(true);
      setLoadingNavbar(false);
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        query,
        setQuery,
        isLoading,
        error,
        movies,
        searchMovie,
        addToWheel,
        ...state,
        index,
        showWheel,
        randomMovie,
        deleteMovie,
        showPickedMovies,
        showRandomMovie,
        setShowRandomMovie,
        backToHome,
        loadingNavbar,
        movieName,
        height,
        setHeight,
        transform,
        setTransform,
        singleMovieId,
        setSingleMovieId,
        scrollBack,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
