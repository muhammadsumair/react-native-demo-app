import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

const Container = ({ children }) => (
    <View style={styles.container}>
        {children}
    </View>
);

export default Container;