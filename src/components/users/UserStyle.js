import { StyleSheet } from 'react-native';

const EmployeeStyle = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    list: {
        flex: 1
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
    },
    addButton: {
        borderWidth:1,
        borderColor:'#6b52ae',
        alignItems:'center',
        justifyContent:'center',
        width: 50,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 50,
        backgroundColor:'#6b52ae',
        borderRadius:100,
    },
    /*Modal Styling*/
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    modalHeader: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        justifyContent: 'space-between',
        backgroundColor: '#6b52ae'
    },
    headerLeft: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        height: 60
    },
    headerRight: {
        paddingRight: 16
    },
    headerTitle: {
        fontSize: 17,
        color: '#fff'
    },
    modalContent: {
        paddingVertical: 11.5,
        paddingHorizontal: 10,
        flex: 1
    },
    errMsg: {
        color: 'red',
        textAlign: 'center',
        paddingVertical: 20
    },
    formLabel: {
        color: '#000',
        fontSize: 12,
        paddingLeft: 5
    }
});

export default EmployeeStyle;