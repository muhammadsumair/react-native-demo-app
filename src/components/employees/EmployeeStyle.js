import { StyleSheet } from 'react-native';

const EmployeeStyle = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        flex: 1
    },
    flatListContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    list: {
        flex: 1
    },
    listWrapper: {
        flex: 1,
        backgroundColor: '#fff'
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    listImage: {
        width: 55,
        height: 55,
        borderRadius: 8
    },
    titleSection: {
        flex: 1,
        flexWrap: 'wrap',
        marginHorizontal: 10
    },
    listTitle: {
        fontSize: 14
    },
    labelTimeSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        marginRight: 15
    },
    listTime: {
        fontSize: 13,
        fontWeight: 'bold'
    }
});

export default EmployeeStyle;