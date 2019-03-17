import { GET_FILMS, ADD_FILM, DELETE_FILM } from '../actions/types';

const initialState = {
    films: [],
    loading: false
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
        default:
            return state;
    }
}