import React, { Component } from 'react';
import App from './components/App';
import Container from './components/sharedComponents/Container';
const TestFairy = require('react-native-testfairy');

// Redux
import { Provider } from 'react-redux';
import store from './store/configureStore';

export default class IslamBoard extends Component {

    componentWillMount() {
        TestFairy.begin('a15c2d137ec7e35a86b75a79fb6c6af613ba47f2');
    }

    render() {
        return (
            <Container>
                <Provider store={store}>
                    <App/>
                </Provider>
            </Container>
        )
    }
}