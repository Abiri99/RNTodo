import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import { useSelector } from 'react-redux';
import TodoListItem from './TodoListItem';
import Todo from '../model/todo';
import { todosSelector } from '../state/todosSelectors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AddTodoScreen from './AddTodoScreen';

function HomeScreen() {
    const navigation = useNavigation();
    const todos = useSelector(todosSelector)

    const onAddTodoButtonPress = () => {
        navigation.navigate('AddTodo')
    }

    if (todos.length == 0) {
        return (
            <View style={styles.noTodosContainer}>
                <Button
                    title='Add Todo!'
                    onPress={onAddTodoButtonPress}
                />
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
    addTodoButton: {
    },
    noTodosContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    noTodosMessage: {
        fontSize: 20,
        fontStyle: 'italic',
        alignSelf: 'center',
        verticalAlign: 'middle'
    }
})

export default HomeScreen;