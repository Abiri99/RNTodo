import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Todo from '../model/Todo';
import { useEffect, useState } from 'react';

type TodoListItemProps = {
    data: Todo
    index: number
    style: ViewStyle
}

const TodoListItem = (props: TodoListItemProps) => {
    let status = props.data.isCompleted ? '✅' : '';

    return (
        <View style={props.style}>
            <View style={styles.container}>
                <Text style={styles.title}>{props.data.title}</Text>
                <Text style={styles.title}>{status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        backgroundColor: 'white',
        borderRadius: 6,
        width: '100%',
        height: 'auto',
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    title: {
        fontSize: 16,
        color: 'black',
    },
});

export default TodoListItem;
