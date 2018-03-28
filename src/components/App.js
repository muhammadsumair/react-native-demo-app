import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import Login from './login/Login';
import { UserTabs, AdminTabs } from '../routes';
import Container from './sharedComponents/Container';

// redux
import { connect } from 'react-redux';
import { loginSuccess } from './../actions/authActions';

class App extends Component {

    constructor(props) {
        super(props);
        console.ignoredYellowBox = ['Warning: BackAndroid', 'Warning: View.propTypes'];
        this.state = {
            isChecked: true
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('USER', (err, result) => {
            this.setState({
                isChecked: true
            });
            if(result) {
                this.props.loginSuccess(JSON.parse(result))
            }
        });
    }

    renderTemplate() {
        if(this.state.isChecked) {
            SplashScreen.close({
                animationType: SplashScreen.animationType.scale,
                duration: 850,
                delay: 500,
            });

            let { isLoggedIn, user } = this.props.auth;
            if(isLoggedIn) {
                if(user && user.role && user.role === 'admin') {
                    return <AdminTabs />;
                }
                return <UserTabs />;
            }
            return <Login />;
        }
        return null;
    }

    render() {

        return (
            <Container>
                {this.renderTemplate()}
            </Container>
        )
    }
}

function mapStateToProps (state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps (dispatch) {
    return {
        loginSuccess: (auth) => dispatch(loginSuccess(auth)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)