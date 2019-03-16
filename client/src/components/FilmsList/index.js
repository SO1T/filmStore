import React, { Component } from 'react';
import {
    Container
} from 'reactstrap';
import Film from './film';
import { connect } from "react-redux";
import { getFilms } from '../../actions/filmAction';
import PropTypes from 'prop-types';

class FilmsList extends Component {

    componentDidMount() {
        this.props.getFilms();
    }

    render() {
        const { films } = this.props.film;
        return (
            <Container className="filmlist">
                {
                    films.map(({_id, name, year, format, stars }) => (<Film _id={_id} name={name} year={year} format={format} stars={stars} />))
                }
            </Container>
        );
    }
}

FilmsList.propTypes = {
    getFilms: PropTypes.func.isRequired,
    film: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    film: state.film
});

export default connect(mapStateToProps, { getFilms })(FilmsList);