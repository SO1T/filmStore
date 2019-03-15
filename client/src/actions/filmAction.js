import { GET_FILMS, ADD_FILM, DELETE_FILM, FILMS_LOADING} from './types';
import axios from 'axios';

export const getFilms = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get('/api/films')
        .then(res => dispatch({
            type: GET_FILMS,
            payload: res.data
        }))
};

export const addItem = (item) => dispatch => {
    axios
        .post('/api/films/', item)
        .then(res => dispatch({
            type: ADD_FILM,
            payload: res.data
        }))
};

export const deleteItem = (id) => dispatch => {
    axios
        .delete(`/api/films/${id}`).then(res => dispatch({
        type: DELETE_FILM,
        payload: id
    }))
};

export const setItemsLoading = () => {
    return {
        type: FILMS_LOADING
    }
};