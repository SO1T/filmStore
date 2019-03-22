import React, { Component, Fragment } from 'react';
import {
    Container
} from 'reactstrap';
import Film from './film';
import { connect } from "react-redux";
import { getFilms } from '../../actions/filmAction';
import PropTypes from 'prop-types';
import Toolbar from '../Toolbar/toolbar';

class FilmsList extends Component {

    state = {
        dropdownOpen: false,
        searchBy: 'Name',
        order: 'ASC',
        films: []
    };

    search = (e) => {
        let newFilms;
        if (this.state.searchBy === 'Name') {
            let regn = new RegExp('^' + e.target.value, 'gi');
            newFilms = this.props.film.films.filter(film => film.Title.match(regn)).sort((a, b) => {
                if (a.Title < b.Title)
                    return -1;
                if (a.Title > b.Title)
                    return 1;
                return 0;
            });
        } else {
            let regs = new RegExp('\\b' + e.target.value, 'gi');
            newFilms = this.props.film.films.filter(film => film.Stars.split(', ').join(' ').toString().match(regs)).sort((a, b) => {
                if (a.Title < b.Title)
                    return -1;
                if (a.Title > b.Title)
                    return 1;
                return 0;
            });
        }
        this.setState({
            films: newFilms
        });
    };

    toggleDropDown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    selectDropDown = (e) => {
        this.setState({
            searchBy: e
        })
    };

    sort = () => {
        let sf =  this.state.films.sort((a, b) => {
            if (a.Title < b.Title)
                return -1;
            if (a.Title > b.Title)
                return 1;
            return 0;
        });
        let sfo = this.state.order === 'ASC' ? sf : sf.reverse();
        this.setState(state => ({
            order: state.order === 'ASC' ? 'DESC' : 'ASC',
            films: sfo
        }));
    };

    componentDidMount() {
        this.props.getFilms();
    }

    render() {
        const films = this.state.films.length > 0 ? this.state.films : this.props.film.films;
        return (
            <Container className="filmlist">
                <Toolbar
                    sort={this.sort}
                    selectDropDown={this.selectDropDown}
                    toggleDropDown={this.toggleDropDown}
                    dropdownOpen={this.state.dropdownOpen}
                    searchBy={this.state.searchBy}
                    search={this.search} />
                {
                    films.map(({_id, Title, Release, Format, Stars }) => (<Film key={_id} _id={_id} Title={Title} Release={Release} Format={Format} Stars={Stars} />))
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