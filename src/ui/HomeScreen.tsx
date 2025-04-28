import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import TodoListItem from './TodoListItem';
import Todo from '../model/todo';
import { todosSelector } from '../state/todosSelectors';

const HomeScreen: React.FC = (props) => {
    const todos = useSelector(todosSelector)

    if (todos.length == 0) {
        return (
            <View>
                <Text style={styles.noTodosMessage}>No Todos yet!</Text>
            </View>
        )
    } else {
        return (
            <FlatList
                data={todos}
                renderItem={({item, index, separators}) => {
                    return (<TodoListItem data={item} index={index} style={styles.todoListItem}/>)
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    todoListItem: {
        marginVertical: 4,
        marginHorizontal: 8,
    },
    noTodosMessage: {
        fontSize: 32,
        fontStyle: 'italic',
        alignSelf: 'center',
        verticalAlign: 'middle'
    }
})

export default HomeScreen;