import { StyleSheet } from 'react-native';
import EmployeeStyle from "../employees/EmployeeStyle";

const SearchStyles = StyleSheet.create({
    container: {
        padding: 20
    },
    errMsg: {
        color: 'red',
        textAlign: 'center',
        paddingVertical: 20
    },
    submitContainer: {
        marginTop: 20
    },
    recordContainer: {
        flex: 1,
        flexWrap: 'wrap',
        padding: 20
    },
    recordSection: {
        flexDirection: 'row'
    },
    titleSection: {
        flex: 1
    },
    valueSection: {
        flex: 2
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 18
    }
});

export default SearchStyles;