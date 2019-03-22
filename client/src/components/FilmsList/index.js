import React, { Component, Fragment } from 'react';
import {
    Container
} from 'reactstrap';
import Film from './film';
import { connect } from "react-redux";
import { getFilms } from '../../actions/filmAction';
import PropTypes from 'prop-types';
import Toolbar from '../Toolbar/toolbar';
import memoize from "memoize-one";

class FilmsList extends Component {

    state = {
        dropdownOpen: false,
        searchBy: 'Name',
        order: 'ASC',
        input: ''
    };

    handleInput = (e) => {
        this.setState({
            input: e.target.value
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

    search = memoize(
        (films, val) => {
            if (this.state.searchBy === 'Name') {
                let regn = new RegExp('^' + val, 'gi');
                return films.filter(film => film.Title.match(regn)).sort((a, b) => {
                    if (a.Title < b.Title)
                        return -1;
                    if (a.Title > b.Title)
                        return 1;
                    return 0;
                });
            } else {
                let regs = new RegExp('\\b' + val, 'gi');
                return films.filter(film => film.Stars.split(', ').join(' ').toString().match(regs)).sort((a, b) => {
                    if (a.Title < b.Title)
                        return -1;
                    if (a.Title > b.Title)
                        return 1;
                    return 0;
                });
            }
        }
    );

    handleSort = () => {
      this.setState(state => ({
          order: state.order === 'ASC' ? 'DESC' : 'ASC'
      }));
    };

    sort = (films) => {
        let sf = films.sort((a, b) => {
            if (a.Title < b.Title)
                return -1;
            if (a.Title > b.Title)
                return 1;
            return 0;
        });
        let sfo = this.state.order === 'ASC' ? sf : sf.reverse();
        return sfo;
    };

    componentDidMount() {
        this.props.getFilms();
    }

    render() {
        const filterFilms = this.sort(this.search(this.props.film.films, this.state.input));
        return (
            <Container className="filmlist">
                <Toolbar
                    handleSort={this.handleSort}
                    selectDropDown={this.selectDropDown}
                    toggleDropDown={this.toggleDropDown}
                    dropdownOpen={this.state.dropdownOpen}
                    searchBy={this.state.searchBy}
                    handleInput={this.handleInput} />
                {
                    filterFilms.map(({_id, Title, Release, Format, Stars }) => (<Film key={_id} _id={_id} Title={Title} Release={Release} Format={Format} Stars={Stars} />))
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