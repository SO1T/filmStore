import { GET_FILMS, ADD_FILM, DELETE_FILM, FILMS_LOADING, FILE_UPLOAD } from './types';
import axios from 'axios';
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getFilms = () => dispatch => {
    dispatch(setFilmsLoading());
    axios
        .get('/api/films')
        .then(res => dispatch({
            type: GET_FILMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.responce.data, err.responce.status)));
};

export const addFilm = (film) => (dispatch, getState) => {
        axios
            .post('/api/films/', film, tokenConfig(getState))
            .then(res => dispatch({
                type: ADD_FILM,
                payload: res.data
            }))
            .catch(err => dispatch(returnErrors(err.responce.data, err.responce.status)));
};

export const deleteFilm = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/films/${id}`, tokenConfig(getState)).then(res => dispatch({
        type: DELETE_FILM,
        payload: id
    }))
};

export const setFilmsLoading = () => {
    return {
        type: FILMS_LOADING
    }
};

export const uploadFilms = (file) => dispatch => {
    if (file) {
        const data = new FormData();
        data.append('file', file, file.name);
        axios
            .post('/api/films/upload', data);
    }
    dispatch(getFilms());
    return {
        type: FILE_UPLOAD
    }
};
