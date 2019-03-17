import { GET_FILMS, ADD_FILM, DELETE_FILM, FILM_SORT, FIND_FILM_BY } from '../actions/types';

const initialState = {
    films: [],
    loading: false
};

const findFilm = ({ type, val}, films) => {
  let newFilms = films;
    if (type === 'Name') {
        let regn = new RegExp('^' + val, 'gi');
      return newFilms.filter(film => film.Title.match(regn)).sort((a, b) => {
          if (a.Title < b.Title)
              return -1;
          if (a.Title > b.Title)
              return 1;
          return 0;
      });
  } else {
        let regs = new RegExp('\\b' + val, 'gi');
        return newFilms.filter(film => film.Stars.split(', ').join(' ').toString().match(regs)).sort((a, b) => {
        if (a.Title < b.Title)
            return -1;
        if (a.Title > b.Title)
            return 1;
        return 0;
    });
  }
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_FILMS:
            return {
                ...state,
                films: payload
            };
        case DELETE_FILM:
            return {
                ...state,
                films: state.films.filter(film => film._id !== payload)
            };
        case ADD_FILM:
            return {
                ...state,
                films: [payload, ...state.films]
            };
        case FILM_SORT:
            let sf =  state.films.sort((a, b) => {
                if (a.Title < b.Title)
                    return -1;
                if (a.Title > b.Title)
                    return 1;
                return 0;
            });
            let sfo = payload === 'ASC' ? sf : sf.reverse();
            return {
                ...state,
                films: [...sfo]
            };
        case FIND_FILM_BY:
            let film = findFilm(payload, state.films);
            return {
                ...state,
                films: [...film]
            };
        default:
            return state;
    }
}