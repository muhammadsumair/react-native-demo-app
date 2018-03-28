import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, StatusBar, Button} from 'react-native';
import { TabNavigator , StackNavigator, TabBarBottom  } from  'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchScreen from './components/search/Search';
import EmployeesScreen from "./components/employees/Employees";
import UsersScreen from "./components/users/Users";


function headerRight( navigation ) {
    return (
        <TouchableOpacity onPress={(e) => {
            navigation.state.params && navigation.state.params.submit()
        }}>
            <Icon style={{ color: '#000', marginRight: 10 }} name="sign-out" size={30} color="#4F8EF7" />
        </TouchableOpacity>
    )
}
const SearchStack = StackNavigator({
    Search: { screen: SearchScreen }
}, {
    navigationOptions: ({ navigation }) => {
        return {
            headerTitle: 'Search',
            headerRight: headerRight(navigation)
        }
    }
});

const EmployeesStack = StackNavigator({
    Employees: { screen: EmployeesScreen }
}, {
    navigationOptions: ({ navigation }) => {
        return {
            headerTitle: 'Employees List',
            headerRight: headerRight(navigation)
        }
    }
});

const UsersStack = StackNavigator({
    Users: { screen: UsersScreen }
}, {
    navigationOptions: ({ navigation }) => {
        return {
            headerTitle: 'Users',
            headerRight: headerRight(navigation)
        }
    }
});

const tabBarConfiguration = {
    headerMode: 'none',        // I don't want a NavBar at top
    tabBarPosition: 'bottom',  // So your Android tabs go bottom
    tabBarComponent: TabBarBottom,
    swipeEnabled: false,
    tabBarOptions: {
        activeTintColor: 'white',  // Color of tab when pressed
        inactiveTintColor: '#b5b5b5', // Color of tab when not pressed
        labelStyle: {
            fontSize: 20,
            paddingVertical: 10,
            borderTopWidth:1,
            borderTopColor:'#D3D3D3'
        },
        style: {
            backgroundColor:'#6b52ae'
        }
    }
};

export const UserTabs = TabNavigator({
    Search: SearchStack,
    Employees: EmployeesStack
}, tabBarConfiguration);

export const AdminTabs = TabNavigator({
    Search: SearchStack,
    Employees: EmployeesStack,
    Users: UsersStack
}, tabBarConfiguration);