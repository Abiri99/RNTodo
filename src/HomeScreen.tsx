import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import './TodosRepository';
import './TodoListItem';
import TodoListItem from './TodoListItem';

interface HomeScreenProps {
    repo: TodosRepository
}

const HomeScreen = (props: HomeScreenProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    async function loadData() {
        setTodos(await props.repo.fetchData())
        setTimeout(async () => {
            setTodos(await props.repo.fetchUpdatedTodos())
        }, 2000)
    }

    useEffect(() => {
        loadData()
    }, []);

    if (todos.length == 0) {
        return (
            <Text>No Todos yet!</Text>
        )
    }

    return (
        <FlatList
            data={todos}
            renderItem={({item, index, separators}) => (
                <TodoListItem data={item} index={index}/>
            )}
        />
    )
}

export default HomeScreen;