import { GET_FILMS, ADD_FILM, DELETE_FILM, FILMS_LOADING, FILE_UPLOAD} from './types';
import axios from 'axios';

export const getFilms = () => dispatch => {
    dispatch(setFilmsLoading());
    axios
        .get('/api/films')
        .then(res => dispatch({
            type: GET_FILMS,
            payload: res.data
        }))
};

export const addFilm = (film) => dispatch => {
    axios
        .post('/api/films/', film)
        .then(res => dispatch({
            type: ADD_FILM,
            payload: res.data
        })).catch((err) => alert(err))
};

export const deleteFilm = (id) => dispatch => {
    axios
        .delete(`/api/films/${id}`).then(res => dispatch({
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
    alert('sdf')
    if (file) {
        const data = new FormData();
        data.append('file', file, file.name);
        axios
            .post('/api/films/upload', data);
        getFilms();
    }
    return {
        type: FILE_UPLOAD
    }
};