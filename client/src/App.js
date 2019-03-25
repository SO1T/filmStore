import React, { Component } from 'react';
import NavBar from './components/NavBar/navbar';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import FilmsList from "./components/FilmsList";
import store from './store';
import { loadUser } from './actions/authActions';


class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <NavBar />
                    <Container>
                        <FilmsList />
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;