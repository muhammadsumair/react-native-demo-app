import React, { Component } from "react";
import { View, Text, TextInput, Button, Keyboard, ActivityIndicator } from 'react-native';
import SearchStyles from "./SearchStyle";
import Container from '../sharedComponents/Container';
import AppService from '../../services/AppService';

// redux
import { connect } from "react-redux";
import { logout } from '../../actions/authActions';
import UserStyle from "../users/UserStyle";

class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            record: null,
            isDisabled: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            submit: () => {
                this.props.logout()
            }
        });
    }

    loader() {
        return (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator animating size="large" />
            </View>
        )
    }

    onSearch() {
        Keyboard.dismiss();
        this.setState({
            isDisabled: true,
            errorMessage: '',
            record: null
        });

        AppService.getEmployee(this.state.search)
            .then((response) => {
                this.setState({
                    isDisabled: false,
                    record: response.data[0]
                });
                console.log("response: ", response)
            })
            .catch((err) =>  {
                if(err.response) {
                    this.setState({
                        isDisabled: false,
                        errorMessage: err.response.data.message
                    });
                    console.log('err.response: ', err.response);
                }
            })
    }

    render() {
        let { record } = this.state;

        return (
            <Container>
                <View style={SearchStyles.container}>
                    <TextInput
                        placeholder='User ID'
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        value={this.state.search}
                        onChangeText={(text) => this.setState({ search: text })} />

                    <View style={SearchStyles.submitContainer}>
                        <Button color="#6b52ae" onPress={(e) => this.onSearch()} disabled={!this.state.search || this.state.isDisabled} title="Search"/>
                    </View>
                </View>
                {
                    record ?
                        <View style={SearchStyles.recordContainer}>
                            <View style={SearchStyles.recordSection}>
                                <View style={SearchStyles.titleSection}>
                                    <Text style={SearchStyles.label}>ID</Text>
                                    <Text style={SearchStyles.label}>Name</Text>
                                    <Text style={SearchStyles.label}>Title</Text>
                                </View>
                                <View style={SearchStyles.valueSection}>
                                    <Text style={SearchStyles.value}>{record.id}</Text>
                                    <Text style={SearchStyles.value}>{record.name}</Text>
                                    <Text style={SearchStyles.value}>{record.title}</Text>
                                </View>
                            </View>
                        </View> : null
                }
                {
                    this.state.isDisabled && this.loader()
                }
                {
                    this.state.errorMessage ?
                        <Text style={UserStyle.errMsg}>{this.state.errorMessage}</Text> : null
                }
            </Container>
        );
    }
}

function mapStateToProps (state) {
    return {
        employees: state.employees
    }
}

function mapDispatchToProps (dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
