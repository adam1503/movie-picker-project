import React from "react";

const reducer = (state, action) => {
  if (action.type === "ADD_TO_WHEEL") {
    const { id, poster, title, director } = action.payload;
    const existingMovie = state.wheelFilms.find((movie) => movie.id === id);
    if (!existingMovie) {
      const newMovie = {
        id,
        poster,
        title,
        director,
      };
      return {
        ...state,
        wheelFilms: [...state.wheelFilms, newMovie],
      };
    } else {
      return { ...state };
    }
  }
  if (action.type === "DELETE_MOVIE") {
    const movies = state.wheelFilms.filter(
      (movie) => movie.id !== action.payload
    );
    return { ...state, wheelFilms: movies };
  }

  if (action.type === "DELETE_WHEEL") {
    return { ...state, wheelFilms: [] };
  }
};

export default reducer;
