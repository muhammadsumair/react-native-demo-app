import React, { Component } from 'react';
import { StyleSheet, View, Button, Image, Text, TextInput, Keyboard } from 'react-native';
import Container from '../sharedComponents/Container';
import { LoginStyles } from './LoginStyle';
import { validateEmail } from '../../utils/Utils';

// redux
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        }
    }

    login() {
        this.setState({ errorMessage: '' });
        if(!this.state.email) return this.setState({ errorMessage: 'Please enter email' });

        if(validateEmail(this.state.email)) {
            if(!this.state.password) return this.setState({ errorMessage: 'Please enter password' });
            Keyboard.dismiss();
            this.props.login(this.state.email, this.state.password);
        }
        else this.setState({ errorMessage: 'Email is invalid' });
    }

    render() {
        let { loading, notFound } = this.props.auth;
        return (
            <Container>
                <View style={LoginStyles.container}>
                    <Text style={LoginStyles.title}>User Login</Text>

                    <TextInput
                        placeholder='Email'
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        keyboardType='email-address'
                        enablesReturnKeyAutomatically={true}
                        value={this.state.email}
                        onSubmitEditing = {() => this.refs.password.focus()}
                        onChangeText={(text) => this.setState({ email: text })} />
                    <TextInput
                        ref="password"
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })} />

                    <View style={LoginStyles.submitContainer}>
                        <Button color="#6b52ae" onPress={(e) => this.login()} disabled={loading} title="Login"/>
                    </View>

                    {
                        this.state.errorMessage ?
                            <Text style={LoginStyles.errMsg}>{this.state.errorMessage}</Text> : null
                    }

                    {
                        notFound ?
                            <Text style={LoginStyles.errMsg}>User not found</Text> : null
                    }
                </View>
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
        login: (email, password) => dispatch(login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    btnEye: {
        position: 'absolute',
        top: 55,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
});