import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import Container from '../sharedComponents/Container';
import EmployeeStyle from './EmployeeStyle';
import UserStyle from "../users/UserStyle";
import Icon from 'react-native-vector-icons/FontAwesome';

// redux
import {connect} from "react-redux";
import { logout } from '../../actions/authActions';
import { getEmployees, refreshEmployees } from '../../actions/employeeActions';
import SearchStyles from "../search/SearchStyle";

class EmployeesScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetailModal: false,
            user: {}
        }
    }

    componentWillMount() {
        this.props.getEmployees();
    }

    componentDidMount() {
        this.props.navigation.setParams({
            submit: () => {
                this.props.logout()
            }
        });
    }

    setModalVisible(visible, user) {
        console.log('user: ', user);
        this.setState({userDetailModal: visible, user});
    }

    renderItem({ item }) {
        return(
            <TouchableOpacity style={EmployeeStyle.listItem} onPress={() => this.setModalVisible(true, item)}>
                <View style={EmployeeStyle.titleSection}>
                    <View style={EmployeeStyle.labelTimeSection}>
                        <Text style={EmployeeStyle.listTime}>{item.id}</Text>
                        <Text style={EmployeeStyle.listTime}>{item.name}</Text>
                        <Text style={EmployeeStyle.listTitle}>{item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderFooter() {
        if (!this.props.employees.loadingData) return null;

        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    }

    renderSeparator() {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "#CED0CE" }} />
        );
    }

    render() {
        let { employees, isRefreshing } = this.props.employees;

        return (
            <Container>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.userDetailModal}
                    onRequestClose={() => this.setModalVisible(false)}>
                    <View style={UserStyle.modalContainer}>
                        <View style={UserStyle.modalHeader}>
                            <View style={UserStyle.headerLeft}>
                                <TouchableOpacity onPress={()=> this.setModalVisible(false)}>
                                    <Icon name="angle-left" size={40} color='#fff' />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={UserStyle.headerTitle}>Employee</Text>
                            </View>
                            <View style={UserStyle.headerRight} />
                        </View>
                        <View style={UserStyle.modalContent}>
                            <View style={SearchStyles.recordContainer}>
                                <View style={SearchStyles.recordSection}>
                                    <View style={SearchStyles.titleSection}>
                                        <Text style={SearchStyles.label}>ID</Text>
                                        <Text style={SearchStyles.label}>Name</Text>
                                        <Text style={SearchStyles.label}>Title</Text>
                                    </View>
                                    {
                                        this.state.user ? <View style={SearchStyles.valueSection}>
                                            <Text style={SearchStyles.value}>{this.state.user.id}</Text>
                                            <Text style={SearchStyles.value}>{this.state.user.name}</Text>
                                            <Text style={SearchStyles.value}>{this.state.user.title}</Text>
                                        </View> : null
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={EmployeeStyle.flatListContainer}>
                    <FlatList
                        data={employees}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={(item, index)=> {return index.toString()}}
                        ItemSeparatorComponent={this.renderSeparator}
                        onRefresh={() => this.props.refreshEmployees()}
                        refreshing={isRefreshing}
                        onEndReached={() => this.props.getEmployees()}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0.1}
                        style={EmployeeStyle.list}/>
                </View>
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
        logout: () => dispatch(logout()),
        getEmployees: () => dispatch(getEmployees()),
        refreshEmployees: () => dispatch(refreshEmployees())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesScreen)