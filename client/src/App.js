import React, { Component } from 'react';
import NavBar from './components/NavBar/navbar';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import FilmsList from "./components/FilmsList";
import Toolbar from "./components/Toolbar/toolbar";
import store from './store';


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <NavBar />
                    <Container>
                        <Toolbar />
                        <FilmsList />
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;