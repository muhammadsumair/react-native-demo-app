import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Modal, TouchableOpacity, TextInput, Picker } from 'react-native';
import Container from '../sharedComponents/Container';
import UserStyle from './UserStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { validateEmail } from '../../utils/Utils';

// redux
import {connect} from "react-redux";
import { logout } from '../../actions/authActions';
import { getUsers, refreshUsers, addNewUser, updateUser } from '../../actions/userActions';
import AppService from "../../services/AppService";

class UsersScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addUserModal: false,
            email: '',
            password: '',
            role: 'admin',
            errorMessage: null,
            disabled: false,
            isUpdating: false,
            updateUserIndex: null
        }
    }

    componentWillMount() {
        this.props.getUsers();
    }

    componentDidMount() {
        console.log("this.props.dispatch: ", this.props);
        this.props.navigation.setParams({
            submit: () => {
                this.props.logout()
            }
        });
    }

    setModalVisible(visible) {
        this.setState({addUserModal: visible});
    }

    addUser() {
        this.setState({
            email: '',
            password: '',
            role: 'admin',
            errorMessage: '',
            disabled: false,
            isUpdating: false
        });
        this.setModalVisible(true);
    }

    updateUser(user, index) {

        if(this.props.auth.user.email === user.email) return; //can't update yourself

        this.setState({
            email: user.email,
            password: user.password,
            role: user.role,
            errorMessage: '',
            disabled: false,
            isUpdating: true,
            updateUserIndex: index
        });
        this.setModalVisible(true);
    }

    submit() {
        this.setState({ errorMessage: '' });
        if(!this.state.email) return this.setState({ errorMessage: 'Please enter email' });

        if(validateEmail(this.state.email)) {
            if(!this.state.password) return this.setState({ errorMessage: 'Please enter password' });
            if(!this.state.role) return this.setState({ errorMessage: 'Please enter role' });
            this.setState({ disabled: true });
            if(this.state.isUpdating) {
                this.update();
            }
            else this.create();
        }
        else this.setState({ errorMessage: 'Email is invalid' });
    }

    create() {
        let user = {
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        };

        AppService.addUser(user)
            .then((response) => {
                this.setState({
                    email: '',
                    password: '',
                    role: 'user',
                    disabled: false
                });
                this.setModalVisible(false);
                this.props.addNewUser(user);
            })
            .catch((err) =>  {
                if(err.response) {
                    console.log('err.response: ', err.response);
                    this.setState({
                        errorMessage: err.response.data.message,
                        disabled: false
                    })
                }
                console.log('err.response: ', err.response);
            });
    }

    update() {
        let user = {
            password: this.state.password,
            role: this.state.role
        };

        AppService.updateUser(this.state.email, user)
            .then((response) => {
                user.email = this.state.email;
                this.props.updateUser(this.state.updateUserIndex, user);
                this.setState({
                    email: '',
                    password: '',
                    role: 'user',
                    disabled: false,
                    isUpdating: false,
                    updateUserIndex: null
                });
                this.setModalVisible(false);
            })
            .catch((err) =>  {
                this.setState({
                    disabled: false
                });
                if(err.response) {
                    console.log('err.response: ', err.response);
                    this.setState({
                        errorMessage: err.response.data.message,
                        disabled: false
                    })
                }
                console.log('err.response: ', err.response);
            });
    }

    renderItem({ item, index }) {
        return(
            <TouchableOpacity onPress={() => this.updateUser(item, index)} style={UserStyle.recordContainer}>
                <View style={UserStyle.recordSection}>
                    <View style={UserStyle.titleSection}>
                        <Text style={UserStyle.label}>Email</Text>
                        <Text style={UserStyle.label}>Password</Text>
                        <Text style={UserStyle.label}>Role</Text>
                    </View>
                    <View style={UserStyle.valueSection}>
                        <Text style={UserStyle.value}>{item.email}</Text>
                        <Text style={UserStyle.value}>{item.password}</Text>
                        <Text style={UserStyle.value}>{item.role}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    loader() {
        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
                <ActivityIndicator animating size="large" />
            </View>
        )
    }

    renderFooter() {
        if (!this.props.users.loadingData) return null;
        return this.loader();
    }

    renderSeparator() {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "#CED0CE" }} />
        );
    }

    render() {
        let { users, isRefreshing, addUserLoading } = this.props.users;

        return (
            <Container>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.addUserModal}
                    onRequestClose={() => this.setModalVisible(false)}>
                    <View style={UserStyle.modalContainer}>
                        <View style={UserStyle.modalHeader}>
                            <View style={UserStyle.headerLeft}>
                                <TouchableOpacity onPress={()=> this.setModalVisible(false)} disabled={this.state.disabled}>
                                    <Icon name="angle-left" size={40} color='#fff' />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={UserStyle.headerTitle}>{this.state.isUpdating ? 'Update ' : 'Add '}User</Text>
                            </View>
                            <View style={UserStyle.headerRight}>
                                <TouchableOpacity onPress={()=> this.submit()} disabled={this.state.disabled}>
                                    <Text style={UserStyle.headerTitle}>{this.state.isUpdating ? 'Update ' : 'Create '}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={UserStyle.modalContent}>
                            <View style={{marginBottom:10}}>
                                <Text style={UserStyle.formLabel}>Email</Text>
                                <TextInput
                                    placeholder='Email'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    autoFocus={true}
                                    keyboardType='email-address'
                                    enablesReturnKeyAutomatically={true}
                                    editable={!this.state.disabled && !this.state.isUpdating}
                                    selectTextOnFocus={!this.state.disabled && !this.state.isUpdating}
                                    value={this.state.email}
                                    onSubmitEditing = {() => this.refs.password.focus()}
                                    onChangeText={(text) => this.setState({ email: text })} />
                            </View>

                            <View style={{marginBottom:10}}>
                                <Text style={UserStyle.formLabel}>Password</Text>
                                <TextInput
                                    ref="password"
                                    placeholder='Password'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    autoFocus={this.state.isUpdating}
                                    editable={!this.state.disabled}
                                    selectTextOnFocus={!this.state.disabled}
                                    value={this.state.password}
                                    onChangeText={(text) => this.setState({ password: text })} />
                            </View>

                            <Text style={UserStyle.formLabel}>Role</Text>
                            <Picker
                                selectedValue={this.state.role}
                                onValueChange={(itemValue) => this.setState({role: itemValue})}>
                                <Picker.Item label="Admin" value="admin" />
                                <Picker.Item label="User" value="user" />
                            </Picker>
                            {
                                this.state.errorMessage ?
                                    <Text style={UserStyle.errMsg}>{this.state.errorMessage}</Text> : null
                            }
                        </View>
                    </View>
                </Modal>
                <View style={UserStyle.flatListContainer}>
                    <FlatList
                        data={users}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={(item, index)=> {return index.toString()}}
                        ItemSeparatorComponent={this.renderSeparator}
                        onRefresh={() => this.props.refreshUsers()}
                        refreshing={isRefreshing}
                        onEndReached={() => this.props.getUsers()}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0.1}
                        style={UserStyle.list}/>
                    <TouchableOpacity onPress={() => this.addUser()} style={UserStyle.addButton}>
                        <Icon name="plus" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

function mapStateToProps (state) {
    return {
        users: state.users,
        auth: state.auth
    }
}

function mapDispatchToProps (dispatch) {
    return {
        logout: () => dispatch(logout()),
        getUsers: () => dispatch(getUsers()),
        refreshUsers: () => dispatch(refreshUsers()),
        addNewUser: (user) => dispatch(addNewUser(user)),
        updateUser: (index, user) => dispatch(updateUser(index, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen)